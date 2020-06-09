function setup() {
	createCanvas(windowWidth, windowHeight);
}


var	sides= 4; // number of polygon sides
var	variance= 25; // strength of polygon variation
var	iterations= 10; // amount of times program runs
var	radius= 150; // initial radius	
var angle; 

var x = [];
var y = [];

var myWidth = 600;
var myHeight = 600;

var m; 


function setup() {
	createCanvas(myWidth,myHeight,SVG);
	m = minute();
}

function draw() {
		
	randomSeed(m);

	background(255,255,255);
	angle = 2 * 3.1415 /  sides;
	for (var i=0; i <  sides; i++) { // coordinates of polygon
	  x[i] = cos( angle*i+50) *  radius;
	  y[i] = sin( angle*i+50) *  radius;
	}
	noFill();
	for (var a=0; a <  iterations; a++) { // array of polygon coordinates
	  for (var i=0; i <  sides; i++) {
		x[i] += random(-variance, variance);
		y[i] += random(-variance, variance);
	  }
	  beginShape(); // draw polygon shape
			curveVertex(x[ sides-1]+width/2, y[ sides-1]+height/2);
			for (var i=0; i <  sides; i++) {
				curveVertex(x[i]+width/2, y[i]+height/2);
			}
			curveVertex(x[0]+width/2, y[0]+height/2);
			curveVertex(x[1]+width/2, y[1]+height/2);
	  endShape();
	}

	//save(); // give file name
	//print("saved svg");

	noLoop();
}

function keyPressed(){
	m = random(1000);
	loop();

	//console.log(m);
	if(key==='s') save();
}

var container = document.getElementById("defaultCanvas0");

var gui = new guify({
	title: "Sketch Manager for Prints",
	theme: 'myTheme', // dark, light, yorha, or theme object, myTheme
	align: 'right', // left, right
	width: 300,
	barMode: 'none', // none, overlay, above, offset
	panelMode: 'inner',
	opacity: 1.0,
	root: container,
	open: true
});

gui.Register({
	type: 'range',
	label: 'Width',
	min: 300, max: 1200, step: 20,
	object: this, property: "myWidth",
	onChange: (data) => {
		loop();
		setup();
	}
});

gui.Register({
	type: 'range',
	label: 'Height',
	min: 300, max: 1200, step: 20,
	object: this, property: "myHeight",
	onChange: (data) => {
		loop();
		setup();
	}
});

gui.Register({
	type: 'range',
	label: 'Sides',
	min: 3, max: 8, step: 1,
	object: this, property: "sides",
	onChange: (data) => {
		loop();
	}
});

gui.Register({
	type: 'range',
	label: 'Variance',
	min: 10, max: 50,
	object: this, property: "variance",
	onChange: (data) => {
		loop();
	}
});

gui.Register({
	type: 'range',
	label: 'Iterations',
	min: 2, max: 50, step: 1,
	object: this, property: "iterations",
	onChange: (data) => {
		loop();
	}
});



function saveParameters(){
	let JSON = {
		"Sides": sides,
		"Variance": variance,
		"Iterations": iterations,
	}
	saveJSON(JSON);
}
