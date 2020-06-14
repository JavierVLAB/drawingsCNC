

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

var time = 0.01;
var t = 0.0;

function setup() {
	createCanvas(myWidth,myHeight,SVG);
	myRandomSeed = minute();
	noFill();
  smooth();
  background(255);
  strokeWeight(0.5);
  stroke(0, 10);
}

function draw() {
  noFill();
  push();
  
  translate(width/2, height/2);
  //translate(mouseX,mouseY);
  rotate(radians(t*0.05));
  translate(150, 0);
	
	beginShape();
  for (var i= 0; i < 500; i++) {

    var x = os1.position(t)+os2.position(t);
    var y = os3.position(t)+os4.position(t);
    
    vertex(x, y);
    t+=time;
  }
  endShape();
  pop();
  
  t+=2;
}

function keyTyped(){
	if(key==='r'){
		myRandomSeed = random(1000);
    setup();
    
	}

	if(key==='s') save();
	if(key==='p') saveParameters();
}



