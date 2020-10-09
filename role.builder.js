var creepUtils = require('creep.utils')

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
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            targets.sort((t1, t2)=>{
                var t1Score = 0;
                var t2Score = 0;

                if(t1.structureType == STRUCTURE_ROAD){
                    t1Score = -10
                }
                if(t2.structureType == STRUCTURE_ROAD){
                    t2Score = -10
                }

                return t2Score - t1Score;
            })
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                } else {
                    creep.say('🔨🏗️');
                }
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

module.exports = roleBuilder;