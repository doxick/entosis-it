var Cache = {};

module.exports = {
    Create(constructor,id,c,d,e,f,g,h,i,j,k,l,m,n,o,p)
    {
        if (! Cache[constructor])
            Cache[constructor] = {};
        if (Cache[constructor][id])
            return Cache[constructor][id];
        var obj = new constructor(id,c,d,e,f,g,h,i,j,k,l,m,n,o,p);
        Cache[constructor][id] = obj;
        return obj;
    },
    Remove(object)
    {
        if (Cache[object.constructor])
            Cache[object.constructor][object.id] = undefined;
    }
};