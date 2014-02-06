/**
 * @namespace
 * This code is an implementation of Alea algorithm; (C) 2010 Johannes Baagøe.
 * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
 */

/**
   * @namespace
   * This code is an implementation of the ROT.js cellular map generation by Ondřej Žára, https://github.com/ondras/rot.js
   * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
   */

define("EventManager",[""],function(){function e(e,t){return topics.hasOwnProperty(e)||(topics[e]=[]),topics[e].push(t),!0}function t(e,t){if(!topics.hasOwnProperty(e))return!1;for(var n=0,r=topics[e].length;n<r;n++)if(topics[e][n]===t)return topics[e].splice(n,1),!0;return!1}function n(){var e=Array.prototype.slice.call(arguments),t=e.shift();if(!topics.hasOwnProperty(t))return!1;for(var n=0,r=topics[t].length;n<r;n++)topics[t][n].apply(undefined,e);return!0}return topics={},{subscribe:e,unsubscrive:t,publish:n,topics:topics}}),define("RNG",[],function(){function o(){a(Date.now())}function u(){return e}function a(o){o=o<1?1/o:o,e=o,t=(o>>>0)*s,o=o*69069+1>>>0,n=o*s,o=o*69069+1>>>0,r=o*s,i=1}function f(){var e=2091639*t+i*s;return t=n,n=r,i=e|0,r=e-i,r}function l(e,t){do var n=2*f()-1,r=2*f()-1,i=n*n+r*r;while(i>1||i==0);var s=n*Math.sqrt(-2*Math.log(i)/i);return(e||0)+s*(t||1)}function c(){return 1+Math.floor(f()*100)}function h(e){var t=[],n=0;for(var r in e)n+=e[r];var i=Math.floor(f()*n),s=0;for(var r in e){s+=e[r];if(i<s)return r}return null}function p(){return[t,n,r,i]}function d(e){t=e[0],n=e[1],r=e[2],i=e[3]}var e,t=0,n=0,r=0,i=0,s=2.3283064365386963e-10;return o(),{getSeed:u,setSeed:a,getUniform:f,getNormal:l,getPercentage:c,getWeightedValue:h,getState:p,setState:d}}),define("GraphNode",[],function(){function t(e,t,n){this.data={},this.x=e,this.y=t,this.pos={x:e,y:t},this.type=n}var e={OPEN:0,WALL:1};return t.prototype.toString=function(){return"["+this.x+" "+this.y+"]"},t.prototype.isWall=function(){return this.type==e.WALL},t}),define("Graph",["GraphNode"],function(e){function t(t){var n=[];for(var r=0;r<t.length;r++){n[r]=[];for(var i=0,s=t[r];i<s.length;i++)n[r][i]=new e(r,i,s[i])}this.input=t,this.nodes=n}return t.prototype.toString=function(){var e="\n",t=this.nodes,n,r,i,s;for(var o=0,u=t.length;o<u;o++){n="",r=t[o];for(i=0,s=r.length;i<s;i++)n+=r[i].type+" ";e=e+n+"\n"}return e},t}),define("World",["RNG","underscore","Graph"],function(e,t,n){function d(){a=t.compose(y,y,w,w,y,y,v,m)(),s=new n(a)}function v(t){var n,s;for(n=0;n<r;n++)for(s=0;s<i;s++)t[n][s]=e.getUniform()<h?1:0;return t}function m(){var e=[],t,n;for(t=0;t<r;t++){e[t]=[];for(n=0;n<i;n++)e[t][n]=0}return e}function g(e,t,n){var r=0;for(var s=0;s<p.length;s++){var o=p[s],u=t+o[0],a=n+o[1];if(u<0||u>=i||u<0||a>=i)continue;r+=e[u][a]===1?1:0}return r}function y(e){var t=0,n=m();for(var s=0;s<r;s++){var o=1,u=0;c===6&&(o=2,u=s%2);for(var a=u;a<i;a+=o){t++;var h=e[a][s],p=g(e,a,s);h&&l.indexOf(p)!==-1?n[a][s]=1:!h&&f.indexOf(p)!==-1&&(n[a][s]=1)}}return n}function b(e,t,n){a[e][t]=n}function w(e){var t=[],n=2;for(var s=0;s<r;s++)for(var o=0;o<n;o++){var u=s*n+o;t[u]=[];for(var a=0;a<i;a++)for(var f=0;f<n;f++){var l=a*n+f;t[u][l]=e[s][a]}}return i*=n,r*=n,t}function E(e,t){return e>=0&&t>=0?e<i?t<r?!1:!0:!0:!0}function S(e,t){return E(e,t)&&(e<=0?e=0:e>=i&&(e=i-1),t<=0?t=0:t>=r&&(t=r-1)),{x:e,y:t}}function x(e){return a[e.y][e.x]===0?!0:!1}var r=25,i=25,s,o=128,u=64,a=[],f=[5,6,7,8],l=[4,5,6,7,8],c=8,h=.47,p=[[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1]];return d(),{tileWidth:o,tileHeight:u,inBoundTile:S,outOfBound:E,tileIsOpen:x,height:r,width:i,mapData:a,graph:s}}),define("STL",["World","EventManager"],function(e,t){function n(){return Math.floor((1+Math.random())*65536).toString(16).substring(1)}function r(){return n()+n()+"-"+n()+"-"+n()+"-"+n()+"-"+n()+n()+n()}function i(e,t){console.log(e,t);var n={};return n.x=t+e,n.y=t-e,n}function s(e,t){var n={};return n.x=(e-t)/2,n.y=(e+t)/2,n}function o(t,n){var r=(t/(e.tileWidth/2)+n/(e.tileHeight/2))/2-e.width/2,i=(n/(e.tileHeight/2)-t/(e.tileWidth/2))/2+e.height/2;return r=Math.floor(r),i=Math.floor(i),{x:r,y:i}}function u(e,t){var n=setInterval(function(){e()&&(t,clearInterval(n))},1e3)}function a(e){return e=Math.round(e*2)/2,e}return{guid:r,isoToTwoD:i,twoDToIso:s,worldPosToGridPos:o,checkWait:u}}),define("actor",["EventManager","STL"],function(e,t){function n(e,n){this.coordinates=n,this.sprite=e,this.uuid=t.guid(),this.hp=0}return n.prototype.checkLeftClick=function(t){t.x==this.coordinates.x&&t.y==this.coordinates.y?(this.selected=!0,e.publish("actor.selected",this.uuid)):this.selected&&(this.selected=!1,e.publish("actor.unselected",this.uuid))},n.prototype.delete=function(){e.publish("actor.delete",this.uuid)},n}),define("BinaryHeap",[""],function(){function e(e){this.content=[],this.scoreFunction=e}return e.prototype={push:function(e){this.content.push(e),this.sinkDown(this.content.length-1)},pop:function(){var e=this.content[0],t=this.content.pop();return this.content.length>0&&(this.content[0]=t,this.bubbleUp(0)),e},remove:function(e){var t=this.content.indexOf(e),n=this.content.pop();t!==this.content.length-1&&(this.content[t]=n,this.scoreFunction(n)<this.scoreFunction(e)?this.sinkDown(t):this.bubbleUp(t))},size:function(){return this.content.length},rescoreElement:function(e){this.sinkDown(this.content.indexOf(e))},sinkDown:function(e){var t=this.content[e];while(e>0){var n=(e+1>>1)-1,r=this.content[n];if(!(this.scoreFunction(t)<this.scoreFunction(r)))break;this.content[n]=t,this.content[e]=r,e=n}},bubbleUp:function(e){var t=this.content.length,n=this.content[e],r=this.scoreFunction(n);for(;;){var i=e+1<<1,s=i-1,o=null;if(s<t){var u=this.content[s],a=this.scoreFunction(u);a<r&&(o=s)}if(i<t){var f=this.content[i],l=this.scoreFunction(f);l<(o===null?r:a)&&(o=i)}if(o===null)break;this.content[e]=this.content[o],this.content[o]=n,e=o}}},e}),define("Astar",["BinaryHeap"],function(e){var t={init:function(e){for(var t=0,n=e.length;t<n;t++)for(var r=0,i=e[t].length;r<i;r++){var s=e[t][r];s.f=0,s.g=0,s.h=0,s.cost=s.type,s.visited=!1,s.closed=!1,s.parent=null}},heap:function(){return new e(function(e){return e.f})},search:function(e,n,r,i,s){t.init(e),s=s||t.manhattan,i=!!i;var o=t.heap();o.push(n);while(o.size()>0){var u=o.pop();if(u===r){var a=u,f=[];while(a.parent)f.push(a),a=a.parent;return f.reverse()}u.closed=!0;var l=t.neighbors(e,u,i);for(var c=0,h=l.length;c<h;c++){var p=l[c];if(p.closed||p.isWall())continue;var d=u.g+p.cost,v=p.visited;if(!v||d<p.g)p.visited=!0,p.parent=u,p.h=p.h||s(p.pos,r.pos),p.g=d,p.f=p.g+p.h,v?o.rescoreElement(p):o.push(p)}}return[]},manhattan:function(e,t){var n=Math.abs(t.x-e.x),r=Math.abs(t.y-e.y);return n+r},neighbors:function(e,t,n){var r=[],i=t.x,s=t.y;return e[i-1]&&e[i-1][s]&&r.push(e[i-1][s]),e[i+1]&&e[i+1][s]&&r.push(e[i+1][s]),e[i]&&e[i][s-1]&&r.push(e[i][s-1]),e[i]&&e[i][s+1]&&r.push(e[i][s+1]),n&&(e[i-1]&&e[i-1][s-1]&&r.push(e[i-1][s-1]),e[i+1]&&e[i+1][s-1]&&r.push(e[i+1][s-1]),e[i-1]&&e[i-1][s+1]&&r.push(e[i-1][s+1]),e[i+1]&&e[i+1][s+1]&&r.push(e[i+1][s+1])),r}};return t}),define("actor.unit",["actor","EventManager","Astar","World","underscore"],function(e,t,n,r){function i(t,n){_.extend(this,new e(t,n)),this.path=[],this.focus="",this.strenght=0,this.dexterity=0,this.intelligence=0,this.health=0,this.death=!1,this.hp=50,this.attack=10}return i.prototype=Object.create(e.prototype),i.prototype.generatePath=function(){var e=r.graph.nodes[this.coordinates.y][this.coordinates.x],t=r.graph.nodes[this.goal.y][this.goal.x];this.path=n.search(r.graph.nodes,e,t,!0)},i.prototype.move=function(){if(this.path.length!==0){var e=_.first(this.path);this.path=_.rest(this.path),this.coordinates={x:e.y,y:e.x},t.publish("command",{event:"actor.update",parameters:this})}},i.prototype.checkDeath=function(){this.hp<=0&&!this.death&&(this.death=!0,this.delete())},i.prototype.attackActor=function(){this.focus!==""&&(console.log("pew "+this.attack+" damage"),t.publish("command",{event:"actor.attack."+this.focus,parameters:this.attack}))},i}),define("actor.unit.human",["actor.unit","EventManager"],function(e,t){function n(t,n){_.extend(this,new e(t,n))}return n.prototype=Object.create(e.prototype),n}),define("actor.unit.human.local",["actor.unit.human","EventManager"],function(e,t){function n(n,r){_.extend(this,new e(n,r)),this.focus="";var i=this;t.subscribe("mouse.click.right",function(e){i.checkRightClick(e)}),t.subscribe("mouse.click.left",function(e){i.checkLeftClick(e)}),t.subscribe("new.gamecycle",function(){i.move(),i.attackActor(),i.checkDeath()}),t.subscribe("actor.selected",function(e){i.focus=e}),t.subscribe("actor.unselected",function(e){i.focus===e&&(i.focus="")}),t.subscribe("actor.delete",function(e){i.focus===e&&(i.focus="")}),t.subscribe("actor.attack"+i.uuid,function(e){i.hp=i.hp-parseInt(e)}),t.publish("actor.create",this)}return n.prototype=Object.create(e.prototype),n.prototype.checkRightClick=function(e){this.goal=e,this.generatePath()},n}),define("actor.unit.ai",["actor.unit","EventManager"],function(e,t){function n(t,n){_.extend(this,new e(t,n))}return n.prototype=Object.create(e.prototype),n}),define("actor.unit.ai.enemy",["actor.unit.ai","EventManager"],function(e,t){function n(n,r){_.extend(this,new e(n,r));var i=this;t.subscribe("mouse.click.left",function(e){i.checkLeftClick(e)}),t.subscribe("new.gamecycle",function(){i.move(),i.attackActor(),i.checkDeath()}),t.subscribe("actor.attack."+i.uuid,function(e){i.hp=i.hp-parseInt(e),console.log("aww only "+i.hp+" left")}),t.publish("actor.create",this)}return n.prototype=Object.create(e.prototype),n.prototype.delete=function(){t.unsubscrive("mouse.click.left",function(e){that.checkLeftClick(e)}),t.unsubscrive("new.gamecycle"),t.unsubscrive("actor.selected"),t.unsubscrive("actor.attack."+this.uuid),t.publish("actor.delete",this.uuid),console.log("AAAAAAA Im death")},n}),define("text!AssetsList",[],function(){return'{\n  "0" : {\n    "name": "mapTiles",\n    "type": "atlas",\n    "configuration": "./art/panama.json",\n    "file": "./art/panama.png"\n  }\n}'}),define("SpriteSheet",[""],function(){var e=function(e,t){var n=[],r=e,i=t,s=function(){_.forEach(r.frames,function(e){var t=e,n=-t.frame.w*.5,r=-t.frame.h*.5;t.trimmed&&(n=t.spriteSourceSize.x-t.sourceSize.w*.5,r=t.spriteSourceSize.y-t.sourceSize.h*.5),o(t.filename,t.frame.x,t.frame.y,t.frame.w,t.frame.h,n,r)})},o=function(e,t,r,i,s,o,u){var a={id:e,x:t,y:r,w:i,h:s,cx:o===null?0:o,cy:u===null?0:u};n.push(a)};return s(),{img:i,sprites:n}};return e}),define("AssetLoader",["SpriteSheet","underscore","jQuery"],function(e){var t=0,n=function(t){var n=this;return _.forEach(t.config,function(r){n.queue++;switch(r.type){case"atlas":n.loadAtlas(r,function(i){t.loaded.atlas.push({name:r.name,sprite:new e(i.configuration,i.file)}),n.queue--});break;case"music":}}),t},r=function(){return this.queue>0?!1:!0},i=function(e,t){jQuery.getJSON(e.configuration,function(t){e.configuration=t}).then(function(){var n=new Image;n.src=e.file,e.file=n,t(e)})};return{preloadAssets:n,preloadComplete:r,loadAtlas:i}}),define("Assets",["text!AssetsList","AssetLoader","EventManager"],function(e,t,n){function i(){var e=setInterval(function(){t.preloadComplete()&&(n.publish("assets.loaded"),clearInterval(e))},1e3)}var r={config:{},loaded:{atlas:[],music:[]}};return r.config=JSON.parse(e),r=t.preloadAssets(r),i(),r}),define("CommandQueue",[""],function(){function t(t){e.push(t)}function n(){e=[]}function r(){return e}var e=[];return{add:t,get:r,clear:n}}),define("Command",["CommandQueue","EventManager"],function(e,t){function n(t){e.add(t)}function r(){var n=e.get();_.forEach(n,function(e){t.publish(e.event,e.parameters)}),e.clear()}t.subscribe("command",function(e){n(e)}),t.subscribe("new.gamecycle",function(){r()})}),define("RequestAnimationFrame",[""],function(){window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e,t){window.setTimeout(e,1e3/16.5)}}()}),define("Canvas",["World"],function(e){var t={},n={};return t.canvas=document.getElementById("mapCanvas"),t.context=t.canvas.getContext("2d"),n.canvas=document.getElementById("playerCanvas"),n.context=n.canvas.getContext("2d"),t.canvas.width=e.width*e.tileWidth,t.canvas.height=e.height*e.tileHeight,n.canvas.width=e.width*e.tileWidth,n.canvas.height=e.height*e.tileHeight,{terrain:t,player:n}}),define("Sprite",["underscore","Canvas","STL","World","Assets"],function(e,t,n,r,i){function s(s,o,u,a){var f,l={},c,h,p,d,v;switch(a){case"terrain":c=t.terrain.context,p=t.terrain.canvas;break;case"player":c=t.player.context,p=t.player.canvas;break;default:return}h=n.twoDToIso(o,u),h.x=h.x*r.tileWidth+p.width/2,h.y=h.y*r.tileHeight+r.tileHeight/2,e.findIndex(i.loaded.atlas,function(t){f=e.findWhere(t.sprite.sprites,{id:s}),v=t.sprite.img;if(!e.isEmpty(t))return});if(e.isEmpty(f))return;l.x=0,l.y=0,c.drawImage(v,f.x,f.y,f.w,f.h,h.x-r.tileWidth/2,h.y-r.tileHeight/2,r.tileWidth,r.tileHeight)}return{draw:s}}),define("Map",["EventManager","Canvas","World","STL","Sprite","jQuery"],function(e,t,n,r,i){function a(){f(),l(o.x,o.y)}function f(){t.terrain.context.clearRect(0,0,t.terrain.canvas.width,t.terrain.canvas.height);var e={x:0,y:0};for(var r=0;n.height>r;r++)for(var s=0;n.width>s;s++)n.outOfBound(e.y+r,e.x+s)||(n.mapData[e.y+r][e.x+s]===1?i.draw("sand.png",e.x+s,e.y+r,"terrain"):i.draw("water.png",e.x+s,e.y+r,"terrain"))}function l(e,i){var o=r.twoDToIso(e,i);o.x=-((o.x-s.x)*n.tileWidth+t.terrain.canvas.width/2),o.y=-((o.y-s.y)*n.tileHeight+n.tileHeight/2),$(t.terrain.canvas).css("margin-left",o.x).css("marginTop",o.y),$(t.terrain.canvas).css("margin-left",o.x).css("marginTop",o.y)}function c(){var e={x:0,y:0};u.up==1&&(e.y--,e.x--),u.down==1&&(e.y++,e.x++),u.left==1&&(e.x--,e.y++),u.right==1&&(e.x++,e.y--);if(e.x!==0||e.y!==0)e=n.inBoundTile(o.x+e.x,o.y+e.y),l(e.x,e.y),o.x=e.x,o.y=e.y}var s={x:10,y:10},o={x:10,y:10},u={up:0,down:0,left:0,right:0};e.subscribe("assets.loaded",function(){a()}),e.subscribe("new.frame",function(){c()}),e.subscribe("pan.up",function(e){u.up=e}),e.subscribe("pan.down",function(e){u.down=e}),e.subscribe("pan.left",function(e){u.left=e}),e.subscribe("pan.right",function(e){u.right=e})}),define("ActorList",["EventManager","Sprite","underscore"],function(e,t){var n=[],r=[];e.subscribe("actor.create",function(e){n.push({uuid:e.uuid,coordinates:e.coordinates,sprite:e.sprite})}),e.subscribe("actor.update",function(e){var t=_.findWhere(n,{uuid:e.uuid});r.push({coordinates:t.coordinates}),n=_.without(n,t),n.push({uuid:e.uuid,coordinates:e.coordinates,sprite:e.sprite})}),e.subscribe("actor.delete",function(e){var t=_.findWhere(n,{uuid:e});r.push({coordinates:t.coordinates}),n=_.without(n,t)});var i=function(){return n},s=function(){return r},o=function(){r=[]};return{getCleanUpList:s,clearCleanUpList:o,getActorList:i}}),define("Actors",["EventManager","Sprite","STL","World","Canvas","ActorList","underscore"],function(e,t,n,r,i,s){function f(){c(u.x,u.y)}function l(){var e={x:0,y:0};a.up==1&&(e.y--,0,e.x--),a.down==1&&(e.y++,e.x++),a.left==1&&(e.x--,e.y++),a.right==1&&(e.x++,e.y--);if(e.x!==0||e.y!==0)e=r.inBoundTile(u.x+e.x,u.y+e.y),c(e.x,e.y),u.x=e.x,u.y=e.y;_.each(s.getCleanUpList(),function(e){t.draw("water.png",e.coordinates.x,e.coordinates.y,"player")}),s.clearCleanUpList(),_.each(s.getActorList(),function(e){t.draw(e.sprite,e.coordinates.x,e.coordinates.y,"player")})}function c(e,t){var s=n.twoDToIso(e,t);s.x=-((s.x-o.x)*r.tileWidth+i.player.canvas.width/2),s.y=-((s.y-o.y)*r.tileHeight+r.tileHeight/2),$(i.player.canvas).css("margin-left",s.x).css("marginTop",s.y),$(i.terrain.canvas).css("margin-left",s.x).css("marginTop",s.y)}var o={x:10,y:10},u={x:10,y:10},a={up:0,down:0,left:0,right:0};e.subscribe("new.frame",function(){l()}),e.subscribe("pan.up",function(e){a.up=e}),e.subscribe("pan.down",function(e){a.down=e}),e.subscribe("pan.left",function(e){a.left=e}),e.subscribe("pan.right",function(e){a.right=e}),f()}),define("Animate",["EventManager","RequestAnimationFrame","Map","Actors"],function(e,t){function n(){e.publish("new.frame"),window.setTimeout(n,50)}return e.subscribe("assets.loaded",function(){n()}),{}}),define("Mouse",["Canvas","STL"],function(e,t){function i(e){n=e}function s(e){r=e}var n=function(e){console.log("The right mouse click is not assigned, define leftMouseCallback")},r=function(e){console.log("The left mouse click is not assigned, define rightMouseCallback")};return HTMLCanvasElement.prototype.relMouseCoordinates=function(e){var t=0,n=0,r=0,i=0,s=this;do t+=s.offsetLeft-s.scrollLeft,n+=s.offsetTop-s.scrollTop;while(s===s.offsetParent);return r=e.pageX-t,i=e.pageY-n,{x:r,y:i}},window.oncontextmenu=function(e){return e.preventDefault(),e.stopPropagation(),!1},e.player.canvas.addEventListener("click",function(r){var i=e.player.canvas.relMouseCoordinates(r);i=t.worldPosToGridPos(i.x,i.y,e.player.canvas.width),n(i)},!1),e.player.canvas.addEventListener("contextmenu",function(n){var i=e.player.canvas.relMouseCoordinates(n);i=t.worldPosToGridPos(i.x,i.y,e.player.canvas.width),r(i)},!1),{setLeftMouseCallback:i,setRightMouseCallback:s}}),define("Input",["EventManager","Mouse","keypress"],function(e,t){var n=[{keys:"up",prevent_repeat:!0,on_keydown:function(){e.publish("pan.up",1)},on_keyup:function(){e.publish("pan.up",0)}},{keys:"down",prevent_repeat:!0,on_keydown:function(){e.publish("pan.down",1)},on_keyup:function(){e.publish("pan.down",0)}},{keys:"left",prevent_repeat:!0,on_keydown:function(){e.publish("pan.left",1)},on_keyup:function(){e.publish("pan.left",0)}},{keys:"right",prevent_repeat:!0,on_keydown:function(){e.publish("pan.right",1)},on_keyup:function(){e.publish("pan.right",0)}}];keypress.register_many(n),t.setLeftMouseCallback(function(t){e.publish("mouse.click.left",t)}),t.setRightMouseCallback(function(t){e.publish("mouse.click.right",t)})}),define("scripts/application/game",["actor.unit.human.local","actor.unit.ai.enemy","Assets","EventManager","Command","Animate","Input"],function(e,t,n,r){function i(){s(),game.frank=new e("player.png",{x:5,y:5}),game.ruben=new t("ally.png",{x:10,y:10})}function s(){setTimeout(s,200),r.publish("new.gamecycle")}r.subscribe("assets.loaded",function(){i()})});