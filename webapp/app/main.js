require.config({
    paths: {
        crafty: '../libs/crafty-min',
        game: '../game'
    },
    shim: {
        crafty: { exports: "Crafty" }
    }
});

require(['app', 'game/components'], function(App) { App.initialize(); });