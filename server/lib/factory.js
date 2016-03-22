"use strict";
var ObjectPool = require('./objectpool'),
    Constructors = {};

module.exports = {
    Create: function(type)
    {
        if (!Constructors[type])
            return new Promise((resolve,reject) => { reject(); });
        var params = Array.prototype.slice.call(arguments);
        params[0] = Constructors[type];
        var obj = ObjectPool.Create.apply(null, params);
        return obj.sync();
    },
    AddConstructor: function(type, constructor)
    {
        Constructors[type] = constructor;
    }
};
require('../models/index');