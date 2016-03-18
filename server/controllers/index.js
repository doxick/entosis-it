var Express = require('express'),
    Router = Express.Router(),
    Crest = require('../lib/crest'),
    Factory = require('../lib/factory');
Router.get('/', function (req, res) {
    var output = [];
    Crest.getSovCampaigns().then(function (data) {
        return Promise.all(data.items.map(row=>{
            return Factory.Create('sovcampaign',row.campaignID);
        })).then(campaigns=>{
            return campaigns.sort((a,b) => {
                var _a = new Date(a.attributes.start),
                    _b = new Date(b.attributes.start);
                return _a < _b ? 1 : _a > _b ? -1 : 0;
            });
        });
    }).then((campaigns)=> {
        output.length = campaigns.length;
        var prmsConstellations = new Array(campaigns.length),
            prmsStructures = new Array(campaigns.length),
            prmsSystems = new Array(campaigns.length);

        campaigns.forEach((campaign, idx)=> {
            output[idx]          = {};
            output[idx].campaign = campaign;
            prmsConstellations[idx] = Factory.Create('constellation', campaign.get('constellation.id'));
            prmsStructures[idx] = Factory.Create('sovstructure', campaign.get('structure.id'));
            prmsSystems[idx] = Factory.Create('solarsystem',campaign.get('system.id'));
        });
        return Promise.all([
            Promise.all(prmsConstellations).then(constellations => {
                return Promise.all(constellations.map((constellation,idx) => {
                    output[idx].constellation = constellation;
                    return Factory.Create('region', constellation.get('region.id'));
                }));
            }).then(regions => {
                regions.forEach((region,idx)=>{
                    output[idx].region = region;
                });
            }),
            Promise.all(prmsStructures).then(structures => {
                structures.forEach((structure, idx)=> {
                    output[idx].structure = structure;
                });
            }),
            Promise.all(prmsSystems).then(systems => {
                systems.forEach((system,idx)=> {
                    output[idx].system = system;
                });
            })
        ]);
    }).then(()=>{
        res.render('index', {
            campaigns: output
        });
    }).catch((err)=>{
        console.log('ERROR: ', err.stack);
    })
});
Router.use('/project', require('./project'));
module.exports = Router;