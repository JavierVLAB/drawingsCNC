

var sketchName = "Perlin Noise";
var myRandomSeed; 
var myWidth = 800;
var myHeight = 500;

var numLines = 40;
var margin = 10;
var vStep = 4;
var bandWidth = 5;
var noisePar1 = 0.035;
var noisePar2 = 0.035;



function setup() {
	createCanvas(myWidth,myHeight,SVG);
	myRandomSeed = minute();
	noFill();
	//strokeWeight(0.5);
}

function draw() {
	noiseSeed(myRandomSeed);
	background(255,255,255);
	for(var j = 0; j < numLines; j++){

		beginShape();
    for (var i = 0; i<= 50; i++) {
			curveVertex(margin + i*(width-2*margin)/50, 
									height/2 + (j - numLines/2)*vStep
									+ bandWidth*noise(i*noisePar1,j*noisePar2));
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