import React from 'react'
import classnames from 'classnames'
import BoxTable from './BoxTable.jsx'
import utils from '../js/utils'


/**
 * This component consists of the Box tab and controls its visibility.
 * Inside the box tab are the Box Table components.
 * @constructor
 */
class BoxTab extends React.Component
{
    constructor()
    {
        super();

        this.state = {

            /**
             * Is the component currently open?
             * @type Boolean
             */
            open: false
        }
    }

    /**
     * Method for handling the tab click event.
     * @param event
     */
    onTabClick(event)
    {
        // Toggle the open state of the object.
        this.setState({open: ! this.state.open})
    }

    /**
     * Renders the component UI.
     * @returns {XML}
     */
    render()
    {
        let {box,total,updateBox,clearBox} = this.props;
        let onTabClick = this.onTabClick.bind(this);

        let tabContainerClasses = classnames({
            "box-tab-component" : true,
            "is-open" : this.state.open
        });

        return (
            <div className={tabContainerClasses}>
                <div className="box-tab-container" >
                    <div className="box-tab" onClick={onTabClick}>
                        Box Contents (<strong className="box-total-qty">{total}</strong> items)
                    </div>

                    <div className="box-tab-content">
                        <div>
                            <div className="text-right">
                                <button className="btn btn-link" onClick={clearBox}>Clear Box</button>
                                <button className="btn btn-primary">Create Box</button>
                            </div>

                            <BoxTable box={box} updateBox={updateBox}/>
                        </div>
                    </div>

                </div>
                <div className="box-tab-overlay"> </div>
            </div>
        )
    }
}

/**
 * This creates a wrapper around the BoxTab,
 * which pulls things from the store and converts them to props in BoxTab.
 * This is important because whenever the props change, the UI will change.
 * React-Redux only changes the component state, not the entire application.
 * Re-rendering the whole application would be performance-costly.
 */
const BoxTabContainer = utils.mapProps(BoxTab, {

    state(state) {

        let total = 0;

        return {
            /**
             * When mapping the box object, create an array of objects.
             * Look up the product in the product index so we have a ref of it.
             * @type {array<object>}
             */
            box: Object.keys(state.box).map(sku => {
                total += state.box[sku];
                return {
                    product: state.products[state.productIndex[sku]],
                    qty: state.box[sku]
                }
            }),

            /**
             * When doing the above, will also create the total number of qty
             * for the user's current box.
             * @type Number
             */
            total: total
        }
    },

    dispatch(dispatch) {

        return {
            /**
             * Given an item and qty, update the user's box.
             * @param item {object}
             * @param qty {number}
             * @returns {function(*)}
             */
            updateBox(item,qty)
            {
                let arglen = arguments.length;
                return event => {
                    event.preventDefault();
                    dispatch({
                        type: "updateBox",
                        product: item.product,
                        qty: arglen > 1 ? qty : Number(event.target.value)
                    })
                }
            },

            /**
             * Tell the store to clear the box.
             * @param event
             */
            clearBox(event)
            {
                event.preventDefault();
                dispatch({
                    type:"clearBox"
                })
            }
        }
    }
});


export default BoxTabContainer;