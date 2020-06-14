
var sketchName = "GCODE Harmonograph";
var myWidth = 800;
var myHeight = 800;

var maxTime = 100;
function setup() {

  createCanvas(myWidth,myHeight);
	stroke(0,50);
	noFill();
}



function draw() {
	background(255,255,255);

	var x0 = 50;
	var y0 = 425;

	var x;
	var y;


  gcode = startGcode;
  
	gcode += gcodeLine(x,y);
	gcode += penDOWN;
	var r = 100;
	beginShape();
	for (var j = 0; j < maxTime; j++){
		for (var i = 0; i < 180; i++) {
			let rr = r + noise(i*0.1,j*0.1)*50;
			//rr = 0;
			x = rr * cos (2 * i * 3.1415 / 180) + x0;
			y = rr * sin (2 * i * 3.1415 / 180) + y0;
			vertex(x,y);
			//r += 0.001;
			x0 += 0.015;
			y0 = 400 + (noise(x0*0.001))*50;
			gcode += gcodeLine(x,y);
			
		}
		 ellipse(x0,y0,10,10);
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