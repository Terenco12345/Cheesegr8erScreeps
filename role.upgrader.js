var roleUtils = require('utils.role')

var roleUpgrader = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
        }

        // Perform action
        if(creep.memory.upgrading) {
            // Upgrading
            roleUtils.upgradeController(creep);
        }
        else {
            // Withdrawing
            if(!roleUtils.withdrawEnergyFromContainer(creep)){
                roleUtils.harvestSource(creep)
            }
        }
    }
};

module.exports = roleUpgrader;