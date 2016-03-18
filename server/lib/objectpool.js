var Cache = {};

module.exports = {
    Create(constructor, id)
    {
        if (! Cache[constructor])
            Cache[constructor] = {};
        var obj = new constructor(id);
        Cache[constructor][id] = obj;
        return obj;
    },
    Remove(object)
    {
        if (Cache[object.constructor])
            Cache[object.constructor][object.id] = undefined;
    }
};