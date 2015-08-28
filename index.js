
var canvas, ctx;

var msg, level_title;

var posx = 0;
var posy = 0;
var dirs=[0,0,0,0];

var paused=false;
var suspended=false;

var paradox=null;

var time = 0;
var isfwd = true;
var hasbox = false;

var active_buttons;

var shouldflip=false;
var shouldgrab=false;

var histories = [];
var historyBounds=[];
var blocks = [];
var boxes = [];
var triggers = [];

var level;

var aframe;

var fundamental;

var replay_check_state = REPLAY_STATE_NONE;
var replay_immobile_ct = 0;

var muted;

function detrand(seed){
	return goodMod(Math.sin(seed) * 10000,1)
}

function setup(){
	canvas = document.getElementById('c');
	ctx = canvas.getContext('2d');
	enhanceContext(canvas,ctx);
	muted = false;
}

function enhanceContext(canvas, context) {
    var ratio = window.devicePixelRatio || 1,
        width = canvas.width,
        height = canvas.height;

    if (ratio > 1) {
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        context.scale(ratio, ratio);
    }
}

function start(){
	load_level(0);
}

function reload_level(){
	load_level(level);
}
function load_level(lnum){
	level = lnum;

	blocks = [
		[BLOCK_WALL,-1,-1,1,SCR_SIZE],
		[BLOCK_WALL,-1,-1,SCR_SIZE,1],
		[BLOCK_WALL,NUM_BLOCKS,-1,1,SCR_SIZE],
		[BLOCK_WALL,-1,NUM_BLOCKS,SCR_SIZE,1]
	].concat(levels[lnum][1]);

	level_title = levels[lnum][0];
	msg=[];

	reset_audio(lnum);

	boxes = [];
	triggers = [];

	time = 0;
	isfwd = true;
	hasbox = false;
	histories = [{}];
	historyBounds=[[0]];
	paradox=null;
	paused=false;
	suspended=false;
	replay_check_state = REPLAY_STATE_NONE;

	shouldflip=false;
	shouldgrab=false;

	for(var i = 0; i < blocks.length; i++){
		var obj = blocks[i];
		switch(obj[0]){
			case BLOCK_SPAWN:
				posx = obj[1]+.5;
				posy = obj[2]+.5;
				break;
			case BLOCK_BOX:
				boxes.push([obj[1]+.5,obj[2]+.5]);
				break;
			case BLOCK_TRIGGER:
				triggers[i]=[NaN,NaN];
				break;
		}
	}
	
	active_buttons=checkButtons();
}

function goodMod(x,m){
	return (x%m+m)%m;
}

function hits(x,y,obj){
	return x > obj[1]-RADIUS
		&& x < obj[1]+obj[3]+RADIUS
		&& y > obj[2]-RADIUS
		&& y < obj[2]+obj[4]+RADIUS;
}

function on(x,y,obj){
	return x > obj[1]
		&& x < obj[1]+obj[3]
		&& y > obj[2]
		&& y < obj[2]+obj[4];
}

function pressed_button(obj){
	var pressed = false;
	for(var j = 0; j < boxes.length; j++){
		var box=boxes[j];
		if(near(obj[1]+.5,obj[2]+.5,box[0],box[1]))
			pressed = true;
	};
	return pressed;
}

function pressed_trigger(i){
	return (triggers[i][0] < time || triggers[i][1] > time);
}

function checkButtons(){
	var res={};
	var idx=97;//'a'.charCodeAt(0);
	for(var i = 0; i < blocks.length; i++){
		var obj = blocks[i];
		if(obj[0]==BLOCK_BUTTON){
			res[String.fromCharCode(idx++)]=pressed_button(obj);
		}else if(obj[0]==BLOCK_TRIGGER){
			res[String.fromCharCode(idx++)]=pressed_trigger(i);
		}
	}
	return res;
}

/*
Format: abCD4:2
	means a active || b active || c not active || d not active || time%4==2
	Can omit the :2 for ==0
 */
var active_code_re = /([A-Za-z]*)(\d*)(?::(\d*))?/;
function checkActive(obj){
	if(obj[5]==undefined) return true;
	var parts = active_code_re.exec(obj[5]);
	for(var i = 0; i < parts[1].length; i++){
		var lower = parts[1][i].toLowerCase();
		if(lower!=parts[1][i] ^ active_buttons[lower]) return true;
	}
	if(!parts[2]) return false;
	return goodMod(Math.floor(time/60),parseInt(parts[2])) == (parseInt(parts[3])||0);
}

function getConnectedObjs(obj){
	if(obj[5]==undefined) return [];
	var parts = active_code_re.exec(obj[5]);
	var idxmap = {};
	var res = [];
	for(var i = 0; i < parts[1].length; i++){
		idxmap[parts[1][i].toLowerCase().charCodeAt(0)-97]=1;
	}
	var idx = 0;
	for(var i = 0; i < blocks.length; i++){
		var cobj = blocks[i];
		if(cobj[0]==BLOCK_BUTTON || cobj[0]==BLOCK_TRIGGER){
			if(idxmap[idx++]) res.push(i);
		}
	}
	return res;
}

function checkCollides(x,y,fwd,box){
	for(var i = 0; i < blocks.length; i++){
		var obj=blocks[i];
		var active = checkActive(obj);
		if([
				1,// BLOCK_WALL
				active,// BLOCK_DOOR
				!fwd&&active,// BLOCK_FWD
				fwd&&active,// BLOCK_BWD
				box&&active,// BLOCK_NOBOX
				// 0,// BLOCK_BUTTON
				// 0,// BLOCK_LASER
				// 0,// BLOCK_BOX
				// 0,// BLOCK_SPAWN
				// 0// BLOCK_EXIT
				][obj[0]] && hits(x,y,obj))
			return obj;
	};
}

function check_oneway(x,y){
	var allowed_dirs = [1,1,1,1];
	for(var i = 0; i < blocks.length; i++){
		var obj=blocks[i];
		if(obj[0]==BLOCK_ONEWAY && on(x,y,obj))
			allowed_dirs[obj[5]] = 0;
	}
	return allowed_dirs;
}

function killed(x,y){
	for(var i = 0; i < blocks.length; i++){
		var obj=blocks[i];
		if(obj[0]==BLOCK_LASER && hits(x,y,obj) && checkActive(obj))
			return true;
	};
}
function near(x1,y1,x2,y2){
	return abs(x1-x2)+abs(y1-y2)<2*RADIUS;
}
function grabBox(x,y){
	for(var i = 0; i < boxes.length; i++){
		var box = boxes[i];
		if(near(box[0],box[1],x,y)){
			var allowed_dirs = check_oneway(x,y);
			if( (box[1]>y&&!allowed_dirs[1])
				||(box[1]<y&&!allowed_dirs[3])
				||(box[0]>x&&!allowed_dirs[0])
				||(box[0]<x&&!allowed_dirs[2]) )
				continue;
			boxes.splice(i,1);
			return box;
		}
	}
}

function move_player(){

	var allowed_dirs = check_oneway(posx,posy);

	var velx = SPEED*(dirs[2]*allowed_dirs[2]-dirs[0]*allowed_dirs[0]);
	var vely = SPEED*(dirs[3]*allowed_dirs[3]-dirs[1]*allowed_dirs[1]);


	if(!checkCollides(posx+velx,posy,isfwd,hasbox))
		posx += velx;
	if(!checkCollides(posx,posy+vely,isfwd,hasbox))
		posy += vely;

	if(killed(posx,posy)){
		suspended=true;
		paradox = [posx,posy];
		msg=["You were killed by a laser.","R to restart"];
	}

	var dropped_box, old_box_pos, pstate;
	if(shouldgrab){
		if(hasbox){
			boxes.push([posx,posy]);
			dropped_box = [posx,posy];
			hasbox=false;
		}else if(!checkCollides(posx,posy,isfwd,!hasbox)
				 && (pstate = histories[0][time+(isfwd?-1:1)])
				 && (old_box_pos = grabBox(posx,posy))  ){
			pstate[3] = old_box_pos;
			hasbox=true;
		}else{
			for(var i = 0; i < blocks.length; i++){
				var obj=blocks[i];
				if(near(posx,posy,obj[1]+.5,obj[2]+.5)){
					switch(obj[0]){
						case BLOCK_TRIGGER:
							if(!pressed_trigger(i)){
								triggers[i][isfwd?0:1] = time;
							}
							break;
						case BLOCK_LEVELSELECT:
							load_level(obj[5]);
							return false;
						case BLOCK_EXIT:
							replay_check_state = REPLAY_STATE_REWIND;
							replay_immobile_ct = 0;
							break;
					}
				}
			}
		}
	} 
	shouldgrab=false;

	var hit_obj = checkCollides(posx,posy,isfwd,hasbox);
	if(hit_obj){
		suspended=true;
		paradox = [posx,posy];
		switch(hit_obj[0]){
			case BLOCK_DOOR:
				msg = ["You got hit by a door.","R to restart"];
				break;
			case BLOCK_FWD:
			case BLOCK_BWD:
			case BLOCK_NOBOX:
				msg = ["You got caught in an incompatible field.","R to restart"];
				break;
			default:
				msg = ["You died.","R to restart"];
		}
	}


	if(level==0)
		msg=[];
	for(var i = 0; i < blocks.length; i++){
		var obj=blocks[i];
		if(obj[0]==BLOCK_LEVELSELECT && near(posx,posy,obj[1]+.5,obj[2]+.5)){
			msg=["Level "+obj[5]+": "+levels[obj[5]][0]];
		}
	}

	histories[0][time] = [posx,posy,hasbox];
	if(dropped_box) histories[0][time][3] = dropped_box;
	historyBounds[0][1]=time;
	return true;
}

function check_histories(fwd,check_last){
	var moved=false;
	for (var i = check_last?0:1; i < histories.length; i++) {
		var dir = isfwd != i%2;
		var state = histories[i][time];
		var pstate = histories[i][time - (fwd ? 1 : -1)];
		if(state){
			if(pstate){
				if(pstate[0]!=state[0]||pstate[1]!=state[1]){
					moved = true;
				}

				if(pstate[2] && !state[2]){
					boxes.push(state[3]);
				}
			}
			if(checkCollides(state[0],state[1],dir,state[2])||killed(state[0],state[1])){
				suspended=true;
				paradox = [state[0],state[1]];
				msg=["PARADOX: Time echo can't pass!","R to restart"];
			}
			if(killed(state[0],state[1])){
				suspended=true;
				paradox = [state[0],state[1]];
				msg=["PARADOX: Time echo killed by laser!","R to restart"];
			}
		}
	}
	for (var i = check_last?0:1; i < histories.length; i++) {
		var dir = isfwd != i%2;
		var state = histories[i][time];
		var pstate = histories[i][time - (fwd ? 1 : -1)];
		if(state && pstate && state[2] && !pstate[2]){
			var old_box_pos = grabBox(state[0],state[1]);
			if(old_box_pos){
				pstate[3] = old_box_pos;
			}else{
				suspended=true;
				paradox = [state[0],state[1]];
				msg=["PARADOX: There is no box here to pick up!","R to restart"];
			}
		}
	}
	return moved;
}

function update(){
	if(aframe){
		window.cancelAnimationFrame(aframe);
		aframe = null;
	}

	if(!paused&&!suspended){

		if(replay_check_state){
			var repfwd = replay_check_state==REPLAY_STATE_FWD;
			for (var reptimes = 0; reptimes < (repfwd?REPLAY_FWD_SPEED:REPLAY_REW_SPEED); reptimes++) {
				time += repfwd ? 1 : -1;
				active_buttons=checkButtons();
				var moved = check_histories(repfwd,true);
				if(!moved){
					replay_immobile_ct++;
					if(replay_immobile_ct>REPLAY_IMMOBILE_WAIT)
						reptimes--;
				}else{
					replay_immobile_ct=0;
				}
				if(suspended)
					break;
				var limit_bound=historyBounds[0][0];
				for (var i = 0; i < historyBounds.length; i++) {
					var dir = isfwd != i%2;
					var bounds = historyBounds[i];
					limit_bound = (repfwd ? Math.max : Math.min)(bounds[0],bounds[1],limit_bound);
				}
				if(repfwd){
					if(time>limit_bound+REPLAY_BUFFER){
						if(level<levels.length-1)
							load_level(level+1);
						else
							load_level(0);
						break;
					}
				}else{
					if(time<limit_bound-REPLAY_BUFFER){
						replay_check_state=REPLAY_STATE_FWD;
						replay_immobile_ct = 0;
						break;
					}
				}
			}
		} else {
			var flipped = shouldflip && !checkCollides(posx,posy,!isfwd,hasbox);
			if(flipped){
				histories.unshift({});
				historyBounds[0][1]=time;
				historyBounds.unshift([time]);
				isfwd = !isfwd;
			} else {
				time += isfwd ? 1 : -1;
			}
			shouldflip=false;

			active_buttons=checkButtons();

			if(!move_player()){
				// Level select happened. Bail
				aframe = window.requestAnimationFrame(update);
				return;
			}

			// If we just flipped time, the time stays the same for two ticks.
			// We can't check histories again, since that would check between the
			// next tick in the (new relative) past (old relative future) and now,
			// but we flipped before reaching that tick.
			if(!flipped) check_histories(isfwd,false);
		}

		draw();

	}else{
		draw();
	}
	aframe = window.requestAnimationFrame(update);
}

function draw(){
	ctx.save();
	ctx.scale(BLOCKSIZE,BLOCKSIZE);
	
	ctx.translate(1,1);
	ctx.fillStyle="white";
	ctx.fillRect(0,0,NUM_BLOCKS,NUM_BLOCKS);

	blocks.forEach(function(obj,i){

		function perSquare(fn){
			for (var x = obj[1]; x < obj[1]+obj[3]; x++) {
				for (var y = obj[2]; y < obj[2]+obj[4]; y++) {
					ctx.save();
					ctx.translate(x,y);
					ctx.beginPath();
					ctx.rect(0,0,1,1);
					ctx.clip();
					fn(x,y);
					ctx.restore();
				}
			}
		}

		var active = checkActive(obj);
		var transparent = "rgba(0,0,0,0)";
		switch(obj[0]){
			case BLOCK_WALL:
				perSquare(function(x,y){
					ctx.fillStyle="hsl(0,0%,"+(15+4*detrand(x+y*NUM_BLOCKS+level*.1))+"%)";
					ctx.fillRect(0,0,1,1);
				});
				break;
			case BLOCK_BUTTON:
				ctx.fillStyle=pressed_button(obj)?"#a30":"#f50";
				ctx.fillRect(obj[1]+.2,obj[2]+.2,.6,.6);
				break;
			case BLOCK_DOOR:
				ctx.fillStyle=active?"#777":"rgba(100,100,100,.1)";
				ctx.fillRect(obj[1],obj[2],obj[3],obj[4]);
				break;
			case BLOCK_LASER:
				if(active){
					perSquare(function(){
						ctx.strokeStyle="rgba(255,0,0,0.5)";
						ctx.lineCap="square";
						for(var i=-1; i<=1.5; i+=.2){
							ctx.lineWidth=0.07+0.03*Math.sin(time/30-i*2*Math.PI);
							ctx.beginPath();
							ctx.moveTo(i,1);
							ctx.lineTo(i+1,0);
							ctx.stroke();
						}
					});
				}
				break;
			case BLOCK_FWD:
				ctx.fillStyle=active?"rgba(0,100,255,0.5)":transparent;
				ctx.fillRect(obj[1],obj[2],obj[3],obj[4]);
				break;
			case BLOCK_BWD:
				ctx.fillStyle=active?"rgba(255,0,255,0.5)":transparent;
				ctx.fillRect(obj[1],obj[2],obj[3],obj[4]);
				break;
			case BLOCK_NOBOX:
				if(active){
					perSquare(function(){
						ctx.strokeStyle="rgba(255,100,0,0.5)";
						ctx.lineCap="square";
						ctx.lineWidth=0.05;
						ctx.beginPath();
						for(var i=-1.5; i<=1.5; i+=.2){
							ctx.moveTo(i,1);
							ctx.lineTo(i+1,0);
							ctx.moveTo(i,0);
							ctx.lineTo(i+1,1);
						}
						ctx.stroke();
					});
				}
				break;
			case BLOCK_EXIT:
				ctx.fillStyle="#0f0";
				ctx.translate(obj[1],obj[2]);
				ctx.beginPath();
				ctx.moveTo(.5,.1);
				ctx.lineTo(.9,.5);
				ctx.lineTo(.5,.9);
				ctx.lineTo(.1,.5);
				ctx.closePath();
				ctx.fill();
				ctx.translate(-obj[1],-obj[2]);
				break;
			case BLOCK_ONEWAY:
				perSquare(function(){
					ctx.translate(0.5,0.5);
					ctx.rotate(Math.PI/2*obj[5]);
					ctx.fillStyle="#666";
					ctx.beginPath();
					ctx.moveTo(-.3,-.1);
					ctx.lineTo(-.3,.1);
					ctx.lineTo(0,.1);
					ctx.lineTo(0,.3);
					ctx.lineTo(.3,0);
					ctx.lineTo(0,-.3);
					ctx.lineTo(0,-.1);
					ctx.closePath();
					ctx.fill();
				});
				break;
			case BLOCK_TRIGGER:
				ctx.fillStyle="#f50";
				ctx.beginPath();
				ctx.arc(obj[1]+.5, obj[2]+.5, 0.2, 0, 7);
				ctx.fill();
				ctx.fillStyle=pressed_trigger(i)?"#a30":"#eee";
				ctx.beginPath();
				ctx.arc(obj[1]+.5, obj[2]+.5, 0.1, 0, 7);
				ctx.fill();
				break;
			case BLOCK_BOX:
				ctx.fillStyle="rgba(200,200,200,.5)";
				ctx.beginPath();
				ctx.arc(obj[1]+.5, obj[2]+.5, 0.1, 0, 7);
				ctx.fill();
				break;
			case BLOCK_LEVELSELECT:
				ctx.fillStyle="#0f0";
				ctx.fillRect(obj[1]+.2,obj[2]+.2,.6,.6);
				break;
			case BLOCK_HINT:
				ctx.fillStyle="#fff";
				ctx.textAlign = "center";
				ctx.font = "0.65px sans-serif";
				ctx.fillText(obj[3],obj[1],obj[2]);
				break;
		}
	});
	blocks.forEach(function(obj,i){
		var conn_objs = getConnectedObjs(obj);
		for(var i = 0; i < conn_objs.length; i++){
			var cur_conn_obj = blocks[conn_objs[i]];
			var gradient = ctx.createLinearGradient(obj[1]+.5,obj[2]+.5,cur_conn_obj[1]+.5,cur_conn_obj[2]+.5);
			var progress = goodMod(-time/60,1);
			var endcol = "rgba(0,255,0,"+(.1+.4*abs(2*progress-1))+")";
			gradient.addColorStop(0,endcol);
			gradient.addColorStop(1,endcol);
			var num_pulses=Math.round(Math.sqrt( Math.pow(cur_conn_obj[1]-obj[1],2) + Math.pow(cur_conn_obj[2]-obj[2],2) ));
			var toggle = 1;
			for (var offs = 1/num_pulses*(progress-1); offs < 1; offs+=.5/num_pulses) {
				if(offs>=0) gradient.addColorStop(offs, toggle?"rgba(0,255,0,.5)":"rgba(0,255,0,0.1)");
				toggle ^= 1;
			};
			ctx.strokeStyle=gradient;
			ctx.lineWidth=0.05;
			ctx.beginPath();
			ctx.moveTo(obj[1]+.5,obj[2]+.5);
			ctx.lineTo(cur_conn_obj[1]+.5,cur_conn_obj[2]+.5);
			ctx.stroke();
		}
	});
	boxes.forEach(function(box){
		ctx.fillStyle="#555";
		ctx.fillRect(box[0]-.3,box[1]-.3,.6,.6);
		ctx.fillStyle="#aaa";
		ctx.fillRect(box[0]-.2,box[1]-.2,.4,.4);
	});


	for (var i = histories.length-1; i >= 0 ; i--) {
		var dir = isfwd != i%2;
		var valid = false;
		ctx.beginPath();
		for(var t = time-TIMELINES_LEN; t<=time+TIMELINES_LEN; t++){
			var state = histories[i][t];
			if(state){
				if(!valid){
					ctx.moveTo(state[0],state[1]);
					valid=true;
				}else
					ctx.lineTo(state[0],state[1]);
			} else if(valid)
				break;
		}
		ctx.strokeStyle=dir?"#08f":"#f0f";
		ctx.lineWidth=0.1;
		ctx.stroke();
	}
	for (var i = histories.length-1; i >= 0 ; i--) {
		var dir = isfwd != i%2;
		var state = histories[i][time];

		if(state){
			ctx.fillStyle=dir?"#08f":"#f0f";
			ctx.beginPath();
			ctx.arc(state[0], state[1], RADIUS, 0, 7);
			ctx.fill();
			if(state[2]){
				ctx.fillStyle="#555";
				ctx.fillRect(state[0]-.2,state[1]-.2,.4,.4);
				ctx.fillStyle="#aaa";
				ctx.fillRect(state[0]-.1,state[1]-.1,.2,.2);
			}
		}
	}

	ctx.strokeStyle="#0f0";
	ctx.lineWidth=0.05;
	ctx.beginPath();
	ctx.arc(posx, posy, RADIUS+0.2, 0, 7);
	ctx.stroke();

	if(paused||suspended){
		ctx.fillStyle="rgba(0,0,0,0.3)";
		ctx.fillRect(-1,-1,SCR_SIZE,SCR_SIZE);
		if(paradox){
			ctx.strokeStyle="#f00";
			ctx.lineWidth=0.1;
			ctx.beginPath();
			ctx.arc(paradox[0], paradox[1], 4*RADIUS, 0, 7);
			ctx.stroke();
		}
	}
	if(replay_check_state){
		ctx.textAlign = "start";
		ctx.font = "1px sans-serif";
		ctx.fillStyle="#fff";
		ctx.fillText("REPLAY",0,0);
	}
	
	ctx.translate(SCR_SIZE-1,-1);

	ctx.fillStyle=isfwd?"#08f":"#f0f";
	ctx.fillRect(0,0,SCR_SIZE,SCR_SIZE);

	ctx.fillStyle="#000";
	ctx.fillRect(1,1,SCR_SIZE-2,SCR_SIZE-2);

	ctx.textAlign = "end";
	ctx.font = "1px sans-serif";
	ctx.fillStyle=isfwd?"#08f":"#fff";
	ctx.fillText("TIME |",SCR_SIZE/2,2);
	ctx.save();
	ctx.scale(-1,1);
	ctx.fillStyle=isfwd?"#fff":"#f0f";
	ctx.fillText("TIME |",-SCR_SIZE/2,2);
	ctx.restore();

	ctx.fillStyle = "#fff";
	ctx.textAlign = "center";
	
	ctx.font = "bold 0.65px sans-serif";
	ctx.fillText(level_title,SCR_SIZE/2,4);
	
	ctx.font = "0.65px sans-serif";
	for(var i = 0; i < msg.length; i++){
		ctx.fillText(msg[i],SCR_SIZE/2,6+i,NUM_BLOCKS);
	}

	ctx.font = "1px monospace";
	ctx.fillText((time/60).toFixed(2),SCR_SIZE/2,10);

	ctx.translate(0,10.5);
	ctx.beginPath();
	ctx.rect(1.5,0,SCR_SIZE-3,6);
	ctx.fillStyle="#fff";
	ctx.fill();
	ctx.clip();

	ctx.fillStyle="#aaa";
	for (var i = 0; i < SCR_SIZE; i++) {
		ctx.fillRect(i+1-((time%60+60)%60)/60-.025,0,.05,6);
	};

	for (var i = 0; i < historyBounds.length; i++) {
		var dir = isfwd != i%2;
		var bounds = historyBounds[i];
		ctx.fillStyle=dir?"#08f":"#f0f";
		ctx.fillRect(SCR_SIZE/2+(bounds[0]-time)/60,.5+2*i/BLOCKSIZE,(bounds[1]-bounds[0])/60,2/BLOCKSIZE);
	}

	ctx.fillStyle=isfwd?"#08f":"#f0f";
	ctx.fillRect(SCR_SIZE/2-.025,0,.05,6);

	ctx.restore();
}

addEventListener("keydown", function(e) {
	if(levelloader==document.activeElement) return;
	e = e || window.event;
	dirs[e.keyCode-37] = 1;
	console.log(e.keyCode,dirs);
	if(e.keyCode==KEY_SPACE){
		shouldflip = true;
		shouldgrab = false;
	}
	if(e.keyCode==KEY_GRAB){
		shouldflip = false;
		shouldgrab = true;
	}
	if(e.keyCode==KEY_PAUSE&&!suspended){
		paused = !paused;
		msg=[paused?"Paused":""];
	}
	if(e.keyCode==KEY_RESTART){
		reload_level();
	}
	if(e.keyCode==KEY_QUIT){
		load_level(0);
	}
	if(e.keyCode==KEY_MUTE){
		muted ^= 1;
	}
	e.preventDefault();
});
addEventListener("keyup", function(e) {
	if(levelloader==document.activeElement) return;
	e = e || window.event;
	dirs[e.keyCode-37] = 0;
	// console.log(dirs);
	e.preventDefault();
});

var levelloader;
window.onload=function(){
	setup();
	start();
	update();

	levelloader = document.getElementById("levelloader");
	levelloader.addEventListener("input",function(){
		try{
			var nlevel = eval(levelloader.value);
			levels[levels.length-1] = nlevel;
			load_level(levels.length-1);
			update();
			// paused=true;
		} catch (e) {
		   console.warn(e);
		}
	})
}