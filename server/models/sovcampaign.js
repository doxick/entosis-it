"use strict";
var CrestModel = require('../lib/crestmodel'),
    Crest = require('../lib/crest'),
    Factory = require('../lib/factory');

class Sovcampaign extends CrestModel
{
    constructor(id)
    {
        super(id,"sovcampaign",Crest.getSovCampaign);
    }
    parse(data)
    {
        var attributes = {
            id: data.campaignID,
            type: data.eventType,
            start: data.startTime,
            'constellation.id': data.constellation.id,
            'constellation.name': data.constellation.name,
            'solarsystem.id': data.sourceSolarsystem.id,
            'solarsystem.name': data.sourceSolarsystem.name,
            'structure.id': data.sourceItemID
        };
        data.attackers && Object.assign(attributes,{
            'attacker.score': data.attackers.score
        });
        data.defenders && Object.assign(attributes,{
            'defender.id': data.defenders.defender.id,
            'defender.name': data.defenders.defender.name,
            'defender.score': data.defenders.score
        });
        return attributes;
    }
}
Factory.AddConstructor('sovcampaign',Sovcampaign);
module.exports = Sovcampaign;

