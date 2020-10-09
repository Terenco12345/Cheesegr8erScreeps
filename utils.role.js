module.exports = {
    /**
     * Upgrade the controller of the room that this creep is in.
     * @param {*} creep 
     */
    upgradeController: function (creep) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
        } else {
            creep.say('🔨🔼');
        }
    },

    /**
     * Creep attempts to move to a container and withdraw energy until
     * their store is full.
     * @param {*} creep 
     */
    withdrawEnergyFromContainer: function (creep) {
        // Find a list of containers that aren't empty
        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    structure.structureType == STRUCTURE_CONTAINER &&
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0
                );
            }
        })
        containers.sort((c1, c2) => {
            return c2.store.getUsedCapacity(RESOURCE_ENERGY) - c1.store.getUsedCapacity(RESOURCE_ENERGY);
        })

        if (containers.length == 0) {
            return false;
        }

        if (creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(containers[0], { visualizePathStyle: { stroke: '#ffaa00' } });
        } else {
            creep.say("⚡🤏")
        }

        return true;
    },

    /**
     * Creep attempts to move to a container and deposit energy until
     * their store is empty.
     * @param {*} creep 
     */
    depositEnergyAtContainer: function (creep) {
        // Obtain list of containers for depositing
        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    structure.structureType == STRUCTURE_CONTAINER &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                );
            }
        })
        containers.sort((c1, c2) => {
            return c2.store.getFreeCapacity(RESOURCE_ENERGY) - c1.store.getFreeCapacity(RESOURCE_ENERGY);
        })

        if (containers.length == 0) {
            return false;
        }

        if (containers.length > 0) {
            if (creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0], { visualizePathStyle: { stroke: "#ffffff" } })
            } else {
                creep.say("⚡👋")
            }
        }

        return false;
    },

    /**
     * Creep attempts to harvest source until their energy is full.
     * @param {*} creep 
     */
    harvestSource: function (creep) {
        // Harvesting
        // Sort viable sources by distance, and whether they have enough energy to harvest.
        var sources = creep.room.find(FIND_SOURCES);
        sources.sort();

        var targetSource = 0;
        if (creep.memory.source) {
            targetSource = creep.memory.source;
        }

        if (sources.length == 0) {
            return false;
        }

        if (creep.harvest(sources[targetSource]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[targetSource], { visualizePathStyle: { stroke: '#ffaa00' } });
        } else {
            creep.say("⚡⛏️")
        }

        return true;
    },

    /**
     * Creep attempts to find somewhere to recharge buildings with energy.
     * @param {*} creep 
     */
    rechargeBuilding: function (creep) {
        // Depositing
        // Obtain list of targets for depositing
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });

        if (targets.length == 0) {
            return false;
        }

        targets.sort((target1, target2) => {
            // Buildings with less energy should have higher priority
            if (target1.store.getFreeCapacity(RESOURCE_ENERGY) < target2.store.getFreeCapacity(RESOURCE_ENERGY)) {
                return -1;
            } else if (target1.store.getFreeCapacity(RESOURCE_ENERGY) > target2.store.getFreeCapacity(RESOURCE_ENERGY)) {
                return 1;
            }

            return 0;

            // Towers > Spawner > Extension > Container priority - TO BE IMPLEMENTED
        })

        // Recharge building if one exists
        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } })
            } else {
                creep.say("⚡👋")
            }
        }

        return true;
    },

    /**
     * Construct at a construction site
     * @param {*} creep 
     */
    constructBuilding: function (creep) {
        // Find construction sites, and sort them by priority
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        targets.sort((t1, t2) => {
            var t1Score = 0;
            var t2Score = 0;

            if (t1.structureType == STRUCTURE_ROAD) {
                t1Score = -10
            }
            if (t2.structureType == STRUCTURE_ROAD) {
                t2Score = -10
            }

            return t2Score - t1Score;
        })

        if (targets.length == 0) {
            return false;
        }

        // Construct at construction site if one exists
        if (targets.length) {
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            } else {
                creep.say('🔨🏗️');
            }
        }

        return true;
    },

    /**
     * Repair building that is damaged
     * @param {*} creep
     */
    repairBuilding: function (creep) {
        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax
        });

        targets.sort((a, b) => (a.hits / a.hitsMax) - (b.hits / b.hitsMax));

        if (targets.length == 0) {
            return false;
        }

        if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);
        } else {
            creep.say('🛠️');
        }

        return true;
    }
};