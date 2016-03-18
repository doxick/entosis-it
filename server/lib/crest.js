var Redis = require('redis'),
    Https = require('https'),
    Config = require('../config'),
    RateLimit = require('./ratelimit'),
    RedisClient = Redis.createClient({
        host: Config.redis.host,
        auth_pass: Config.redis.password
    });

var Options = {
    hostname: Config.crest.host,
    port: 443,
    method: 'GET'
};

var Request = RateLimit(function(options,data,callback){
    if (typeof data == 'function')
    {
        callback = data;
        data = null;
    }
    var request = Https.request(options, callback);
    // handle data... ?
    request.end();
},1000 / Config.crest.rateLimit);

function Call(route, cacheTime) {
    cacheTime = (cacheTime || 60) * 60 * 1000;
    return new Promise(function(resolve, reject){
        RedisClient.get(route, function(err, reply){
            if (reply && reply.exceptionType) return reject(reply);
            if (reply) return resolve(reply);
            if (err) return reject(err);
            var opts = Object.assign({path: route},Options);
            Request(opts,(response)=>{
                var data = '';
                response.on('data',(d)=>{
                    data += d;
                });
                response.on('error',(err)=>{
                    reject(err);
                });
                response.on('end',()=>{
                    if (data.exceptionType) return reject(data);
                    RedisClient.setex(route,cacheTime, data);
                    return resolve(data);
                });
            })
        });

    }).then(function(data){
        return JSON.parse(data);
    });
};

function GetSovStructure(structureId)
{
    return GetSovStructures().then(function(data){
        for(var i = 0, l = data.items.length; i < l; i++)
            if(data.items[i].structureID == structureId)
                return data.items[i];
        return null;
    });
}
function GetSovStructures()
{
    return Call('/sovereignty/structures/',5);
}
function GetSovCampaign(id){
    return GetSovCampaigns().then(function(data){
        for(var i = 0, l = data.items.length; i < l; i++)
        {
            if (data.items[i].campaignID == id)
                return data.items[i];
        }
        return null;
    });
}
function GetSovCampaigns() {
    return Call('/sovereignty/campaigns/',5);
}
function GetConstellations()
{
    return Call('/constellations/',1440 + ~~(Math.random() * 1440));
}
function GetConstellation(id)
{
    return Call('/constellations/'+id+'/',1440 + ~~(Math.random() * 1440));
}
function GetRegions()
{
    return Call('/regions/',1440 + ~~(Math.random() * 1440));
}
function GetRegion(id)
{
    return Call('/regions/'+id+'/',1440 + ~~(Math.random() * 1440));
}
function GetSystems()
{
    return Call('/solarsystems/',1440 + ~~(Math.random() * 1440));
}
function GetSystem(id)
{
    return Call('/solarsystems/'+id+'/',1440 + ~~(Math.random() * 1440));
}

module.exports = {
    call: Call,
    getSovStructures: GetSovStructures,
    getSovStructure: GetSovStructure,
    getSovCampaigns: GetSovCampaigns,
    getSovCampaign: GetSovCampaign,
    getConstellation: GetConstellation,
    getRegion: GetRegion,
    getSystem: GetSystem,
    getConstellations: GetConstellations,
    getRegions: GetRegions,
    getSystems: GetSystems
};
