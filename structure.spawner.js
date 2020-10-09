var creepUtils = require('utils.creep')

const spawnQuota = {
    harvesters: 8,
    energyTransporters: 0,
    builders: 2,
    upgraders: 1,
    repairers: 1,
    barbarians: 0
}

const sourceQuota = {
    0: 4,
    1: 4
}

// Creep blueprints
const gruntBlueprint = {
    body: [WORK, MOVE, MOVE, CARRY, CARRY],
}

const barbarianBlueprint = {
    body: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, MOVE],
}

// Get the amount of screeps for a certain role
var getScreepCount = function(role){
    var count = 0
    for(var name in Game.creeps) {
        var creep = Game.creeps[name]
        if(creep.memory.role == role) {
            count++
        }
    }
    return count
}

/**
 * Method to check cost and spawn screep
 * @param {*} spawn 
 * @param {*} screepBlueprint 
 * @param {*} index Used for naming purposes
 */

var trySpawnCreep = function(spawn, screepBlueprint){
    // console.log("Spawning "+screepBlueprint.memory.role)
    spawn.spawnCreep(screepBlueprint.body, creepUtils.generateCreepName(), {memory: screepBlueprint.memory})
}

/**
 * Obtain the amount of harvesters assigned to a source.
 * @param {*} index 
 */
var getHarvesterCountForSource = function(index){
    var count = 0;
    
    for(var name in Game.creeps){
        if(Game.creeps[name].memory.source == index){
            count++;
        }
    }

    return count;
}

module.exports = {
    run: function(spawn){
        var harvesters = getScreepCount("harvester")
        var energyTransporters = getScreepCount("energyTransporter")
        var builders = getScreepCount("builder")
        var upgraders = getScreepCount("upgrader")
        var repairers = getScreepCount("repairer")
        var barbarians = getScreepCount("barbarian")
        
        if(harvesters < spawnQuota.harvesters){
            // Assign a source to this harvester
            var blueprint = gruntBlueprint;
            blueprint.memory.role = "harvester"
            if(getHarvesterCountForSource(1) < sourceQuota[1]){
                blueprint.memory.source = 1;
            } else if(getHarvesterCountForSource(0) < sourceQuota[0]) {
                blueprint.memory.source = 0;
            }
            
            trySpawnCreep(spawn, blueprint);
        }
        if(energyTransporters < spawnQuota.energyTransporters){
            var blueprint = gruntBlueprint;
            blueprint.memory.role = "energyTransporter"
            trySpawnCreep(spawn, blueprint);
        } 
        else if(builders < spawnQuota.builders){
            var blueprint = gruntBlueprint;
            blueprint.memory.role = "builder"
            trySpawnCreep(spawn, blueprint);
        }
        else if(upgraders < spawnQuota.upgraders){
            var blueprint = gruntBlueprint;
            blueprint.memory.role = "upgrader"
            trySpawnCreep(spawn, blueprint);
        } 
        else if(repairers < spawnQuota.repairers){
            var blueprint = gruntBlueprint;
            blueprint.memory.role = "repairer"
            trySpawnCreep(spawn, blueprint);
        } 
        else if(barbarians < spawnQuota.barbarians){
            var blueprint = barbarianBlueprint;
            blueprint.memory.role = "barbarian"
            trySpawnCreep(spawn, blueprint);
        }
        
    }
};