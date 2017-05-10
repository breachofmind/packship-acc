var $ = require('jquery');


class API {

    listProducts(onSuccess,onError)
    {
        return $.post('/listReturnedProducts', onSuccess, onError);
    }

    listTransactions(product, onSuccess,onError)
    {
        return $.post('/listReturnedTransactions', {sku: product.sku}, onSuccess, onError);
    }
}

module.exports = new API;