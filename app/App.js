"use strict";

var Extension = require('expressway').Extension;
var faker = require('faker');
var _ = require('lodash');

const RETURN_REASONS = [
    'BUYERS_REMORSE',
    'DEFECTIVE'
];

/**
 * The Root Extension is your core application.
 * All sub-applications and extensions are attached to this app.
 */
class App extends Extension
{
    /**
     * Constructor.
     * @param app {Application}
     * @param config Function
     */
    constructor(app,config)
    {
        super(app);

        app.use(config('use'));

        this.package = require('../package.json');

        this.use(require('grenade/expressway'), {});

        this.routes.use(config('routes'));
    }

    /**
     * Fired when the application boots.
     * @param next Function
     * @param controller Function
     * @param seeder SeederService
     */
    boot(next,controller,seeder,paths)
    {
        this.webpack.entry('main.js' , ['react-hot-loader/patch']);
        this.webpack.read(this.package);
        this.webpack.attach(controller('IndexController'));

        let fakeProducts = iterate(20, i => {
            return {
                name: faker.lorem.words(3),
                sku: faker.random.uuid().substr(0,8),
            };
        });

        let fakeNames = iterate(3, i => {
            return faker.name.firstName() + " " + faker.name.lastName();
        });
        let fakeTransactions = iterate(200, i => {
            return {
                sku: _.sample(fakeProducts).sku,
                storeId: "A001",
                storeRepName: _.sample(fakeNames),
                returnDate: faker.date.recent(30),
                returnReason: _.sample(RETURN_REASONS)
            }
        });

        let installer = seeder.add('installation');


        installer.add('Product', fakeProducts);
        installer.add('ReturnItem', fakeTransactions);

        this.webpack.server().then(done => {
            super.boot(next);
        });
    }
}

function iterate(num, fn)
{
    let output = [];
    for (let i=0; i<num; i++)
    {
        let ret = fn(num);
        if (ret) output.push(ret);
    }
    return output;
}

module.exports = App;