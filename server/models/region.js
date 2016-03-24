"use strict";
var CrestModel = require('../lib/crestmodel'),
    Crest = require('../lib/crest'),
    Factory = require('../lib/factory');

class Region extends CrestModel
{
    constructor(id)
    {
        super(id,"region",Crest.getRegion);
    }
    get collections() { return {constellations: 'constellation'}; }
    get timeout() { return 7 * 24 * 60; };
    parse(data)
    {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            constellations: data.constellations.map(row=>row.id)
        };
    }
}
Factory.AddConstructor('region',Region);
module.exports = Region;
