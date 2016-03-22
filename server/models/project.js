"use strict";
var CrestModel = require('../lib/crestmodel'),
    Factory = require('../lib/factory');

class Project extends CrestModel {
    constructor(id, campaignId)
    {
        super(id,'project',Project.prototype.customSync);
        this.campaignId = campaignId;
    }

    customSync()
    {
        return new Promise((resolve, reject) => {
            var data = {};
            Factory.Create('sovcampaign',this.campaignId).then(campaign=>{
                if (this.campaign != campaign)
                {
                    this.campaign = campaign;
                    // todo: bind events so that changes will be propagated
                }
                return Factory.Create('constellation',campaign.get('constellation.id'));
            }).then(constellation=>{
                if (this.constellation != constellation)
                {
                    this.constellation = constellation;
                    // todo: bind events so that changes will be propagated
                }
                var systems = this.constellation.get('systems');
                if (this.systems != systems)
                {
                    this.systems = systems;
                    // todo: bind events so that changes will be propagated
                }

                console.log('Project synced', this);
                resolve(this);
            });
        });
    }
}

Factory.AddConstructor('project',Project);
module.exports = Project;