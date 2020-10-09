var creepUtils = require('creep.utils')

var roleRepairer = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
        }
        if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
        }

        if (creep.memory.repairing) {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });
            
            targets.sort((a,b) => (a.hits/a.hitsMax) - (b.hits/b.hitsMax));
            
            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                } else {
                    creep.say('🛠️');
                }
            }
        }
        else {
            // Withdrawing
            var containers = creepUtils.getSortedFilledContainersForRoom(creep.room);

            if (creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            } else {
                creep.say("⚡🤏")
            }
        }
    }
};

module.exports = roleRepairer;