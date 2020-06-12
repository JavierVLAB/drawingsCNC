
var sketchName = "Circular Strokes";
var	sides= 4; // number of polygon sides
var	variance= 25; // strength of polygon variation
var	iterations= 10; // amount of times program runs
var	radius= 150; // initial radius	
var angle; 

var x = [];
var y = [];

var myWidth = 600;
var myHeight = 600;

var myRandomSeed; 


function setup() {
	createCanvas(myWidth,myHeight,SVG);
	myRandomSeed = minute();
}

function draw() {
		
	randomSeed(myRandomSeed);

	background(255,255,255);
	angle = 2 * 3.1415 /  sides;
	for (var i=0; i <  sides; i++) { // coordinates of polygon
	  x[i] = cos( angle*i+50) *  radius;
	  y[i] = sin( angle*i+50) *  radius;
	}

	noFill();
	
	
	beginShape(); // draw polygon shape
	for (var a=0; a <  iterations; a++) { // array of polygon coordinates
	  for (var i=0; i <  sides; i++) {
		x[i] += random(-variance, variance);
		y[i] += random(-variance, variance);
		}
		
		//curveVertex(x[0]+width/2, y[0]+height/2);
		
			//ellipse(x[ sides-1]+width/2, y[ sides-1]+height/2,3,3);
			for (var i=0; i <  sides; i++) {
				curveVertex(x[i]+width/2, y[i]+height/2);
				//ellipse(x[i]+width/2, y[i]+height/2,3,3);
			}
			//curveVertex(x[ sides-1]+width/2, y[ sides-1]+height/2);
			//curveVertex(x[1]+width/2, y[1]+height/2);
			//ellipse(x[0]+width/2, y[0]+height/2,3,3);
			//ellipse(x[1]+width/2, y[1]+height/2,3,3);
			
	}
	endShape(CLOSE);
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

