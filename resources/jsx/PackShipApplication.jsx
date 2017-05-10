import React from 'react'
import store from '../js/store'
import api from '../js/api'
import ProductTableContainer from './ProductTable.jsx'
import BoxTabContainer from './BoxTab.jsx'


class PackShipApplication extends React.Component
{
    /**
     * Fired when React mounts this component.
     * @returns void
     */
    componentDidMount()
    {
        // When initializing for the first time,
        // reach out to the server to get the product list.
        api.listProducts(response => {
            store.dispatch({
                type: "addProductList",
                data: response.data,
            })
        })
    }

    /**
     * Render the top-level UI.
     * @returns {XML}
     */
    render()
    {
        return (
            <div>
                <ProductTableContainer />
                <BoxTabContainer />
            </div>
        )
    }
}



export default PackShipApplication;