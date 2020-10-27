var sketchName = "Perlin Circles Ghost";
var myRandomSeed;
var myWidth = 400;
var myHeight = 600;

var numLines = 78;
var margin = 10;
var vStep = 0.26;
var bandWidth = 3.38;
var noisePar1 = 0.267;
var noisePar2 = 0.001;

var dibujar = true;


function setup() {
	createCanvas(myWidth, myHeight, SVG);
	//myRandomSeed = minute();
	noFill();
	//strokeWeight(0.5);
	stroke(0, 255);
	loop();
}

function draw() {
	noiseSeed(myRandomSeed);
	background(255, 255, 255);
	var r = 0;
	var dr = 0;
	var x;
	var y;
	var x0 = width / 2;
	var y0 = 160;

	gcode = startGcode;

	x = x0 + 30;
	y = y0;

	gcode += gcodeLine(x, y);
	gcode += penDOWN;
	beginShape();
	for (var j = 0; j < numLines; j++) {


		var numAngle = 180;
		for (var i = 0; i < numAngle; i++) {
			r = 80;
			dr = bandWidth * (0.5 - noise(i * noisePar1, j * noisePar2)) * j;
			x = x0 + (r + dr) * cos(2.0 * PI * i / numAngle + j * 0.03);
			y = y0 + (r + dr) * sin(2.0 * PI * i / numAngle + j * 0.03);
			curveVertex(x, y);
			y0 += vStep;
			gcode += gcodeLine(x, y);

		}


	}
	gcode += penUP;
	gcode += endGcode;
	endShape();
	noLoop();

}

function keyTyped() {
	if (key === 'r') {
		myRandomSeed = random(1000);
		loop();
		setup();
	}

	if (key === 's') save();
	if (key === 'p') saveParameters();
}