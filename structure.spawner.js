var creepUtils = require('utils.creep')

const spawnQuota = {
    harvesters: 4,
    energyTransporters: 0,
    builders: 1,
    upgraders: 1,
    repairers: 1,
    barbarians: 0
}

const sourceQuota = {
    0: 2,
    1: 2
}

// Creep blueprints
const harvesterBlueprint = {
    body: [WORK, MOVE, CARRY],
    memory: {role: "harvester"}
}

const energyTransporterBlueprint = {
    body: [WORK, MOVE, CARRY],
    memory: {role: "energyTransporter"}
}

const builderBlueprint = {
    body: [WORK, MOVE, CARRY],
    memory: {role: "builder"}
}

const upgraderBlueprint = {
    body: [WORK, MOVE, CARRY],
    memory: {role: "upgrader"}
}

const repairerBlueprint = {
    body: [WORK, MOVE, CARRY],
    memory: {role: "repairer"}
}

const barbarianBlueprint = {
    body: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, MOVE],
    memory: {role: "barbarian"}
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
            var blueprint = harvesterBlueprint;
            if(getHarvesterCountForSource(1) < sourceQuota[1]){
                blueprint.memory.source = 1;
            } else if(getHarvesterCountForSource(0) < sourceQuota[0]) {
                blueprint.memory.source = 0;
            }
            
            trySpawnCreep(spawn, blueprint);
        }
        if(energyTransporters < spawnQuota.energyTransporters){
            trySpawnCreep(spawn, energyTransporterBlueprint);
        } 
        else if(builders < spawnQuota.builders){
            trySpawnCreep(spawn, builderBlueprint);
        }
        else if(upgraders < spawnQuota.upgraders){
            trySpawnCreep(spawn, upgraderBlueprint);
        } 
        else if(repairers < spawnQuota.repairers){
            trySpawnCreep(spawn, repairerBlueprint);
        } 
        else if(barbarians < spawnQuota.barbarians){
            trySpawnCreep(spawn, barbarianBlueprint);
        }
        
    }
};