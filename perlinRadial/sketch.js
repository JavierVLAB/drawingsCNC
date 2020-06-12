

var sketchName = "Perlin Noise";
var myRandomSeed; 
var myWidth = 700;
var myHeight = 700;

var numLines = 100;
var margin = 10;
var vStep = 4;
var bandWidth = 20;
var noisePar1 = 0.035;
var noisePar2 = 0.035;



function setup() {
	createCanvas(myWidth,myHeight,SVG);
	myRandomSeed = minute();
	noFill();
	//strokeWeight(0.5);
	stroke(0,15);
}

function draw() {
	noiseSeed(myRandomSeed);
	background(255,255,255);
	var r = 0;
	var dr = 0;
	
	for(var j = 0; j < numLines; j++){

		beginShape();
    for (var i = 0; i<= 100; i++) {
			r = j*vStep + 100;
			dr = bandWidth*noise(i*noisePar1,j*noisePar2);
			curveVertex(width/2 + (r+dr)*cos(2.0*PI*i/100),
									height/2 + (r+dr)*sin(2.0*PI*i/100));
									//(vStep + bandWidth*noise(i*noisePar,j*noisePar)));
			//curveVertex(margin + i*(width-2*margin)/15, height/2 + (j-numLines/2)*vStep*noise(i,j*noisePar));
			
    }
		endShape();
	}

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