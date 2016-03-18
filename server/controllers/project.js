var Express = require('express'),
    Router = Express.Router(),
    Factory = require('../lib/factory');

Router.get('/create/:campaignId', function (req, res) {
    var campaignId = req.params.campaignId,
        data = {};
    Factory
        .Create('sovcampaign',campaignId)
        .then(function(campaign) {
            data.campaign = campaign.get();
            return Factory.Create('sovstructure', campaign.get('structure.id'));
        })
        .then(function(structure) {
            // todo
            data.structure = structure.get();
            res.render('project/create',{data: data});
        })
        .catch(function(){
            console.log('campaign doesnt exist');
        });
});


module.exports = Router;