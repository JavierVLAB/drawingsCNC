var container = document.getElementById("defaultCanvas0");

var gui = new guify({
	title: "Sketch: " + sketchName,
	theme: 'myTheme', // dark, light, yorha, or theme object, myTheme
	align: 'right', // left, right
	width: 300,
	barMode: 'none', // none, overlay, above, offset
	panelMode: 'inner',
	opacity: 1.0,
	root: container,
	open: true
});

	// Sketch Properties Folder
	
gui.Register({
	type: 'folder',
	label: "Sketch Properties",
	open: true
});

gui.Register({
	type: 'range',
  label: 'Width',
  folder: "Sketch Properties",
	min: 300, max: 1200, step: 20,
	object: this, property: "myWidth",
	onChange: (data) => {
		loop();
		resizeCanvas(myWidth,myHeight);
		setup();
	}
});

gui.Register({
	type: 'range',
  label: 'Height',
  folder: "Sketch Properties",
	min: 300, max: 1200, step: 20,
	object: this, property: "myHeight",
	onChange: (data) => {
		loop();
		resizeCanvas(myWidth,myHeight);
		setup();
	}
});



gui.Register({
	type: 'range',
  label: 'N-Lines',
  folder: "Sketch Properties",
	min: 3, max: 200, step: 1,
	object: this, property: "numLines",
	onChange: (data) => {
		loop();
	}
});

gui.Register({
	type: 'range',
  label: 'Margin',
  folder: "Sketch Properties",
	min: 0, max: 600, step: 20,
	object: this, property: "margin",
	onChange: (data) => {
		loop();
	}
});

gui.Register({
	type: 'range',
  label: "Y offset",
  folder: "Sketch Properties",
	min: -50, max: 150, step: 1,
	object: this, property: "yOffset",
	onChange: (data) => {
		loop();
	}
});

gui.Register({
	type: 'range',
  label: 'Vertical Step',
  folder: "Sketch Properties",
	min: 1, max: 10, step: 1,
	object: this, property: "vStep",
	onChange: (data) => {
		loop();
	}
});

gui.Register({
	type: 'range',
  label: 'Random Seed',
  folder: "Sketch Properties",
	min: 0, max: 1000, step: 1,
	object: this, property: "myRandomSeed",
	onChange: (data) => {
		loop();
	}
});

gui.Register({
	type: 'range',
  label: 'Max Steps',
  folder: "Sketch Properties",
	min: 0, max: 200, step: 1,
	object: this, property: "maxStep",
	onChange: (data) => {
		loop();
	}
});

gui.Register({
	type: 'range',
  label: "Noise Par 1",
  folder: "Sketch Properties",
	min: 0.00, max: 2, step:0.001,
	object: this, property: "noisePar1",
	onChange: (data) => {
		loop();
	}
});

gui.Register({
	type: 'range',
  label: "Noise Par 2",
  folder: "Sketch Properties",
	min: 0.00, max: 2, step:0.001,
	object: this, property: "noisePar2",
	onChange: (data) => {
		loop();
	}
});

gui.Register({
	type: 'folder',
	label: "Save",
	open: true
});

gui.Register({
	type: 'button',
  label: "Skecth Reload 'r'",
  folder: "Save",
	action: () => {
		myRandomSeed = random(1000);
		loop();
	}
})

gui.Register({
	type: 'button',
	label: "Save PNGs 's'",
	folder: "Save",
	action: () => {
			save(fileNameString() + '.png');
	}
})

gui.Register({
	type: 'button',
	label: "Save Parameters 'p'",
	folder: "Save",
	action: () => {
			saveParameters();
	}
})

gui.Register({
	type: 'button',
  label: "Save GCODE 'g'",
  folder: "Save",
	action: () => {
		let name = fileNameString() + '.gcode';
		let writer = createWriter(name);
		writer.write(gcode);
		writer.close();
	}
})



function numberWithTwoDigit(number){
	return number < 10 ? "0" + number : "" + number;
}

function fileNameString(){
	let myStr = sketchName.replace(/\s+/g, '') + '_'; 
	myStr += year();
	myStr += numberWithTwoDigit(month());
	myStr += numberWithTwoDigit(day());
	myStr += "_" + numberWithTwoDigit(hour());
	myStr += numberWithTwoDigit(minute());
	return myStr;
}

function saveParameters(){
	
	let JSON = {
		"Sketch Name": sketchName,
		"N-Lines": numLines,
		"Margin": margin,
		"Y-Offset": yOffset,
		"Vertical Step": vStep,
		"Random Seed": myRandomSeed,
		"Noise Par 1": noisePar1,
		"Noise Par 2": noisePar2,
		"max Steps": maxStep,
	}
	saveJSON(JSON, fileNameString() + '.json');
}