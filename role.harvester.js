var creepUtils = require('creep.utils')

/**
 * A harvester's job is to harvest resources, and deposit them in containers.
 */
var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            // Harvesting
            var sources = creepUtils.getSortedSourceListForCreep(creep);
            
            if(creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.source], {visualizePathStyle: {stroke: '#ffaa00'}});
            } else {
                creep.say("⚡⛏️")
            }
        } else {
            // Depositing
            // Obtain list of containers for depositing
            var targets = creepUtils.getSortedEmptyContainersForRoom(creep.room)
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

module.exports = roleHarvester;