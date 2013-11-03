/**************************************************
 ** GAME MOUSE CLASS
 **************************************************/

var Mouse = function () {
  'use strict';
  var coords;
  function onClick(e) {

    function getGameData(callback) {
      var canvas =  game.getPlayerCanvas();
      var localPlayer = game.localPlayer();
      var goal = {};
      var visible = game.getVisible();
      coords  = canvas.relMouseCoords(e);
      coords = helper.worldPosToGridPos(coords.x, coords.y);
      callback(
        goal,
        localPlayer
      );
    }
    getGameData(function(goal, localPlayer) {
      localPlayer.setGoal(goal);
    });

  }
  return {
    onClick : onClick
  };
};
