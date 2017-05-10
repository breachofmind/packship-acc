import React from 'react'
import utils from '../js/utils'
import ProductTableRow from './ProductTableRow.jsx'

class ProductTable extends React.Component
{
    onRowClick(product)
    {
        return event => {
            return this.props.onRowClick(product);
        }
    }

    render()
    {
        let {products,activeProduct} = this.props;

        return (
            <table className="table returns-table">
                <thead>
                <tr>
                    <th colSpan={2}>Add</th>
                    <th data-col="total">Qty</th>
                    <th data-col="name">Product Name</th>
                    <th data-col="sku">SKU</th>
                    <th data-col="date">Return Date</th>
                    <th data-col="age">Aging</th>
                    <th data-col="actions"> </th>
                </tr>
                </thead>

                    {products.map(product => (
                        <ProductTableRow
                            product={product}
                            isActive={product===activeProduct}
                            key={product.id}
                        />
                    ))}

            </table>
        )
    }
}

const ProductTableContainer = utils.mapProps(ProductTable, {

    state(state) {

        return {
            products: state.products,
            activeProduct: state.activeProduct,
        }
    }
});


export default ProductTableContainer;