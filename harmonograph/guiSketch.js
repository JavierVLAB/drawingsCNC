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
  label: 'Amplitud',
  folder: "Sketch Properties",
	min: 5, max: 200, step: 1,
	object: this, property: "amp",
	onChange: (data) => {
		os1.amp = data;
	}
});

gui.Register({
	type: 'range',
  label: 'Frecuency',
  folder: "Sketch Properties",
	min: 0, max: 5,
	object: this, property: "omega",
	onChange: (data) => {
		os1.omega = data;
		os3.omega = data;
	}
});

gui.Register({
	type: 'range',
  label: "Time step",
  folder: "Sketch Properties",
	min: 0.001, max: 0.02, step: 0.001,
	object: this, property: "time",
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
  label: "Noise Par",
  folder: "Sketch Properties",
	min: 0.00, max: 0.4, step:0.001,
	object: this, property: "noisePar1",
	onChange: (data) => {
		loop();
	}
});

gui.Register({
	type: 'range',
  label: "Noise Par",
  folder: "Sketch Properties",
	min: 0.00, max: 0.4, step:0.001,
	object: this, property: "noisePar2",
	onChange: (data) => {
		loop();
	}
});

gui.Register({
	type: 'button',
  label: "Skecth Reload 'r'",
  folder: "Sketch Properties",
	action: () => {
		myRandomSeed = random(1000);
		loop();
	}
})

gui.Register({
	type: 'button',
  label: "Save Parameters 'p'",
  folder: "Sketch Properties",
	action: () => {
		//saveParameters();
		let writer = createWriter('newFile.txt');
		// write 'Hello world!'' to the file
		writer.write(['Hello world!']);
		// close the PrintWriter and save the file
		writer.close();
	}
})

gui.Register({
	type: 'button',
  label: "Save SVG 's'",
  folder: "Sketch Properties",
	action: () => {
			save(fileNameString() + '.svg');
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

function saveParameters(){
	
	let JSON = {
		"Sketch Name": sketchName,
		"Sides": sides,
		"Variance": variance,
		"Iterations": iterations,
		"Random Seed": myRandomSeed
	}
	saveJSON(JSON, fileNameString() + '.json');
}

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

