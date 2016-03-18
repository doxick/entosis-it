"use strict";
var CrestModel = require('../lib/crestmodel'),
    Crest = require('../lib/crest'),
    Factory = require('../lib/factory');

var EventTypes = {
    1: "TCU",
    2: "IHub",
    3: "Station",
    4: "Freeport"
};

class Sovcampaign extends CrestModel
{
    constructor(id)
    {
        super(id,"sovcampaign",Crest.getSovCampaign);
    }
    get timeout() { return 5; } // default 5 minutes

    parse(data)
    {
        var attributes = {
            id: data.campaignID,
            type: data.eventType,
            typeName: EventTypes[data.eventType],
            start: data.startTime,
            'constellation.id': data.constellation.id,
            'constellation.name': data.constellation.name,
            'system.id': data.sourceSolarsystem.id,
            'system.name': data.sourceSolarsystem.name,
            'structure.id': data.sourceItemID
        };
        data.attackers && Object.assign(attributes,{
            'attacker.score': data.attackers.score
        });
        data.defender && Object.assign(attributes,{
            'defender.id': data.defender.defender.id,
            'defender.name': data.defender.defender.name,
            'defender.score': data.defender.score
        });
        return attributes;
    }
}
Factory.AddConstructor('sovcampaign',Sovcampaign);
module.exports = Sovcampaign;

