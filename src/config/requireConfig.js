require.config({
    paths: {
        text: 'bower_components/text/text',
        assetsList: 'config/assetsList.json',
        RNG: 'scripts/application/libs/RNG',
        astar: 'scripts/application/libs/astar',
        world: 'scripts/application/libs/world',
        collisionGrid: 'scripts/application/collisionGrid',
        graph: 'scripts/application/libs/graph',
        graphNode: 'scripts/application/libs/graphNode',
        binaryHeap: 'scripts/application/libs/binaryHeap',
        spriteSheet: 'scripts/application/libs/spriteSheet',
        standardlib: 'scripts/application/libs/standardLibrary',
        RequestAnimationFrame: 'scripts/application/libs/RequestAnimationFrame',
        assetLoader: 'scripts/application/assetLoader',
        keys: 'scripts/application/keys',
        mouse: 'scripts/application/mouse',
        gamecycle: 'scripts/application/gamecycle',
        config: '../config',
        eventmanager: 'scripts/logic/Mediator',
        command: 'scripts/logic/command',
        commandQueue: 'scripts/logic/commandQueue',
        player: 'scripts/logic/player',
        actorList: 'scripts/logic/actorList',
        plane: 'scripts/logic/actors/plane',
        actor: 'scripts/logic/actors/actor',
        'actor.unit': 'scripts/logic/actors/actor.unit',
        'actor.unit.local': 'scripts/logic/actors/actor.unit.local',
        animate: 'scripts/view/animate',
        input: 'scripts/view/input',
        map: 'scripts/view/map',
        actors: 'scripts/view/actors',
        Keypress: 'bower_components/Keypress/keypress-2.1.0.min',
        jquery: 'bower_components/jquery/dist/jquery',
        q: 'bower_components/q/q',
        lodash: 'bower_components/lodash/lodash'
    },
    packages: [

    ]
});
require(['scripts/app']);