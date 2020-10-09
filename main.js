var roleHarvester = require('role.harvester');
var roleEnergyTransporter = require('role.energy-transporter');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleRepairer = require('role.repairer');

var roleBarbarian = require('combat-role.barbarian');
var roleArcher = require('combat-role.archer');

var structureSpawner = require('structure.spawner');

var creepUtils = require('utils.creep')

module.exports.loop = function () {
    // Clean dead creeps from memory
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
    
    // Loop for creeps
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'barbarian'){
            roleBarbarian.run(creep);
        } else if(creep.memory.role == 'archer'){
            roleArcher.run(creep);
        } else if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        } else if(creep.memory.role == 'energyTransporter' || !creepUtils.areSpawnsFullForRoom(creep.room)){
            roleEnergyTransporter.run(creep)
        } else if(creep.memory.role == 'builder'){
            roleBuilder.run(creep);
        } else if(creep.memory.role == 'upgrader'){
            roleUpgrader.run(creep);
        } else if(creep.memory.role == 'repairer'){
            roleRepairer.run(creep);
        }
    }
    
    // Loop for spawns
    for(var name in Game.spawns){
        var spawn = Game.spawns[name];
        structureSpawner.run(spawn);
    }
}