import { createStore } from 'redux'

/**
 * This is a plain object that holds the dispatch methods for our redux store.
 * The method names correspond to an action type. For instance:
 * store.dispatch({type: "addProductList", ...})
 * Actions will alter the application state.
 * React will watch the application state and update the UI accordingly.
 *
 * @constructor
 */
class DispatchMethods
{
    /**
     * Adds the given product array to the state.
     * Usually this occurs when the application first loads,
     * but can be used to display products in the product table.
     * @param action {object}
     *  type:string "addProductList"
     *  data:array<object>
     */
    addProductList(action)
    {
        this.products = action.data;
        if (this.loading) {
            this.loading = false;
        }
        // Create an index of products by sku.
        this.productIndex = {};
        this.products.forEach((product,index) => {
            this.productIndex[product.sku] = index;
        })
    }

    /**
     * Toggles on/off the currently viewed product.
     * If on, should display the product transactions.
     * @param action {object}
     *  type:string "toggleActiveProduct"
     *  product:object
     */
    toggleActiveProduct(action)
    {
        if (this.activeProduct === action.product) {
            return this.activeProduct = null;
        }
        this.activeProduct = action.product || null;
    }

    /**
     * Updates a quantity for a product.
     * If the quantity is 0, removes it from the box.
     * @param action {object}
     *  type:string "updateBox"
     *  qty:number
     *  product:object
     */
    updateBox(action)
    {
        let qty = action.qty;

        // Don't let the user select over or under the limits.
        // Item was over, so use max amount
        if (qty > action.product.qty) qty = action.product.qty;

        // Item was under, so use min amount
        if (qty < 0 || !qty) qty = 0;


        let out = Object.assign({},this.box, {[action.product.sku]: qty});
        if (qty === 0) {
            delete out[action.product.sku];
        }
        this.box = out;
    }

    /**
     * Clears the box, removes all items.
     * @param action {object}
     *  type:string "clearBox"
     */
    clearBox(action)
    {
        this.box = {};
    }
}

/**
 * The opening/default state of the application.
 * @type {object}
 */
var defaultState = {
    loading:       true,
    products:      [],
    box:           {},
    productIndex:  {},
    activeProduct: null,
};


const dispatchMethods = new DispatchMethods;

// This is the redux store.
// It accepts the previous state and dispatched action,
// which is will pass off to our DispatchMethods handler.
// A redux store will always return a NEW state,
// instead of mutating the old state.
const store = createStore((state = defaultState, action) =>
{
    let fn = dispatchMethods[action.type];
    let out = Object.assign({},state);
    if (fn) {
        //console.log('dispatch: '+action.type, action);
        fn.call(out, action);
        return out;
    }
    return state;
});

export default store;