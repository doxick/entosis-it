"use strict";
var Model = require('../lib/model'),
    Factory = require('../lib/factory');

class Pilot extends Model {
    constructor(id)
    {
        super(id);
    }
}

module.exports = Pilot;