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
  parse(data)
  {
    if (data == null)
      return {};
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
