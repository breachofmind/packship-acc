import React from 'react'

/**
 * This is an individual row in the BoxTable component.
 * @constructor
 */
class BoxTableRow extends React.Component
{
    render()
    {
        let {item,updateBox} = this.props;

        if (item.qty === 0) return null;

        return (
            <tr>
                <td data-col="qty">
                    <input className="form-control" type="number" value={item.qty} onChange={updateBox(item)}/>
                </td>
                <td>of {item.product.qty}</td>
                <td>{item.product.name}</td>
                <td>{item.product.sku}</td>
                <td><a href="#" onClick={updateBox(item,0)}>Trash</a></td>
            </tr>
        )
    }
}

export default BoxTableRow;