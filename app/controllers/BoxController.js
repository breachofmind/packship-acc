"use strict";

var Controller = require('expressway').Controller;
var cache;
var index = {};

class BoxController extends Controller
{
    listReturnedProducts(request,response,next,Product)
    {
        if (cache) return cache;

        return Product.find().populate('transactions').exec().then(products => {
            cache = {
                pagination: null,
                data: products.map(product => { return product.toJSON() })
            }

            cache.data.forEach(product => {
                index[product.sku] = product.transactions;
            });

            return cache;
        });
    }

    listReturnedTransactions(request,response,next)
    {
        let sku = request.body.sku;

        if (! index[sku]) {
            return 400;
        }
        return index[sku];
    }

    /**
     * "BoxController.index" route.
     * @injectable
     */
    index(request,response,next,view)
    {
        return view.title('Title').template('index');
    }
}

module.exports = BoxController;