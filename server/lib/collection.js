"use strict";
var EventEmitter = require('events').EventEmitter;

class Collection extends EventEmitter
{
    constructor(items)
    {
        super();
        this.__items = [];
        if (items)
            this.set(items);
    }
    add(model)
    {
        if (this.contains(model)) return;
        this.__items.push(model);
        model.__collections.push(this);
        this.emit('add',model);
    }
    remove(model)
    {
        if (!this.contains(model)) return;
        this.__items.splice(this.__items.indexOf(model),1);
        model.__collections.splice(model.__collections.indexOf(this),1);
        this.emit('remove',item);
    }
    contains(model)
    {
        if (typeof(model) != "object")
            return this.__items.some(function(item) { return item.id == model; });
        return this.__items.indexOf(model) > -1;
    }
    get(id)
    {
        var obj = null;
        this.__items.some(item => ((item.id == id && (obj = item)),item.id == id));
        return obj;
    }
    set(models)
    {
        for(var idx, i = 0, l = this.length; i < l; i++)
        {
            idx = models.indexOf(this.__items[i]);
            if (idx >= 0) {
                models.splice(idx,1);
                continue;
            }
            this.remove(this.__items[i]);
            i--;
        }
        for(var i = 0, l = models.length; i < l; i++)
            this.add(models[i]);
    }
    items()
    {
        return this.__items.slice();
    }
    get keys() {
        return this.__items.map(item=>item.id).sort();
    }
    get length() {
        return this.__items.length;
    }
}

module.exports = Collection;
