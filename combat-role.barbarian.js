/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('combat-role.barbarian');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(creep){
        var enemies = creep.room.find(FIND_HOSTILE_CREEPS);
        if(enemies.length > 0){
            if(creep.attack(enemies[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(enemies[0], { visualizePathStyle: { stroke: '#ffffff' }});
            };
            creep.say("⚔️")
        } else {
            creep.moveTo(Game.flags["BarbarianRally"]);
        }
    }
};