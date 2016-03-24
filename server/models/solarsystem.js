"use strict";
var CrestModel = require('../lib/crestmodel'),
    Crest = require('../lib/crest'),
    Factory = require('../lib/factory');

class Solarsystem extends CrestModel
{
  constructor(id)
  {
    super(id,"solarsystem",Crest.getSystem);
  }
  get timeout() { return 7 * 24 * 60; }
  parse(data)
  {
    return {
      id: data.id,
      name: data.name,
      'constellation.id': data.constellation.id,
      'sovereignty.id': data.sovereignty ? data.sovereignty.id : '',
      'sovereignty.name': data.sovereignty ? data.sovereignty.name : ''
    };
  }
}
Factory.AddConstructor('solarsystem',Solarsystem);
module.exports = Solarsystem;
