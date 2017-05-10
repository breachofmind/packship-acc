import React from 'react'
import BoxTableRow from './BoxTableRow.jsx'

/**
 * BoxTable displays all items in a user's current box.
 */
class BoxTable extends React.Component
{
    /**
     * Render the UI for each row.
     * @returns {array|XML}
     */
    renderRows()
    {
        let {box,updateBox} = this.props;

        let rows = box.map(item => {
            return (
                <BoxTableRow item={item} updateBox={updateBox} key={item.product.id} />
            )
        });
        // If there are no items in the box, show a message instead.
        if (! rows.length) {
            rows = (
                <tr>
                    <td colSpan="5">
                        <div className="alert alert-info">No items yet...</div>
                    </td>
                </tr>
            )
        }
        return rows;
    }

    /**
     * Render the UI for this component.
     * @returns {XML}
     */
    render()
    {
        return (
            <table className="table box-table">
                <thead>
                <tr>
                    <th data-col="qty">Qty</th>
                    <th data-col="total">Total</th>
                    <th data-col="name">Product Name</th>
                    <th data-col="sku">SKU</th>
                    <th data-col="actions"> </th>
                </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>


            </table>
        )
    }
}

export default BoxTable;