

var sketchName = "Perlin Noise";
var myRandomSeed; 
var myWidth = 700;
var myHeight = 700;

var numLines = 40;
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



var L = 100;
var w = 1;


var os1 = new Oscillator(L, w, 0.0001, 0);
var os2 = new Oscillator(L, w+1, 0, 3.1415/4);
var os3 = new Oscillator(L, w, 0.0, 0);
var os4 = new Oscillator(L, w+0.005, 0.00025, 3.1415);

var t = 0.0;

function setup() {
	createCanvas(myWidth,myHeight);
	myRandomSeed = minute();
	noFill();
  smooth();
  background(255);
  strokeWeight(0.2);
  stroke(0, 100);
}

function draw() {
  noFill();
  push();
  
  translate(width/2, height/2);
  rotate(radians(t*0.1));
  translate(50, 0);
	
	beginShape();
  for (var i= 0; i < 100; i++) {

    var x = os1.position(t)+os2.position(t);
    var y = os3.position(t)+os4.position(t);
    
    vertex(x, y);
    t+=0.05;
  }
  endShape();
  pop();
  
  t-=0.05;
}

function keyTyped(){
	if(key==='r'){
		myRandomSeed = random(1000);
		loop();
	}

	if(key==='s') save();
	if(key==='p') saveParameters();
}



