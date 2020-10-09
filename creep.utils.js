const potentialNames = [
    "Liam", "Noah", "William", "James", "Oliver", "Benjamin", "Elijah", "Lucas", "Mason", "Logan", "Alexander", "Ethan", "Jacob", 
    "Michael", "Daniel", "Henry", "Jackson", "Sebastian", "Aiden", "Matthew", "Samuel", "David", "Joseph", "Carter", "Owen", "Wyatt", 
    "John", "Jack", "Luke", "Jayden", "Dylan", "Grayson", "Levi", "Isaac", "Gabriel", "Julian", "Mateo", "Anthony", "Jaxon", "Lincoln"
]

module.exports = {
    /**
     * Generate a name
     */
    generateCreepName(){
        var index = 0
        var names = Object.keys(Game.creeps);

        while(index < potentialNames.length){
            if(!names.includes(potentialNames[index])){
                return potentialNames[index]
            }
            index++;
        }

        return null;
    },

    /**
     * Obtain a sorted list of sources that a creeps can harvest.
     * @param {*} creep 
     */
    getSortedSourceListForCreep: function (creep) {
        // Sort viable sources by distance, and whether they have enough energy to harvest.
        var sources = creep.room.find(FIND_SOURCES);
        sources.sort();
        return sources;
    },

    /**
     * Obtain a sorted list of targets for depositing energy, for a given room.
     * @param {*} room 
     */
    getSortedTargetsListForRoom: function (room) {
        var targets = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });

        targets.sort((target1, target2)=>{
            // Buildings with less energy should have higher priority
            if(target1.store.getFreeCapacity(RESOURCE_ENERGY) < target2.store.getFreeCapacity(RESOURCE_ENERGY)){
                return -1;
            } else if(target1.store.getFreeCapacity(RESOURCE_ENERGY) > target2.store.getFreeCapacity(RESOURCE_ENERGY)) {
                return 1;
            }

            return 0;

            // Towers > Spawner > Extension > Container priority - TO BE IMPLEMENTED

        })

        return targets;
    },

    getSortedEmptyContainersForRoom: function(room){
        var containers = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    structure.structureType == STRUCTURE_CONTAINER && 
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                );
            }
        })
        containers.sort((c1, c2)=>{
            return c2.store.getFreeCapacity(RESOURCE_ENERGY) - c1.store.getFreeCapacity(RESOURCE_ENERGY);
        })
        return containers;
    },

    getSortedFilledContainersForRoom: function(room){
        var containers = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    structure.structureType == STRUCTURE_CONTAINER && 
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0
                );
            }
        })
        containers.sort((c1, c2)=>{
            return c2.store.getUsedCapacity(RESOURCE_ENERGY) - c1.store.getUsedCapacity(RESOURCE_ENERGY);
        })
        return containers;
    },

    areSpawnsFullForRoom: function(room){
        var emptySpawns = room.find(FIND_STRUCTURES, {filter: (structure)=>{
            if(structure.structureType == STRUCTURE_SPAWN && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
                return true;
            }
        }})

        if(emptySpawns.length == 0){
            return true;
        } else {
            return false;
        }
    }
};