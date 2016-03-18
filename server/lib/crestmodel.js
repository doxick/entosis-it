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
    }
    sync()
    {
        return this.__sync(this.id).then(data=>{
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
        }).then(data=>this.set(data));
    }
    parse(data)
    {
        return data;
    }
}
module.exports = CrestModel;
