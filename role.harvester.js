var roleUtils = require('utils.role')

/**
 * A harvester's job is to harvest resources, and deposit them in containers.
 */
var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            // Harvesting
            roleUtils.harvestSource(creep)
        } else {
            // Depositing
            if(!roleUtils.depositEnergyAtContainer(creep)){
                roleUtils.rechargeBuilding(creep)
            }
        }
    }
};

module.exports = roleHarvester;