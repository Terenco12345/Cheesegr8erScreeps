const potentialNames = [
    "Liam", "Noah", "William", "James", "Oliver", "Benjamin", "Elijah", "Lucas", "Mason", "Logan", "Alexander", "Ethan", "Jacob", 
    "Michael", "Daniel", "Henry", "Jackson", "Sebastian", "Aiden", "Matthew", "Samuel", "David", "Joseph", "Carter", "Owen", "Wyatt", 
    "John", "Jack", "Luke", "Jayden", "Dylan", "Grayson", "Levi", "Isaac", "Gabriel", "Julian", "Mateo", "Anthony", "Jaxon", "Lincoln"
]

module.exports = {
    /**
     * Generate a name, that all other owned creeps do not have.
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
     * Check if the room's spawns are full.
     * @param {*} room 
     */
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