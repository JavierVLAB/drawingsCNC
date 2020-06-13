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
  label: 'Max Time',
  folder: "Sketch Properties",
	min: 0, max: 10000, step:10,
	object: this, property: "maxTime",
	onChange: (data) => {
		loop();
	}
});


gui.Register({
	type: 'folder',
	label: "Frequencies",
	open: false
});

gui.Register({
	type: 'range',
  label: 'Freq 1',
  folder: "Frequencies",
	min: 0, max: 10, step:0.01,
	object: this, property: "omega1",
	onChange: (data) => {
		os1.omega = omega1;
		loop();
	}
});

gui.Register({
	type: 'range',
  label: 'Freq 2',
  folder: "Frequencies",
	min: 0, max: 10, step:0.01,
	object: this, property: "omega2",
	onChange: (data) => {
		os2.omega = omega2;
		loop();
	}
});

gui.Register({
	type: 'range',
  label: 'Freq 3',
  folder: "Frequencies",
	min: 0, max: 10, step:0.01,
	object: this, property: "omega3",
	onChange: (data) => {
		os3.omega = omega3;
		loop();
	}
});

gui.Register({
	type: 'range',
  label: 'Freq 4',
  folder: "Frequencies",
	min: 0, max: 10, step:0.01,
	object: this, property: "omega4",
	onChange: (data) => {
		os4.omega = omega4;
		loop();
	}
});

gui.Register({
	type: 'button',
  label: "Skecth Reload 'r'",
	action: () => {
		myRandomSeed = random(1000);
		loop();
	}
})

gui.Register({
	type: 'button',
  label: "Save Parameters 'p'",
	action: () => {
			saveParameters();
	}
})

gui.Register({
	type: 'button',
  label: "Save PNGs 's'",
	action: () => {
			save(fileNameString() + '.png');
	}
})

gui.Register({
	type: 'button',
  label: "Save GCODE 'g'",
  folder: "Sketch Properties",
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
		"initial time (t0)": t0,
		"delta t": delta_t,
		"total t step": maxTime,
		"final time": maxTime*delta_t + t0,
		"omega1": omega1,
		"omega2": omega2,
		"omega3": omega3,
		"omega4": omega4,
		"amp1": amp1,
		"amp2": amp2,
		"amp3": amp3,
		"amp4": amp4,
		"damp1": damp1,
		"damp2": damp2,
		"damp3": damp3,
		"damp4": damp4,
		"phase1": phase1,
		"phase2": phase2,
		"phase3": phase3,
		"phase4": phase4
	}
	saveJSON(JSON, fileNameString() + '.json');
}
