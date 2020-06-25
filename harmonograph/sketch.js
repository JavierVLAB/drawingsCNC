

var sketchName = "harmonograph";
var myRandomSeed; 
var myWidth = 700;
var myHeight = 700;

var amp = 100;
var margin = 10;
var vStep = 4;
var bandWidth = 5;
var noisePar1 = 0.035;
var noisePar2 = 0.035;

class Oscillator {
	constructor(_amp, _omega, _damp, _phase){
		this.omega = _omega; /* angular frequency */
		this.amp = _amp;   /* amplitude */
		this.phase = _phase; /* phase */
		this.damp = _damp; /* damping constant */
	}
	
	position(t) {
    /* position of the oscillator */
    var pos;
    //pos = A*sin(w*cos(d*t)*t + ph);
    pos = this.amp*sin(this.omega*t + this.phase)*exp(-this.damp*t);
    return pos;
  }
}



var omega = 0.2;


var os1 = new Oscillator(amp, omega+0.001, 0.0001, 0);
var os2 = new Oscillator(amp, omega*2, 0, 3.1415/4);
var os3 = new Oscillator(amp, omega+0.001, 0.0, 0);
var os4 = new Oscillator(amp, omega, 0.00025, 3.1415);

/*
var os1 = new Oscillator(amp, omega+0.01, 0.0001, 0);
var os2 = new Oscillator(amp, omega+1, 0, 3.1415/4);
var os3 = new Oscillator(amp, omega+0.01, 0.0, 0);
var os4 = new Oscillator(amp, omega+0.0005, 0.00025, 3.1415);
*/

var time = 0.2;
var t = 0.0;

function setup() {
	createCanvas(myWidth,myHeight,SVG);
	myRandomSeed = minute();
	noFill();
  smooth();
  background(255);
  //strokeWeight(0.5);
  stroke(0, 100);

}

var v = new p5.Vector(0,0);

function draw() {
  noFill();

  
  //translate(width/2, height/2);
  //translate(mouseX,mouseY);
  //rotate(radians(t*0.05));
  //translate(150, 0);
  
  gcode = startGcode;
  v.x = os1.position(t) + os3.position(t)/2;
  v.y = os2.position(t) + os4.position(t)/2;
  v.add(width/2,height/2);
	gcode += gcodeLine(v.x,v.y);
	gcode += penDOWN;

	
  for (var i= 0; i < 15000; i++) {
    v.x = os1.position(t)+os2.position(t)  + 150;
    v.y = os3.position(t)+os4.position(t);

    v.rotate(t*0.002);
    v.add(width/2,height/2);
    point(v.x, v.y);
    gcode += gcodeLine(v.x,v.y);
    t+=time;

  }

  gcode += penUP;
  gcode += gcodeLine(0,0);
  gcode += endGcode;
  
  noLoop();
  //t+=2;
}

function keyTyped(){
	if(key==='r'){
		myRandomSeed = random(1000);
    setup();
    
	}

	if(key==='s') save();
	if(key==='p') saveParameters();
}

function coordinateTransfor(_x, _y){
  let x; 
  let y;

  x = _x + width/2;
  y = _y + height/2;

}


