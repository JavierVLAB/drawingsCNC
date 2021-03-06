

var sketchName = "Perlin Noise";
var myRandomSeed; 
var myWidth = 400;
var myHeight = 600;

var numLines = 20;
var margin = 10;
var vStep = 4;
var bandWidth = 20;
var noisePar1 = 0.035;
var noisePar2 = 0.035;

var dibujar = true;


function setup() {
	createCanvas(myWidth,myHeight,SVG);
	myRandomSeed = minute();
	noFill();
	//strokeWeight(0.5);
	stroke(0,255);
}

function draw() {
	noiseSeed(myRandomSeed);
	background(255,255,255);
	var r = 0;
	var dr = 0;
	var x;
	var y;

	gcode = startGcode;

	x = width/2 + 30;
	y = height/2;

	gcode += gcodeLine(x,y);
	gcode += penDOWN;
	
	for(var j = 0; j < numLines; j++){

		beginShape();
		var numAngle = 180;
    for (var i = 0; i < numAngle; i++) {
			r = j*vStep + 30;
			dr = bandWidth*noise(i*noisePar1,j*noisePar2);
			x = width/2 + (r+dr)*cos(2.0*PI*i/numAngle + j*0.03);
			y = height/2 + (r+dr)*sin(2.0*PI*i/numAngle + j*0.03);
			curveVertex(x,y);
			

			gcode += gcodeLine(x,y);

		}

		endShape();
	}
	gcode += penUP;
	gcode += endGcode;
	noLoop();

}

function keyTyped(){
	if(key==='r'){
		myRandomSeed = random(1000);
		loop();
	}

	if(key==='s') save();
	if(key==='p') saveParameters();
}