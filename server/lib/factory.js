"use strict";
var ObjectPool = require('./objectpool'),
    Constructors = {};

module.exports = {
    Create: function(type, id)
    {
      if (!Constructors[type])
        return new Promise((resolve,reject) => { reject(); });
      var obj = ObjectPool.Create(Constructors[type],id);
      return obj.sync();
    },
    AddConstructor: function(type, constructor)
    {
      Constructors[type] = constructor;
    }
};
require('../models/index');