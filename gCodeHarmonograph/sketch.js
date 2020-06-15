
var sketchName = "GCODE Harmonograph";
var myWidth = 800;
var myHeight = 800;

class Oscillator {
	constructor(_amp, _omega, _damp, _phase){
		this.omega = _omega; /* angular frequency */
		this.amp = _amp;   /* amplitude */
		this.phase = _phase; /* phase */
		this.damp = _damp; /* damping */
	}
	
	position(t) {
    /* position of the oscillator */
    var pos;
    //pos = A*sin(w*cos(d*t)*t + ph);
    pos = this.amp*sin(this.omega*t + this.phase)*exp(-this.damp*t);
    return pos;
  }
}

var omega1 = 4.18;
var omega2 = 4.13;
var omega3 = 4.1;
var omega4 = 4.14;
var amp1 = 200;
var amp2 = 200;
var amp3 = 200;
var amp4 = 200;
var damp1 = 0.007;
var damp2 = 0.001;
var damp3 = 0.002;
var damp4 = 0.035;
var phase1 = 0.0;
var phase2 = 3.1415/4;
var phase3 = 0.0;
var phase4 = 3.1415;

var t0 = 0.0;
var maxTime = 6000;
var delta_t = 0.02;
var t;

var os1 = new Oscillator(amp1, omega1, damp1, phase1);
var os2 = new Oscillator(amp2, omega2, damp2, phase2);
var os3 = new Oscillator(amp3, omega3, damp3, phase3);
var os4 = new Oscillator(amp4, omega4, damp4, phase4);



function setup() {

  createCanvas(myWidth,myHeight);
	stroke(0,50);
	noFill();
}


function draw() {
	background(255,255,255);

	var x;
	var y;
	t = t0;
	
  gcode = startGcode;
  x = os1.position(t) + os3.position(t)/2 + width/2;
	y = os2.position(t) + os4.position(t)/2 + height/2;
	gcode += gcodeLine(x,y);
	gcode += penDOWN;
	
	beginShape();
	for (var i = 0; i < maxTime; i++) {
		t += 0.05;
    x = os1.position(t) + os3.position(t)/2 + width/2;
    y = os2.position(t) + os4.position(t)/2 + height/2;
		vertex(x,y);
		//point(x,y);
		
		gcode += gcodeLine(x,y);
		
	}
	endShape();
  gcode += penUP;
  gcode += endGcode;

  noLoop();

}

function gcodeLine( x, y){
  var xmm = x * printWidthmm / width;
  var ymm = y * printHeightmm / height;
  return "G1 " + "F" + moveFeedRate + " X" + str(xmm) + " Y" + str(ymm) + "\n";  
}



function keyTyped(){
	if(key==='r'){
		myRandomSeed = random(1000);
		loop();
	}

	if(key==='s') save();
	if(key==='p') saveParameters();
}