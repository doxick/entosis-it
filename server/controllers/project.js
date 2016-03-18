var Express = require('express'),
    Router = Express.Router(),
    Factory = require('../lib/factory');

Router.get('/create/:campaignId', function (req, res) {
    var campaignId = req.params.campaignId,
        output = {};
    Factory
        .Create('sovcampaign',campaignId)
        .then(function(campaign) {
            output.campaign = campaign.get();
            return Factory.Create('sovstructure', campaign.get('structure.id'));
        })
        .then(function(structure) {
            // todo
            output.structure = structure.get();
            res.render('project/create', output);
        })
        .catch(function(){
            console.log('campaign doesnt exist');
        });
});


module.exports = Router;