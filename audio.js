var SAMPLE_RATE = 44100;
var FRAME_COUNT = SAMPLE_RATE;
var PING_LEN = SAMPLE_RATE*2/3;
var QUANTIZE = SAMPLE_RATE/8;

// Generate a poisson-distributed random variable
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

// Available notes, relative to a fundamental frequency
var notes = [/*54,*/64,72,81,96,108,128,144,162,192];

// How often to play notes
var plentifulness = 2/SAMPLE_RATE;

// The fundamental frequency
var fundamental = 0;

// List of notes and times
var evts=[];

// Current time
var audiotime = 0;

// Restarts the audio generation for a given level
function reset_audio(lnum){
	fundamental = 1.5+2*detrand(lnum);
	evts=[];
	evtBoundsStart=0;
	evtBoundsEnd=0;
	audiotime=0;
}

// Generate notes for the events array between the specified times
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

// Square wave
function sqr(t){
	return goodMod(t,1)>.5 ? 1 : -1;
}

// Returns the wave amplitude at a given time based on the events array
function generate(t){
	var level=0;
	// Add any relevant notes
	for (var i = 0; i < evts.length; i++) {
		var evttime = evts[i][0];
		if(evttime + PING_LEN > t && evttime < t){
			var freq = evts[i][1];
			var wave1 = sqr(freq*fundamental*t/SAMPLE_RATE);
			level += 0.15*Math.pow(1-(t-evttime)/PING_LEN,2)*wave1;
		}
	};
	// Add the motor rhythms
	var base = sqr(54*fundamental*t/SAMPLE_RATE);
	level += 0.15*Math.pow(1-goodMod(t,QUANTIZE*4)/QUANTIZE/4,2)*base;
	var motor = sqr(54*fundamental*t/SAMPLE_RATE);
	level += 0.05*Math.pow(1-goodMod(t,QUANTIZE)/QUANTIZE,2)*motor;
	return level;
}

// Set up an audio context with a script processor, to allow us to generate the waveform
// directly in JS. We also use a buffer source to use as input, even though we ignore that
// input, because of how the script processor node works
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

		// If necessary, generate some more notes
		if(play_fwd && audiotime > evtBoundsEnd-SAMPLE_RATE){
			fill(evtBoundsEnd,audiotime+SAMPLE_RATE);
			evtBoundsEnd=audiotime+SAMPLE_RATE;
		} else if(!play_fwd && audiotime < evtBoundsStart+2*SAMPLE_RATE){
			fill(audiotime-2*SAMPLE_RATE,evtBoundsStart);
			evtBoundsStart=audiotime-2*SAMPLE_RATE;
		} 

		// We need to save our events, since the audio plays backward in reversed time mode. But
		// we don't want to store too many notes. If we have 500, clear the array to save space
		if( evts.length > 500 ){
			evtBoundsStart=audiotime-2*SAMPLE_RATE;
			evtBoundsEnd=audiotime+SAMPLE_RATE;
			evts = evts.filter(function(x){
				return (x[0] > evtBoundsStart && x[0] < evtBoundsEnd);
			});
		}

		// Fill the buffer with the generated waveforms
		for (var i = 0; i < outputBuffer.length; i++) {
			audiotime+=play_fwd ? 1 : -1;
			chan[i] = generate(audiotime);
		}
	}
}
source.connect(scriptNode);
scriptNode.connect(audioCtx.destination);
source.start();