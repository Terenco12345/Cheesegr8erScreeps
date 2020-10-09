var roleUtils = require('utils.role')

var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
        }

        if(creep.memory.building) {
            // Construct
            roleUtils.constructBuilding(creep);
        }
        else {
            // Withdrawing
            if(!roleUtils.withdrawEnergyFromContainer(creep)){
                roleUtils.harvestSource(creep);
            }
        }
    }
};

module.exports = roleBuilder;