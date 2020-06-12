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
  label: 'Sides',
  folder: "Sketch Properties",
	min: 3, max: 8, step: 1,
	object: this, property: "sides",
	onChange: (data) => {
		loop();
	}
});

gui.Register({
	type: 'range',
  label: 'Variance',
  folder: "Sketch Properties",
	min: 10, max: 50,
	object: this, property: "variance",
	onChange: (data) => {
		loop();
	}
});

gui.Register({
	type: 'range',
  label: 'Iterations',
  folder: "Sketch Properties",
	min: 2, max: 50, step: 1,
	object: this, property: "iterations",
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
			saveParameters();
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

