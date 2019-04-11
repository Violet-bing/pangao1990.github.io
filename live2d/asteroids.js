// build time:Thu Apr 11 2019 17:33:51 GMT+0800 (GMT+08:00)
(function(){function Asteroids(){if(!window.ASTEROIDS)window.ASTEROIDS={enemiesKilled:0};function Vector(e,t){if(typeof e=="Object"){this.x=e.x;this.y=e.y}else{this.x=e;this.y=t}}Vector.prototype={cp:function(){return new Vector(this.x,this.y)},mul:function(e){this.x*=e;this.y*=e;return this},mulNew:function(e){return new Vector(this.x*e,this.y*e)},add:function(e){this.x+=e.x;this.y+=e.y;return this},addNew:function(e){return new Vector(this.x+e.x,this.y+e.y)},sub:function(e){this.x-=e.x;this.y-=e.y;return this},subNew:function(e){return new Vector(this.x-e.x,this.y-e.y)},rotate:function(e){var t=this.x,i=this.y;this.x=t*Math.cos(e)-Math.sin(e)*i;this.y=t*Math.sin(e)+Math.cos(e)*i;return this},rotateNew:function(e){return this.cp().rotate(e)},setAngle:function(e){var t=this.len();this.x=Math.cos(e)*t;this.y=Math.sin(e)*t;return this},setAngleNew:function(e){return this.cp().setAngle(e)},setLength:function(e){var t=this.len();if(t)this.mul(e/t);else this.x=this.y=e;return this},setLengthNew:function(e){return this.cp().setLength(e)},normalize:function(){var e=this.len();this.x/=e;this.y/=e;return this},normalizeNew:function(){return this.cp().normalize()},angle:function(){return Math.atan2(this.y,this.x)},collidesWith:function(e){return this.x>e.x&&this.y>e.y&&this.x<e.x+e.width&&this.y<e.y+e.height},len:function(){var e=Math.sqrt(this.x*this.x+this.y*this.y);if(e<.005&&e>-.005)return 0;return e},is:function(e){return typeof e=="object"&&this.x==e.x&&this.y==e.y},toString:function(){return"[Vector("+this.x+", "+this.y+") angle: "+this.angle()+", length: "+this.len()+"]"}};function Line(e,t){this.p1=e;this.p2=t}Line.prototype={shift:function(e){this.p1.add(e);this.p2.add(e)},intersectsWithRect:function(e){var t=new Vector(e.x,e.y+e.height);var i=new Vector(e.x,e.y);var s=new Vector(e.x+e.width,e.y+e.height);var n=new Vector(e.x+e.width,e.y);if(this.p1.x>t.x&&this.p1.x<n.x&&this.p1.y<t.y&&this.p1.y>n.y&&this.p2.x>t.x&&this.p2.x<n.x&&this.p2.y<t.y&&this.p2.y>n.y)return true;if(this.intersectsLine(new Line(i,t)))return true;if(this.intersectsLine(new Line(t,s)))return true;if(this.intersectsLine(new Line(i,n)))return true;if(this.intersectsLine(new Line(n,s)))return true;return false},intersectsLine:function(e){var t=this.p1,i=this.p2;var s=e.p1,n=e.p2;var a=(n.y-s.y)*(i.x-t.x)-(n.x-s.x)*(i.y-t.y);var r=(n.x-s.x)*(t.y-s.y)-(n.y-s.y)*(t.x-s.x);var o=(i.x-t.x)*(t.y-s.y)-(i.y-t.y)*(t.x-s.x);if(a==0){return false}var l=r/a;var h=o/a;return l>=0&&l<=1&&h>=0&&h<=1}};var that=this;var isIE=!!window.ActiveXObject;var w=document.documentElement.clientWidth,h=document.documentElement.clientHeight;var playerWidth=20,playerHeight=30;var playerVerts=[[-1*playerHeight/2,-1*playerWidth/2],[-1*playerHeight/2,playerWidth/2],[playerHeight/2,0]];var ignoredTypes=["HTML","HEAD","BODY","SCRIPT","TITLE","META","STYLE","LINK","SHAPE","LINE","GROUP","IMAGE","STROKE","FILL","SKEW","PATH","TEXTPATH"];var hiddenTypes=["BR","HR"];var FPS=50;var acc=300;var maxSpeed=600;var rotSpeed=360;var bulletSpeed=700;var particleSpeed=400;var timeBetweenFire=150;var timeBetweenBlink=250;var timeBetweenEnemyUpdate=isIE?1e4:2e3;var bulletRadius=2;var maxParticles=isIE?20:40;var maxBullets=isIE?10:20;this.flame={r:[],y:[]};this.toggleBlinkStyle=function(){if(this.updated.blink.isActive){removeClass(document.body,"ASTEROIDSBLINK")}else{addClass(document.body,"ASTEROIDSBLINK")}this.updated.blink.isActive=!this.updated.blink.isActive};addStylesheet(".ASTEROIDSBLINK .ASTEROIDSYEAHENEMY","outline: 2px dotted red;");this.pos=new Vector(100,100);this.lastPos=false;this.vel=new Vector(0,0);this.dir=new Vector(0,1);this.keysPressed={};this.firedAt=false;this.updated={enemies:false,flame:(new Date).getTime(),blink:{time:0,isActive:false}};this.scrollPos=new Vector(0,0);this.bullets=[];this.enemies=[];this.dying=[];this.totalEnemies=0;this.particles=[];function updateEnemyIndex(){for(var e=0,t;t=that.enemies[e];e++)removeClass(t,"ASTEROIDSYEAHENEMY");var i=document.body.getElementsByTagName("*");that.enemies=[];for(var e=0,s;s=i[e];e++){if(indexOf(ignoredTypes,s.tagName.toUpperCase())==-1&&s.prefix!="g_vml_"&&hasOnlyTextualChildren(s)&&s.className!="ASTEROIDSYEAH"&&s.offsetHeight>0){s.aSize=size(s);that.enemies.push(s);addClass(s,"ASTEROIDSYEAHENEMY");if(!s.aAdded){s.aAdded=true;that.totalEnemies++}}}}updateEnemyIndex();var createFlames;(function(){var e=playerWidth,t=playerWidth*.1,i=playerWidth*.6,s=i*.2,n=e/2,a=i/2,r=playerHeight/2;createFlames=function(){that.flame.r=[[-1*r,-1*n]];that.flame.y=[[-1*r,-1*a]];for(var o=0;o<e;o+=t){that.flame.r.push([-random(2,7)-r,o-n])}that.flame.r.push([-1*r,n]);for(var o=0;o<i;o+=s){that.flame.y.push([-random(2,7)-r,o-a])}that.flame.y.push([-1*r,a])}})();createFlames();function radians(e){return e*.0174532925}function degrees(e){return e*57.2957795}function random(e,t){return Math.floor(Math.random()*(t+1)+e)}function code(e){var t={up:38,down:40,left:37,right:39,esc:27};if(t[e])return t[e];return e.charCodeAt(0)}function boundsCheck(e){if(e.x>w)e.x=0;else if(e.x<0)e.x=w;if(e.y>h)e.y=0;else if(e.y<0)e.y=h}function size(e){var t=e,i=0,s=0;do{i+=t.offsetLeft||0;s+=t.offsetTop||0;t=t.offsetParent}while(t);return{x:i,y:s,width:e.offsetWidth||10,height:e.offsetHeight||10}}function addEvent(e,t,i){if(e.addEventListener)e.addEventListener(t,i,false);else if(e.attachEvent){e["e"+t+i]=i;e[t+i]=function(){e["e"+t+i](window.event)};e.attachEvent("on"+t,e[t+i])}}function removeEvent(e,t,i){if(e.removeEventListener)e.removeEventListener(t,i,false);else if(e.detachEvent){e.detachEvent("on"+t,e[t+i]);e[t+i]=null;e["e"+t+i]=null}}function arrayRemove(e,t,i){var s=e.slice((i||t)+1||e.length);e.length=t<0?e.length+t:t;return e.push.apply(e,s)}function applyVisibility(e){for(var t=0,i;i=window.ASTEROIDSPLAYERS[t];t++){i.gameContainer.style.visibility=e}}function getElementFromPoint(e,t){applyVisibility("hidden");var i=document.elementFromPoint(e,t);if(!i){applyVisibility("visible");return false}if(i.nodeType==3)i=i.parentNode;applyVisibility("visible");return i}function addParticles(e){var t=(new Date).getTime();var i=maxParticles;for(var s=0;s<i;s++){that.particles.push({dir:new Vector(Math.random()*20-10,Math.random()*20-10).normalize(),pos:e.cp(),cameAlive:t})}}function setScore(){that.points.innerHTML=window.ASTEROIDS.enemiesKilled*10}function hasOnlyTextualChildren(e){if(e.offsetLeft<-100&&e.offsetWidth>0&&e.offsetHeight>0)return false;if(indexOf(hiddenTypes,e.tagName)!=-1)return true;if(e.offsetWidth==0&&e.offsetHeight==0)return false;for(var t=0;t<e.childNodes.length;t++){if(indexOf(hiddenTypes,e.childNodes[t].tagName)==-1&&e.childNodes[t].childNodes.length!=0)return false}return true}function indexOf(e,t,i){if(e.indexOf)return e.indexOf(t,i);var s=e.length;for(var n=i<0?Math.max(0,s+i):i||0;n<s;n++){if(e[n]===t)return n}return-1}function addClass(e,t){if(e.className.indexOf(t)==-1)e.className=(e.className+" "+t).replace(/\s+/g," ").replace(/^\s+|\s+$/g,"")}function removeClass(e,t){e.className=e.className.replace(new RegExp("(^|\\s)"+t+"(?:\\s|$)"),"$1")}function addStylesheet(e,t){var i=document.createElement("style");i.type="text/css";i.rel="stylesheet";i.id="ASTEROIDSYEAHSTYLES";try{i.innerHTML=e+"{"+t+"}"}catch(s){i.styleSheet.addRule(e,t)}document.getElementsByTagName("head")[0].appendChild(i)}function removeStylesheet(e){var t=document.getElementById(e);if(t){t.parentNode.removeChild(t)}}this.gameContainer=document.createElement("div");this.gameContainer.className="ASTEROIDSYEAH";document.body.appendChild(this.gameContainer);this.canvas=document.createElement("canvas");this.canvas.setAttribute("width",w);this.canvas.setAttribute("height",h);this.canvas.className="ASTEROIDSYEAH";with(this.canvas.style){width=w+"px";height=h+"px";position="fixed";top="0px";left="0px";bottom="0px";right="0px";zIndex="10000"}if(typeof G_vmlCanvasManager!="undefined"){this.canvas=G_vmlCanvasManager.initElement(this.canvas);if(!this.canvas.getContext){alert("So... you are using IE?  Sorry but at the moment WebsiteAsteroids only supports Firefox")}}else{if(!this.canvas.getContext){alert("This program does not yet support your browser. Please join me at https://github.com/erkie/erkie.github.com if you think you can help")}}addEvent(this.canvas,"mousedown",function(e){e=e||window.event;var t=document.createElement("span");t.style.position="absolute";t.style.color="red";t.innerHTML="Press Esc to Quit";document.body.appendChild(t);var i=e.pageX||e.clientX+document.documentElement.scrollLeft;var s=e.pageY||e.clientY+document.documentElement.scrollTop;t.style.left=i-t.offsetWidth/2+"px";t.style.top=s-t.offsetHeight/2+"px";setTimeout(function(){try{t.parentNode.removeChild(t)}catch(e){}},1e3)});var eventResize=function(){that.canvas.style.display="none";w=document.documentElement.clientWidth;h=document.documentElement.clientHeight;that.canvas.setAttribute("width",w);that.canvas.setAttribute("height",h);with(that.canvas.style){display="block";width=w+"px";height=h+"px"}};addEvent(window,"resize",eventResize);this.gameContainer.appendChild(this.canvas);this.ctx=this.canvas.getContext("2d");this.ctx.fillStyle="black";this.ctx.strokeStyle="black";if(!document.getElementById("ASTEROIDS-NAVIGATION")){this.navigation=document.createElement("div");this.navigation.id="ASTEROIDS-NAVIGATION";this.navigation.className="ASTEROIDSYEAH";with(this.navigation.style){fontFamily="Arial,sans-serif";position="fixed";zIndex="10001";bottom="20px";right="10px";textAlign="right"}this.navigation.innerHTML="(Press Esc to Quit) ";this.gameContainer.appendChild(this.navigation);this.points=document.createElement("span");this.points.id="ASTEROIDS-POINTS";this.points.style.font="28pt Arial, sans-serif";this.points.style.fontWeight="bold";this.points.className="ASTEROIDSYEAH";this.navigation.appendChild(this.points)}else{this.navigation=document.getElementById("ASTEROIDS-NAVIGATION");this.points=document.getElementById("ASTEROIDS-POINTS")}setScore();if(typeof G_vmlCanvasManager!="undefined"){var children=this.canvas.getElementsByTagName("*");for(var i=0,c;c=children[i];i++)addClass(c,"ASTEROIDSYEAH")}var eventKeydown=function(e){e=e||window.event;that.keysPressed[e.keyCode]=true;switch(e.keyCode){case code(" "):that.firedAt=1;break}if(indexOf([code("up"),code("down"),code("right"),code("left"),code(" "),code("B"),code("W"),code("A"),code("S"),code("D")],e.keyCode)!=-1){if(e.preventDefault)e.preventDefault();if(e.stopPropagation)e.stopPropagation();e.returnValue=false;e.cancelBubble=true;return false}};addEvent(document,"keydown",eventKeydown);var eventKeypress=function(e){e=e||window.event;if(indexOf([code("up"),code("down"),code("right"),code("left"),code(" "),code("W"),code("A"),code("S"),code("D")],e.keyCode||e.which)!=-1){if(e.preventDefault)e.preventDefault();if(e.stopPropagation)e.stopPropagation();e.returnValue=false;e.cancelBubble=true;return false}};addEvent(document,"keypress",eventKeypress);var eventKeyup=function(e){e=e||window.event;that.keysPressed[e.keyCode]=false;if(indexOf([code("up"),code("down"),code("right"),code("left"),code(" "),code("B"),code("W"),code("A"),code("S"),code("D")],e.keyCode)!=-1){if(e.preventDefault)e.preventDefault();if(e.stopPropagation)e.stopPropagation();e.returnValue=false;e.cancelBubble=true;return false}};addEvent(document,"keyup",eventKeyup);this.ctx.clear=function(){this.clearRect(0,0,w,h)};this.ctx.clear();this.ctx.drawLine=function(e,t,i,s){this.beginPath();this.moveTo(e,t);this.lineTo(i,s);this.lineTo(i+1,s+1);this.closePath();this.fill()};this.ctx.tracePoly=function(e){this.beginPath();this.moveTo(e[0][0],e[0][1]);for(var t=1;t<e.length;t++)this.lineTo(e[t][0],e[t][1]);this.closePath()};this.ctx.drawPlayer=function(){this.save();this.translate(that.pos.x,that.pos.y);this.rotate(that.dir.angle());this.tracePoly(playerVerts);this.fillStyle="white";this.fill();this.tracePoly(playerVerts);this.stroke();this.restore()};var PI_SQ=Math.PI*2;this.ctx.drawBullets=function(e){for(var t=0;t<e.length;t++){this.beginPath();this.arc(e[t].pos.x,e[t].pos.y,bulletRadius,0,PI_SQ,true);this.closePath();this.fill()}};var randomParticleColor=function(){return["red","yellow"][random(0,1)]};this.ctx.drawParticles=function(e){var t=this.fillStyle;for(var i=0;i<e.length;i++){this.fillStyle=randomParticleColor();this.drawLine(e[i].pos.x,e[i].pos.y,e[i].pos.x-e[i].dir.x*10,e[i].pos.y-e[i].dir.y*10)}this.fillStyle=t};this.ctx.drawFlames=function(e){this.save();this.translate(that.pos.x,that.pos.y);this.rotate(that.dir.angle());var t=this.strokeStyle;this.strokeStyle="red";this.tracePoly(e.r);this.stroke();this.strokeStyle="yellow";this.tracePoly(e.y);this.stroke();this.strokeStyle=t;this.restore()};addParticles(this.pos);addClass(document.body,"ASTEROIDSYEAH");var isRunning=true;var lastUpdate=(new Date).getTime();this.update=function(){var e=false;var t=(new Date).getTime();var i=(t-lastUpdate)/1e3;lastUpdate=t;var s=false;if(t-this.updated.flame>50){createFlames();this.updated.flame=t}this.scrollPos.x=window.pageXOffset||document.documentElement.scrollLeft;this.scrollPos.y=window.pageYOffset||document.documentElement.scrollTop;if(this.keysPressed[code("up")]||this.keysPressed[code("W")]){this.vel.add(this.dir.mulNew(acc*i));s=true}else{this.vel.mul(.96)}if(this.keysPressed[code("left")]||this.keysPressed[code("A")]){e=true;this.dir.rotate(radians(rotSpeed*i*-1))}if(this.keysPressed[code("right")]||this.keysPressed[code("D")]){e=true;this.dir.rotate(radians(rotSpeed*i))}if(this.keysPressed[code(" ")]&&t-this.firedAt>timeBetweenFire){this.bullets.unshift({dir:this.dir.cp(),pos:this.pos.cp(),startVel:this.vel.cp(),cameAlive:t});this.firedAt=t;if(this.bullets.length>maxBullets){this.bullets.pop()}}if(this.keysPressed[code("B")]){if(!this.updated.enemies){updateEnemyIndex();this.updated.enemies=true}e=true;this.updated.blink.time+=i*1e3;if(this.updated.blink.time>timeBetweenBlink){this.toggleBlinkStyle();this.updated.blink.time=0}}else{this.updated.enemies=false}if(this.keysPressed[code("esc")]){destroy.apply(this);return}if(this.vel.len()>maxSpeed){this.vel.setLength(maxSpeed)}this.pos.add(this.vel.mulNew(i));if(this.pos.x>w){window.scrollTo(this.scrollPos.x+50,this.scrollPos.y);this.pos.x=0}else if(this.pos.x<0){window.scrollTo(this.scrollPos.x-50,this.scrollPos.y);this.pos.x=w}if(this.pos.y>h){window.scrollTo(this.scrollPos.x,this.scrollPos.y+h*.75);this.pos.y=0}else if(this.pos.y<0){window.scrollTo(this.scrollPos.x,this.scrollPos.y-h*.75);this.pos.y=h}for(var n=this.bullets.length-1;n>=0;n--){if(t-this.bullets[n].cameAlive>2e3){this.bullets.splice(n,1);e=true;continue}var a=this.bullets[n].dir.setLengthNew(bulletSpeed*i).add(this.bullets[n].startVel.mulNew(i));this.bullets[n].pos.add(a);boundsCheck(this.bullets[n].pos);var r=getElementFromPoint(this.bullets[n].pos.x,this.bullets[n].pos.y);if(r&&r.tagName&&indexOf(ignoredTypes,r.tagName.toUpperCase())==-1&&hasOnlyTextualChildren(r)&&r.className!="ASTEROIDSYEAH"){didKill=true;addParticles(this.bullets[n].pos);this.dying.push(r);this.bullets.splice(n,1);continue}}if(this.dying.length){for(var n=this.dying.length-1;n>=0;n--){try{if(this.dying[n].parentNode)window.ASTEROIDS.enemiesKilled++;this.dying[n].parentNode.removeChild(this.dying[n])}catch(o){}}setScore();this.dying=[]}for(var n=this.particles.length-1;n>=0;n--){this.particles[n].pos.add(this.particles[n].dir.mulNew(particleSpeed*i*Math.random()));if(t-this.particles[n].cameAlive>1e3){this.particles.splice(n,1);e=true;continue}}if(e||this.bullets.length!=0||this.particles.length!=0||!this.pos.is(this.lastPos)||this.vel.len()>0){this.ctx.clear();this.ctx.drawPlayer();if(s)this.ctx.drawFlames(that.flame);if(this.bullets.length){this.ctx.drawBullets(this.bullets)}if(this.particles.length){this.ctx.drawParticles(this.particles)}}this.lastPos=this.pos;setTimeout(updateFunc,1e3/FPS)};var updateFunc=function(){that.update.call(that)};setTimeout(updateFunc,1e3/FPS);function destroy(){removeEvent(document,"keydown",eventKeydown);removeEvent(document,"keypress",eventKeypress);removeEvent(document,"keyup",eventKeyup);removeEvent(window,"resize",eventResize);isRunning=false;removeStylesheet("ASTEROIDSYEAHSTYLES");removeClass(document.body,"ASTEROIDSYEAH");this.gameContainer.parentNode.removeChild(this.gameContainer)}}if(!window.ASTEROIDSPLAYERS)window.ASTEROIDSPLAYERS=[];if(window.ActiveXObject){try{var xamlScript=document.createElement("script");xamlScript.setAttribute("type","text/xaml");xamlScript.textContent='<?xml version="1.0"?><Canvas xmlns="https://schemas.microsoft.com/client/2007"></Canvas>';document.getElementsByTagName("head")[0].appendChild(xamlScript)}catch(e){}var script=document.createElement("script");script.setAttribute("type","text/javascript");script.onreadystatechange=function(){if(script.readyState=="loaded"||script.readyState=="complete"){if(typeof G_vmlCanvasManager!="undefined")window.ASTEROIDSPLAYERS[window.ASTEROIDSPLAYERS.length]=new Asteroids}};script.src="https://erkie.github.com/excanvas.js";document.getElementsByTagName("head")[0].appendChild(script)}else window.ASTEROIDSPLAYERS[window.ASTEROIDSPLAYERS.length]=new Asteroids})();
//rebuild by neat 