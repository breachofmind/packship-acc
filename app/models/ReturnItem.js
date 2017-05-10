"use strict";

var Model = require('expressway').Model;
var _     = require('lodash');

class ReturnItem extends Model
{
    /**
     * Constructor.
     * @injectable
     * @param app {Application}
     */
    constructor(app)
    {
        super(app);

        this.title      = 'id';
        this.expose     = true;
        this.populate   = ['product'];
        this.managed    = false;
        this.preview    = false;

        this.hook(function(schema) {
            schema.virtual('product', {
                ref: 'Product',
                localField: 'sku',
                foreignField: 'sku'
            });
        });

        this.on('toJSON',function(json,blueprint,object) {
            if (object.product) json['product'] = object.product[0];
        });


    }

    /**
     * Create the database schema.
     * @injectable
     * @param fields {FieldCollection}
     * @param types {Object}
     */
    schema(fields,types)
    {
        fields
            .add('sku', types.Text)
            .add('returnReason', types.Text)
            .add('returnDate', types.Text)
            .add('storeId', types.Text)
            .add('storeRepName', types.Text)

    }

    /**
     * Return the schema methods.
     * @returns {Object}
     */
    methods(methods)
    {
        //methods.speak = function() {}

        return super.methods(methods);
    }
}

module.exports = ReturnItem;