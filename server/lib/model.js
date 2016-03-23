"use strict";
var Collection = require('./collection');
var EventEmitter = require('events').EventEmitter;
var isArray = Array.isArray;

function isEqual(a,b)
{
    isArray(a) && (a = JSON.stringify(a.sort()));
    isArray(b) && (b = JSON.stringify(b.sort()));
    return a == b;
}

class Model extends EventEmitter
{
    constructor(id)
    {
        super();
        this.id = id;
        this.attributes = {};
        this.__collections = [];
        this.binds.forEach(bind=>{
            this[bind] = this[bind].bind(this);
        });
        Object.keys(this.collections).forEach(key=>{
            this.attributes[key] = new Collection();
        });
    }
    __set(key,value)
    {
        var curVal = this.attributes[key];
        if (this.collections[key])
        {
            if (!curVal)
                return ((this.attributes[key] = value),true);
            if (isEqual(curVal.keys, value.keys))
                return false;
            this.attributes[key].set(value.items());
            return true;
        }
        else if (isEqual(curVal, value))
            return false;
        this.attributes[key] = value;
        return true;
    }
    set(key, value, suppress)
    {
        if (typeof(key) == 'object')
        {
            Object.keys(key)
                .map((idx)=>this.__set(idx,key[idx]))
                .some(val=>val) && (! suppress) && this.emit('change',this);
            return this;
        }

        this.__set(key,value) && (! suppress) && this.emit('change',this);
        return this;
    }
    get(key)
    {
        if (!key)
            return Object.assign({},this.attributes);
        return this.attributes[key];
    }
    emit()
    {
        var args = Array.prototype.slice.call(arguments);
        super.emit.apply(this,args);
        this.__collections.forEach(collection => {
            collection.emit.apply(collection,args);
        });
    }
    destroy()
    {
        this.emit('destroy');
        this.removeAllListeners();
        this.__collections.forEach(collection => {
            collection.remove(this,true);
        });
    }


    get binds() { return []; };
    get collections() { return {}; };
}

module.exports = Model;
