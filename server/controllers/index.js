var Express = require('express'),
    Router = Express.Router(),
    Crest = require('../lib/crest'),
    Factory = require('../lib/factory');

var EventTypes = {
    1: "TCU",
    2: "IHub",
    3: "Station",
    4: "Freeport"
};

Router.get('/', function (req, res) {
    Crest.getSovCampaigns().then(function (data) {
        var campaigns = data.items.map((row)=> {
            var campaign = {
                id: row.campaignID,
                type: row.eventType,
                typeName: EventTypes[row.eventType],
                start: row.startTime
            };
            row.sourceSolarsystem && Object.assign(campaign,{
                system: {
                    id: row.sourceSolarsystem.id,
                    name: row.sourceSolarsystem.name
                }
            });
            row.constellation && Object.assign(campaign,{
                constellation: {
                    id: row.constellation.id,
                    name: row.constellation.name
                }
            });
            row.defender && Object.assign(campaign,{
                defender: {
                    score: row.defender.score,
                    name: row.defender.defender.name,
                    id: row.defender.defender.id
                }
            });
            return campaign;
        });
        return campaigns;
    }).then((campaigns)=>{
        Promise.all(campaigns.map(campaign=> {
            return Crest.getConstellation(campaign.constellation.id).then(data=>{
                var split = data.region.href.split('/');
                return Crest.getRegion(split[split.length - 2]);
            }).then((data)=>{
                campaign.region = {
                    name: data.name,
                    id: data.id
                };
                return campaign;
            })
        })).then(function(){
            res.render('index', {
                campaigns: campaigns
            });
        });
    });
});
Router.use('/project', require('./project'));
module.exports = Router;


var a = {
    "eventType_str": "1",
    "campaignID": 15340,
    "eventType": 1,
    "sourceSolarsystem": {
        "id_str": "30004016",
        "href": "https://public-crest.eveonline.com/solarsystems/30004016/",
        "id": 30004016,
        "name": "DG-L7S"
    }
    ,
    "attackers": {
        "score": 0.15
    }
    ,
    "campaignID_str": "15340",
    "sourceItemID": 1019806621481,
    "startTime": "2016-03-08T19:18:27",
    "sourceItemID_str": "1019806621481",
    "defender": {
        "defender": {
            "id_str": "99001619",
            "href": "https://public-crest.eveonline.com/alliances/99001619/",
            "id": 99001619,
            "name": "Pirate Coalition"
        }
        ,
        "score": 0.85
    }
    ,
    "constellation": {
        "id_str": "20000586",
        "href": "https://public-crest.eveonline.com/constellations/20000586/",
        "id": 20000586,
        "name": "3B-IWE"
    }
}