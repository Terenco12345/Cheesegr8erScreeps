var creepUtils = require('creep.utils')

/**
 * A harvester's job is to harvest resources, and deposit them in containers.
 */
var roleEnergyTransporter = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            // Withdrawing
            var containers = creepUtils.getSortedFilledContainersForRoom(creep.room);
            
            if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            } else {
                creep.say("⚡🤏")
            }
        } else {
            // Depositing
            // Obtain list of targets for depositing
            var targets = creepUtils.getSortedTargetsListForRoom(creep.room)
            
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: "#ffffff"}})
                } else {
                    creep.say("⚡👋")
                }
            }
        }
    }
};

module.exports = roleEnergyTransporter;