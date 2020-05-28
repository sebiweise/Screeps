// import modules
require('prototype.creep');
require('prototype.tower');
require('prototype.spawn');

module.exports.loop = function () {
    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }

    // for each creeps
    for (let name in Game.creeps) {
        // run creep logic
        Game.creeps[name].runRole();
    }

    // find all towers
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    // for each tower
    for (let tower of towers) {
        // run tower logic
        tower.defend();
    }

    // for each spawn
    for (let spawnName in Game.spawns) {
        var currentSpawn = Game.spawns[spawnName];
        //ENV setup
        if (!currentSpawn.memory.minCreeps) {
            console.log("Setup ENV");
            currentSpawn.memory.minCreeps = {
                harvester: 1,
                builder: 1,
                repairer: 1,
                upgrader: 1,
                lorry: 1,
                claimer: 0,
                wallRepairer: 1,
                longDistanceHarvester: 0
            };
        }
        // run spawn logic
        Game.spawns[spawnName].spawnCreepsIfNecessary();
    }
};