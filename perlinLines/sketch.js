

var sketchName = "Perlin Noise";
var myRandomSeed = 0; 
var myWidth = 600;
var myHeight = 600;

var numLines = 170;
var margin = 240;
var vStep = 2;
var yOffset = 5;
var noisePar1 = 1.689;
var noisePar2 = 1.221;
var maxStep = 60;



function setup() {
	createCanvas(myWidth,myHeight);
	myRandomSeed = int(minute());
	noFill();
	//strokeWeight(0.5);
	stroke(0,100);
}

let x;
let y;

function draw() {
	noiseSeed(myRandomSeed);
	background(255,255,255);
	let pos = createVector(0,0);

	gcode = startGcode;


	for(var j = 0; j < numLines; j++){
		pos.x = margin;
		pos.y = height/2 + (j-numLines/2)*vStep - yOffset;

		gcode += gcodeLine(pos.x,pos.y);
		gcode += penDOWN;

		beginShape();
    for (var i = 0; i<= maxStep; i++) {

      var angle = (noise(i*noisePar1*0.01, j*noisePar2*0.01)-0.5) * TWO_PI / 2.0;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(4);
			pos.add(v);
			vertex(pos.x,pos.y);
			gcode += gcodeLine(pos.x,pos.y);

		}
		gcode += penUP;

		endShape();
	}

	gcode += endGcode;

	noLoop();

}

function keyTyped(){
	if(key==='r'){
		myRandomSeed = int(random(1000));
		loop();
	}

	if(key==='s') save();
	if(key==='p') saveParameters();
}