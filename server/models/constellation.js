"use strict";
var CrestModel = require('../lib/crestmodel'),
    Crest = require('../lib/crest'),
    Factory = require('../lib/factory');

class Constellation extends CrestModel
{
    constructor(id)
    {
        super(id,"constellation",Crest.getConstellation);
    }
    get collections() { return {systems: 'solarsystem'}; }

    parse(data)
    {
        var regionId = data.region.href.split('/');
        return {
            id: this.id,
            name: data.name,
            'region.id': regionId[regionId.length -2],
            systems: data.systems.map(row=>row.id)
        }
    }
}
Factory.AddConstructor('constellation',Constellation);

module.exports = Constellation;