"use strict";

/**
 * Standard tuning notes and their frequencies.
 */
var notes = Object.freeze({
	E4: 329.628,
	A4: 440,
	D5: 587.33,
	G5: 783.991,
	B5: 987.767,
	E6: 1318.51
});

var audioContext;
var currentOscillator;

var $stringNames;
var $pause;

$(document).ready(function() {
	audioContext = new (window.AudioContext || window.webkitAudioContext)();

	$stringNames = $('.string-names');
	$pause = $('.pause');

	$stringNames.on('click', 'h1', stringNameClicked);
	$pause.click(pauseClicked);
});

function stringNameClicked(event) {
	var $string = $(event.target);
	var note = $string.data('note');

	// Reset the oscillator with the new frequency.
	if (currentOscillator != undefined) {
		currentOscillator.stop(0);
	}

	currentOscillator = audioContext.createOscillator();
	currentOscillator.connect(audioContext.destination);
	currentOscillator.frequency.value = notes[note];
	currentOscillator.start(0);

	// Change the active string.
	$('.active').removeClass('active');
	$string.addClass('active');

}

function pauseClicked() {
	if (currentOscillator != undefined) {
		currentOscillator.stop(0);
		currentOscillator = null;
	}

	// Set all strings as inactive.
	$('.active').removeClass('active');
}
