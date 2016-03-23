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
    Get: function(type, id)
    {
        if (! Constructors[type])
            return;
        var obj =  ObjectPool.Get(Constructors[type], id);
        if (! obj)
            return new Promise((resolve,reject)=>{
                reject('Factory::Get('+type+','+id+') does not exist')
            });
        return obj.sync();
    },
    AddConstructor: function(type, constructor)
    {
        Constructors[type] = constructor;
    }
};
require('../models/index');