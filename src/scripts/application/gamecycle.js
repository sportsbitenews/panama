define(['eventmanager','command'], function (eventmanager) {

  function init() {
    gameCycle();
  }

  function gameCycle() {
    // Call next cycle.
    setTimeout(gameCycle, 200);
    // Execute the previous cycle commands.
    eventmanager.publish('new.gamecycle');
    // Generate commands to executed next cycle.
    //cycle++;
  }

  eventmanager.subscribe('game.init', function(){init();});
});
