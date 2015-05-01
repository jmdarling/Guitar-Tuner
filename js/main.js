'use strict';

var playStates = Object.freeze({
	PLAY: 'PLAY',
	PAUSE: 'PAUSE'
});

var playState = playStates.PAUSE;
var waveFrequency = 3000;
var waveType = 'sine';

var audioContext;
var currentOscillator;

var $playButton;
var $increaseFrequencyButton;
var $decreaseFrequencyButton;
var $frequency;

$(document).ready(function() {
	audioContext = new (window.AudioContext || window.webkitAudioContext)();
	
	// Cache selectors.
	$playButton = $('#play-button');
	$increaseFrequencyButton = $('#increase-frequency-button');
	$decreaseFrequencyButton = $('#decrease-frequency-button');
	$frequency = $('#frequency');
	
	// Set up listeners.
	$playButton.click(playButtonClick);
	$increaseFrequencyButton.click(increaseFrequencyButtonClick);
	$decreaseFrequencyButton.click(decreaseFrequencyButtonClick);
});

function playButtonClick() {
	if (playState === playStates.PLAY) {
		playState = playStates.PAUSE;
		
		currentOscillator.stop();
		currentOscillator = null;
	} else {
		playState = playStates.PLAY;
		
		$frequency.html(waveFrequency);
		
		currentOscillator = audioContext.createOscillator();
		currentOscillator.connect(audioContext.destination);
		currentOscillator.frequency.value = waveFrequency;
		currentOscillator.type = waveType;
		currentOscillator.start(0);
	}
}

function increaseFrequencyButtonClick() {
	waveFrequency += 100;
	
	$frequency.html(waveFrequency);
			
	currentOscillator.stop();
	currentOscillator = audioContext.createOscillator();
	currentOscillator.connect(audioContext.destination);
	currentOscillator.frequency.value = waveFrequency;
	currentOscillator.type = waveType;

	currentOscillator.start(0);
}

function decreaseFrequencyButtonClick() {
	waveFrequency -= 100;
	
	$frequency.html(waveFrequency);
			
	currentOscillator.stop();
	currentOscillator = audioContext.createOscillator();
	currentOscillator.connect(audioContext.destination);
	currentOscillator.frequency.value = waveFrequency;
	currentOscillator.type = waveType;

	currentOscillator.start(0);
}