var creepUtils = require('creep.utils')

var roleUpgrader = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            } else {
                creep.say('🔨🔼');
            }
        }
        else {
            // Withdrawing
            var containers = creepUtils.getSortedFilledContainersForRoom(creep.room);
            
            if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            } else {
                creep.say("⚡🤏")
            }
        }
    }
};

module.exports = roleUpgrader;