

var sketchName = "Circle Draw2";
var myRandomSeed; 
var myWidth = 444;
var myHeight = 630;

var numLines = 20;
var margin = 10;
var vStep = 4;
var bandWidth = 20;
var noisePar1 = 0.035;
var noisePar2 = 0.035;

var dibujar = true;

let i= 0;

let t = 0;
var R1;
var R2;
var R3;
var R4;
var alpha1;
var alpha2;
var alpha3;
var deltaT;
var r;
function setup() {
	createCanvas(myWidth,myHeight,SVG);
	myRandomSeed = minute();
	noFill();
	//strokeWeight(0.5);
	stroke(0,50);
	R1 = createVector(50,0);
	R2 = createVector(100,0);
	R3 = createVector(30,0);
	R4 = createVector(10,0);
	alpha1 = -0.1;  //0,3
	alpha2 = 0.2; //-0.1
	alpha3 = -1.0;    //-2
	alpha4 = 50;   //
	deltaT = 0.001;
	r = createVector(0,0);
	r.add(R1);
	r.add(R2);
	r.add(R3);
	r.add(R4);
	
	gcode = startGcode;


}



function draw() {
	push();
	translate(width/2-20,height/2);
	//beginShape();
	for(let j=0;j<5000;j++){
			
		//rotate(0.004*t);

		R1.rotate(alpha1*deltaT);
		R2.rotate(alpha2*deltaT);
		R3.rotate(alpha3*deltaT);
		R4.rotate(alpha4*deltaT);
		//R3.setMag(60*(cos(alpha1*t)+1)+60);
		//R2.setMag(40*(cos(alpha2*t)+1)+80);
		R4.setMag(15*(sin(t)+1));
		let rr = createVector(0,0);
		rr.add(R1);
		rr.add(R2);
		rr.add(R3);
		rr.add(R4);
		//ellipse(rr.x,rr.y, 3,3);
		line(rr.x,rr.y,r.x,r.y);
		//curveVertex(r.x,r.y);
		r = rr.copy();
		gcode += gcodeLine(r.x+width/2-20,r.y+height/2-20);
		if(t==0){
			gcode += penDOWN;
			//ellipse(0,0,350*2)
		}

		if(t>2*PI*7){
			gcode += penUP;
			gcode += gcodeLine(0,0);
			gcode += endGcode;
			noLoop();
			return;
		}
		t+=deltaT;
	}
	//endShape();
	pop();
	//noLoop();
}


function calculateInterception(r1,R1,r2,R2){


}


function keyTyped(){
	if(key==='r'){
		myRandomSeed = random(1000);
		loop();
	}

	if(key==='s') save();
	if(key==='p') saveParameters();
}