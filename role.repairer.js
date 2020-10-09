var roleUtils = require('utils.role')

var roleRepairer = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
        }
        if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
        }

        // Perform action
        if (creep.memory.repairing) {
            // Repair
            roleUtils.repairBuilding(creep)
        }
        else {
            // Withdrawing
            if(!roleUtils.withdrawEnergyFromContainer(creep)){
                roleUtils.harvestSource(creep);
            }
        }
    }
};

module.exports = roleRepairer;