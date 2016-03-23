var Express = require('express'),
    Router = Express.Router(),
    Factory = require('../lib/factory'),
    Helpers = require('../lib/helpers'),
    Pilot = require('../models/pilot');

Router.get('/create/:campaignId', function (req, res) {
    var output = {},
        campaign = req.campaign,
        prms = [];
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
    Promise.all(prms).then(function() {
        res.render('project/create', output);
    }).catch(function(err){
        res.status(404,err);
    });
});
Router.post('/create/:campaignId', function (req, res) {
    Factory.Create('project',Helpers.GenerateGuid(), req.params.campaignId).then(function(project){
        project.set({
            adm: req.body.adm,
            team: req.body.team
        });
        res.redirect('/project/' + project.id);
    });
});
Router.get('/:projectId([0-9]{4}-[0-9]{4}-[0-9]{4})',function(req,res){
    var project = req.project;
    if (! project.pilots.contains(req.session.player.hash))
        return res.render('project/join',{data: {
            name: '',
            role: 'entosis'
        }});
    var pilot = project.pilots.get(req.session.player.hash);
    res.render('project/index',{
        pilot: pilot,
        project: project
    });
});
Router.post('/:projectId([0-9]{4}-[0-9]{4}-[0-9]{4})',function(req,res){
    var project = req.project;
    if (project.pilots.contains(req.session.player.hash))
        return res.redirect('/project/'+project.id);
    var data = {
        name: req.body.name,
        role: req.body.role,
        id: req.session.player.id,
        hash: req.session.player.hash
    };

    if (!data.name || !data.role)
        return res.render('project/join',{data: data});

    var pilot = new Pilot(req.session.player.hash);
    pilot.set(data);
    project.pilots.add(pilot);
    res.redirect('/project/' + project.id);
});


Router.param('campaignId',function (req, res, next, campaignId) {
    Factory.Create('sovcampaign',campaignId)
        .then(function(campaign) {
            req.campaign = campaign;
            next();
        })
        .catch(function(err){
            next(err);
        });
});
Router.param('projectId',function (req, res, next, projectId) {
    Factory.Get('project',projectId)
        .then(function(project) {
            req.project = project;
            next();
        })
        .catch(function(err){
            next(err);
        });
});


module.exports = Router;