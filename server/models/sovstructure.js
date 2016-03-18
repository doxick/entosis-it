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
    parse(data)
    {
        return data; // implement data parsing
    }
}
Factory.AddConstructor('sovstructure',SovStructure);
module.exports = SovStructure;

