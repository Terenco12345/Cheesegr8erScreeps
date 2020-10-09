var creepUtils = require('creep.utils')

const spawnQuota = {
    harvesters: 7,
    energyTransporters: 2,
    builders: 2,
    upgraders: 2,
    repairers: 2,
    barbarians: 4
}

const sourceQuota = {
    0: 4,
    1: 3
}

// Creep blueprints
const harvesterBlueprint = {
    body: [WORK, WORK, MOVE, MOVE, CARRY, CARRY],
    memory: {role: "harvester"}
}

const energyTransporterBlueprint = {
    body: [WORK, MOVE, MOVE, CARRY],
    memory: {role: "energyTransporter"}
}

const builderBlueprint = {
    body: [WORK, WORK, MOVE, CARRY, CARRY],
    memory: {role: "builder"}
}

const upgraderBlueprint = {
    body: [WORK, WORK, MOVE, CARRY, CARRY],
    memory: {role: "upgrader"}
}

const repairerBlueprint = {
    body: [WORK, WORK, MOVE, CARRY, CARRY],
    memory: {role: "repairer"}
}

const barbarianBlueprint = {
    body: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, MOVE],
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