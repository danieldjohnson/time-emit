var SAMPLE_RATE = 44100;
var FRAME_COUNT = SAMPLE_RATE;
var PING_LEN = SAMPLE_RATE*2/3;
var QUANTIZE = SAMPLE_RATE/8;

function getPoissonRandom(mean) {
    var L = Math.exp(-mean);
    var k = 0;
    var p = 1.0;
    while(k==0 || p > L) {
        p = p * Math.random();
        k++;
    }
    return k - 1;
}

var notes = [/*54,*/64,72,81,96,108,128,144,162,192];

var plentifulness = 2/SAMPLE_RATE;
var fundamental = 2;
var evts=[];
var audiotime = 0;

function reset_audio(lnum){
	fundamental = 1.5+2*detrand(lnum);
	evts=[];
	evtBoundsStart=0;
	evtBoundsEnd=0;
	audiotime=0;
}

function fill(start,end){
	var ct = getPoissonRandom(plentifulness*(end-start));
	for(var i=0; i<ct; i++){
		var time = Math.random()*(end-start)+start;
		time = QUANTIZE*Math.round(time/QUANTIZE);
		var pitch = notes[Math.floor(Math.random()*10)];
		evts.push([time,pitch]);
	}
}

var evtBoundsStart = -1;
var evtBoundsEnd = 0;
fill(evtBoundsStart,evtBoundsEnd);

function sqr(t){
	return goodMod(t,1)>.5 ? 1 : -1;
}

function generate(t){
	var level=0;
	for (var i = 0; i < evts.length; i++) {
		var evttime = evts[i][0];
		if(evttime + PING_LEN > t && evttime < t){
			var freq = evts[i][1];
			var wave1 = sqr(freq*fundamental*t/SAMPLE_RATE);
			level += 0.3*Math.pow(1-(t-evttime)/PING_LEN,2)*wave1;
		}
	};
	var base = sqr(54*fundamental*t/SAMPLE_RATE);
	level += 0.3*Math.pow(1-goodMod(t,QUANTIZE*4)/QUANTIZE/4,2)*base;
	var motor = sqr(54*fundamental*t/SAMPLE_RATE);
	level += 0.1*Math.pow(1-goodMod(t,QUANTIZE)/QUANTIZE,2)*motor;
	return level;
}

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var source = audioCtx.createBufferSource();
var scriptNode = audioCtx.createScriptProcessor(1024, 0, 1);
scriptNode.onaudioprocess = function(audioProcessingEvent) {
	var outputBuffer = audioProcessingEvent.outputBuffer;
	var chan = outputBuffer.getChannelData(0);

	if(muted) {
		for (var i = 0; i < outputBuffer.length; i++) {
			chan[i] = 0;
		}
	} else {
		var play_fwd = replay_check_state ? replay_check_state==REPLAY_STATE_FWD : isfwd;
		// var play_delta = replay_check_state ? (replay_check_state==REPLAY_STATE_FWD ? REPLAY_FWD_SPEED:REPLAY_REW_SPEED) : isfwd?1:-1;

		if(play_fwd && audiotime > evtBoundsEnd-SAMPLE_RATE){
			fill(evtBoundsEnd,audiotime+SAMPLE_RATE);
			evtBoundsEnd=audiotime+SAMPLE_RATE;
		} else if(!play_fwd && audiotime < evtBoundsStart+2*SAMPLE_RATE){
			fill(audiotime-2*SAMPLE_RATE,evtBoundsStart);
			evtBoundsStart=audiotime-2*SAMPLE_RATE;
		} 
		if( evts.length > 500 ){
			evtBoundsStart=audiotime-2*SAMPLE_RATE;
			evtBoundsEnd=audiotime+SAMPLE_RATE;
			evts = evts.filter(function(x){
				return (x[0] > evtBoundsStart && x[0] < evtBoundsEnd);
			});
		}
		for (var i = 0; i < outputBuffer.length; i++) {
			audiotime+=play_fwd ? 1 : -1;
			chan[i] = generate(audiotime);
		}
	}
}
source.connect(scriptNode);
scriptNode.connect(audioCtx.destination);
source.start();