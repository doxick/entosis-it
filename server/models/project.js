"use strict";
var CrestModel = require('../lib/crestmodel'),
    Factory = require('../lib/factory'),
    Collection = require('../lib/collection');

class Project extends CrestModel {
    constructor(id, campaignId)
    {
        super(id,'project',Project.prototype.customSync);
        this.campaignId = campaignId;
        this.pilots = new Collection();
    }
    customSync()
    {
        return new Promise((resolve, reject) => {
            Factory.Create('sovcampaign',this.campaignId).then(campaign=>{
                if (this.campaign != campaign)
                {
                    this.campaign = campaign;
                    // todo: bind events so that changes will be propagated
                }
                return Factory.Create('constellation',campaign.get('constellation.id'));
            }).then(constellation=> {
                if (this.constellation != constellation) {
                    this.constellation = constellation;
                    // todo: bind events so that changes will be propagated
                }
                var systems = this.constellation.get('systems');
                if (this.systems != systems) {
                    this.systems = systems;
                    // todo: bind events so that changes will be propagated
                }
                return Factory.Create('region',this.constellation.get('region.id'));
            }).then(region=> {
                if (this.region != region) {
                    this.region = region;
                    // todo: bind events so that changes will be propagated
                }
                return Factory.Create('sovstructure', this.campaign.get('structure.id'));
            }).then(structure=> {
                if (this.structure != structure) {
                    this.structure = structure;
                    // todo: bind events so that changes will be propagated
                }
                resolve({});
            });
        });
    }
}

Factory.AddConstructor('project',Project);
module.exports = Project;