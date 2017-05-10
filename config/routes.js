var path = require('path');

module.exports.routes = {
    middleware: [
        'Static',
        'Init',
        'ConsoleLogging',
        'BodyParser',
        'Localization',
        'Session',
    ],
    paths: [
        {
            "GET  /"                         : "IndexController.index",
            "POST /listReturnedProducts"     : "BoxController.listReturnedProducts",
            "POST /listReturnedTransactions" : "BoxController.listReturnedTransactions"
        },
    ],
    error: "NotFound",
    static: {
        "/" : path.resolve(__dirname, "../public")
    }
};