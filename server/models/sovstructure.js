"use strict";
var CrestModel = require('../lib/crestmodel'),
    Crest = require('../lib/crest'),
    Factory = require('../lib/factory');

class SovStructure extends CrestModel
{
    constructor(id)
    {
        super(id,"sovstructure",Crest.getSovStructure);
    }
    get timeout() { return 5; } // default 5 minutes

    parse(data)
    {
        return {
            id: data.structureID,
            'alliance.id': data.alliance.id,
            'alliance.name': data.alliance.name,
            'system.id': data.solarSystem.id,
            'system.name': data.solarSystem.name,
            'vulnerability.level': data.vulnerabilityOccupancyLevel,
            'vulnerability.start': data.vulnerableStartTime,
            'vulnerability.end': data.vulnerableEndTime,
            'type.id': data.type.id,
            'type.name': data.type.name
        };
    }
}
Factory.AddConstructor('sovstructure',SovStructure);
module.exports = SovStructure;

