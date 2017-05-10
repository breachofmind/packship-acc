"use strict";

var Model = require('expressway').Model;
var _     = require('lodash');

class Product extends Model
{
    /**
     * Constructor.
     * @injectable
     * @param app {Application}
     */
    constructor(app)
    {
        super(app);

        this.title      = 'name';
        this.expose     = true;
        this.populate   = [];
        this.managed    = false;
        this.preview    = false;

        this.hook(function(schema) {
            schema.virtual('transactions', {
                ref: "ReturnItem",
                localField: "sku",
                foreignField: "sku"
            })
        });

        this.on('toJSON', function(json,blueprint,object) {
            if (object['transactions']) {
                let dates = object.transactions.map(transaction => {
                    return new Date(transaction.returnDate);
                });
                json['qty'] = object.transactions.length;
                json['transactions'] = object.transactions;
                json['oldestReturnDate'] = new Date(Math.min.apply(null,dates));

            }
        })
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
            .add('name', types.Title)
            .add('sku', types.Text)
    }

    /**
     * Return the schema methods.
     * @returns {Object}
     */
    methods(methods,app)
    {
        //methods.speak = function() {}

        return super.methods(methods);
    }
}

module.exports = Product;