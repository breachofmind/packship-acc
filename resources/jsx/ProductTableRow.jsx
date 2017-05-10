import React from 'react'
import moment from 'moment'
import classnames from 'classnames'
import utils from '../js/utils'
import api from '../js/api'
import config from '../js/config'
import TransactionTable from './TransactionTable.jsx'

class ProductTableRow extends React.Component
{
    constructor()
    {
        super();

        this.state = {
            transactions: []
        }
    }

    /**
     * Check if the box contains the full amount of product.
     * @returns {boolean}
     */
    get hasFullQtyInBox()
    {
        let {box,product} = this.props;
        let boxQty = box[product.sku];

        // The total quantity of items in the box equals the amount of transactions.
        // This way, we can show the checkbox fully checked.
        return ! boxQty ? false : boxQty === product.qty;
    }

    /**
     * When drilling into a product, fetch the transactions for that SKU on the server.
     * Doing so will cache the transactions for this item in the component state.
     * @param event
     */
    fetchTransactions(event)
    {
        event.preventDefault();

        let {product,onRowToggle} = this.props;

        // Dispatches the 'toggleActiveProduct' action.
        onRowToggle(product)(event);

        // Populate the transactions.
        // The transactions are cached in each row.
        if (! this.state.transactions.length) {
            api.listTransactions(product, response => {
                this.setState({transactions: response.sort(sortByAge)});
            })
        }
    }

    /**
     * Render the component UI.
     * @returns {XML}
     */
    render()
    {
        let {product,isActive,box,toggleToBox,updateBoxQty} = this.props;
        let qty = box[product.sku];
        let boxQty = qty ? qty : 0;
        let isChecked = this.hasFullQtyInBox;
        let date = moment(product.oldestReturnDate);
        let rowClasses = classnames('table-row', {"is-active" :isActive});

        // 'indeterminate' is a DOM-only manipulation.
        // We will have to toggle it here when the UI re-renders.
        if (this.refs.checkbox) {
            this.refs.checkbox.indeterminate = product.qty > boxQty && boxQty > 0;
        }

        return (
            <tbody className={rowClasses} id={product.id}>
            <tr className="table-row-object">
                <td data-col="checkbox">
                    <input type="checkbox" ref="checkbox" checked={isChecked} onClick={toggleToBox(product,isChecked ? 0 : product.qty)}/>
                </td>
                <td data-col="qty">
                    <input className="form-control" type="number" value={boxQty} onChange={updateBoxQty(product)}/>
                </td>
                <td data-col="total">{product.qty}</td>
                <td data-col="name">
                    <a href={"#"+product.id} onClick={this.fetchTransactions.bind(this)}>
                        {product.name}
                    </a>
                </td>
                <td data-col="sku">{product.sku}</td>
                <td data-col="date">{date.format(config.DATE_FORMAT)}</td>
                <td data-col="age">{config.TODAY.diff(date,'days')} Days</td>
                <td data-col="actions"> </td>
            </tr>
            <tr className="table-row-detail">
                <td colSpan={8}>
                    <TransactionTable transactions={this.state.transactions} qty={boxQty}/>
                </td>
            </tr>
            </tbody>
        )
    }
}


/**
 * Sorting function to make sure the objects are sorted by returnDate.
 * Passed to Array.sort(...)
 * @param a {object}
 * @param b {object}
 * @returns {number}
 */
function sortByAge(a,b) {
    let d1 = moment(a.returnDate).toDate().getTime();
    let d2 = moment(b.returnDate).toDate().getTime();
    return d1 === d2 ? 0 : (d1 > d2 ? 1 : -1);
}


const ProductTableRowContainer = utils.mapProps(ProductTableRow, {

    state(state) {
        return {
            box: state.box
        }
    },

    dispatch(dispatch) {
        return {
            /**
             * Given a product and qty, add or remove from the box.
             * @param product {object}
             * @param qty {Number}
             * @returns {function(*)}
             */
            toggleToBox(product,qty)
            {
                return event => {
                    dispatch({
                        type: "updateBox",
                        product: product,
                        qty: qty
                    })
                }
            },

            /**
             * Given a product, update the qty for that product in the box.
             * @param product {object}
             * @returns {function(*)}
             */
            updateBoxQty(product)
            {
                return event => {
                    let qty = Number(event.target.value);

                    // Before dispatching the action, you may want to save to the server first.
                    // This way, we can prevent the UI from looking different from the server.
                    // TODO

                    dispatch({
                        type:"updateBox",
                        product: product,
                        qty: qty
                    })
                }
            },

            /**
             * Given a product, make the product the active one in the state.
             * @param product {object}
             * @returns {function(*)}
             */
            onRowToggle(product)
            {
                return event => {
                    dispatch({
                        type: "toggleActiveProduct",
                        product: product
                    })
                }
            }
        }
    }
});


export default ProductTableRowContainer;