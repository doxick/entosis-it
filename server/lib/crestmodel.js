"use strict";
var Model = require('./model'),
    Collection = require('./collection'),
    Factory = require('../lib/factory');

class CrestModel extends Model
{
    constructor(id,type,sync)
    {
        super(id);
        this.type = type;
        this.__sync = sync;
        this.__syncTime = 0;
        this.__syncing = null;
        this.__synced = new Promise(resolve => resolve(this));
    }
    get timeout() { return 60; } // default 60 minutes
    sync()
    {
        if (this.__syncing)
            return this.__syncing;
        if (Date.now() - this.__syncTime < this.timeout * 60000)
            return this.__synced;
        this.__syncing = this.__sync(this.id).then(data=>{
            if(data == null)
                return {};
            data = this.parse(data);
            var keys = Object.keys(this.collections);
            if (keys.length == 0)
                return data;
            return Promise.all(keys.filter(key=>!!data[key]).map(key => {
                var type = this.collections[key];
                return Promise.all(data[key].map(id => {
                    return Factory.Create(type, id);
                })).then((items)=>{
                    data[key] = new Collection(items);
                });
            })).then(()=>data);
        }).then(data=>{
            this.__syncTime = Date.now();
            this.__syncing = null;
            return this.set(data);
        });
        return this.__syncing;
    }
    parse(data)
    {
        return data;
    }
}
module.exports = CrestModel;
