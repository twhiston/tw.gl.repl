outlets = 2;

function noteNameToMidiNumber(noteName, octave) {
  var noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  var noteIndex = noteNames.indexOf(noteName);
  if (noteIndex === -1) {
    return -1;
  }
  return (octave + 1) * 12 + noteIndex;
}
noteNameToMidiNumber.local = 1;

var currentScale = [];
var noteIndex = 0;

function setNoteIndex(dir){
	if(dir !== 1 && dir !== -1){
		post("dir must be 1 or -1 \n");
		return;
	}
	
	if(dir === -1){
			noteIndex = prevIndex(noteIndex)
	} else if (dir === 1){
			noteIndex = nextIndex(noteIndex)
	}	
	
}

function prevIndex(index){	
	if(index > 0)
		--index;
	else
		index = currentScale.length-1;	

	return index;	
}

function nextIndex(index){
	if(index >= currentScale.length -1)
		return 0
	else
		return ++index;
	
}

function previousNote(){
	outlet(0,currentScale[prevIndex(noteIndex)])
	
}

function currentNote(){
	outlet(0, currentScale[noteIndex])
}

function generate_scale(rootNoteName, octave, mode) {
  var rootNote = noteNameToMidiNumber(rootNoteName, octave);

  var intervals = {
    'major': [2, 2, 1, 2, 2, 2, 1],
    'minor': [2, 1, 2, 2, 1, 2, 2],
    'dorian': [2, 1, 2, 2, 2, 1, 2],
    'phrygian': [1, 2, 2, 2, 1, 2, 2],
    'lydian': [2, 2, 2, 1, 2, 2, 1],
    'mixolydian': [2, 2, 1, 2, 2, 1, 2],
    'locrian': [1, 2, 2, 1, 2, 2, 2]
  };

  var scale = [];

  if (rootNote < 0 || rootNote > 127 || !intervals[mode]) {
    post('Invalid root note or mode\n');
    return;
  }

  var current_note;
  for (var i = 0; i < 7; i++) {
    current_note = rootNote + (12 * i);
    intervals[mode].forEach(function (interval) {
      if (current_note <= 127) {
        scale.push(current_note);
        current_note += interval;
      } else {
        return;
      }
    });
  }

  currentScale = scale;

  outlet(1, scale);
}

