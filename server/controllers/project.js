var Express = require('express'),
    Router = Express.Router(),
    Factory = require('../lib/factory'),
    Helpers = require('../lib/helpers');

Router.get('/create/:campaignId', function (req, res) {
    var campaignId = req.params.campaignId,
        output = {};
    Factory
        .Create('sovcampaign',campaignId)
        .then(function(campaign) {
            var prms = [];
            output.campaign = campaign.get();
            prms.push(Factory.Create('sovstructure', campaign.get('structure.id')).then(function(structure) {
                output.structure = structure.get();
            }));
            prms.push(Factory.Create('constellation', campaign.get('constellation.id')).then(function(constellation) {
                output.constellation = {
                    id: constellation.get('id'),
                    name: constellation.get('name')
                };
                return Factory.Create('region', constellation.get('region.id')).then(function(region) {
                    output.region = {
                        id: region.get('id'),
                        name: region.get('name')
                    };
                });
            }));
            return Promise.all(prms);
        })
        .then(function() {
            res.render('project/create', output);
        })
        .catch(function(err){
            console.log('campaign doesnt exist', err.stack);
        });
});
Router.post('/create/:campaignId', function (req, res) {
    Factory.Create('project',Helpers.GenerateGuid(), req.params.campaignId).then(function(project){
        console.log('done',project);
    });
});


module.exports = Router;