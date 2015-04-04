define(['eventmanager'], function (eventmanager) {

  // This snippet gives back some nice canvas relative coordinates
  HTMLCanvasElement.prototype.relmouseCoordinates = function (event) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;



    do {
      totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
      totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while (currentElement === currentElement.offsetParent);

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;
    return {x: canvasX, y: canvasY};
  };
  window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };
  var init = function() {

  };
  eventmanager.subscribe('game.init', function(){init();});


});