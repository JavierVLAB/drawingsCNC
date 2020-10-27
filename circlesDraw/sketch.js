

var sketchName = "Perlin Noise";
var myRandomSeed; 
var myWidth = 600;
var myHeight = 600;

var numLines = 20;
var margin = 10;
var vStep = 4;
var bandWidth = 20;
var noisePar1 = 0.035;
var noisePar2 = 0.035;

var dibujar = true;

let i= 0;
let r; 
function setup() {
	createCanvas(myWidth,myHeight,SVG);
	myRandomSeed = minute();
	noFill();
	//strokeWeight(0.5);
	stroke(0,50);
	r = createVector(50,50);
}



function draw() {
	//background(255);
	for(let j = 0; j < 5000; j++){
push();
	let R1 = 450;
	let R2 = 450;

	let cr1 = createVector(50-width/2,50-height/2);
	let cr2 = createVector(50-width/2,height - 50 -height/2);
	
	let c1 = 100;
	let c2 = 100;
	let alpha1 = 10;
	let alpha2 = 0.1;

	
		let r1 = createVector(cr1.x + c1*cos(alpha1*i),cr1.y + c1*sin(alpha1*i));
		let r2 = createVector(cr2.x + c2*cos(alpha2*i),cr2.y + c2*sin(alpha2*i));
		let h = calculateInterception(r1,R1,r2,R2);
		ellipse(r1.x,r1.y,3,3);
		ellipse(r2.x,r2.y,3,3);

	translate(width/2-40,height/2);
	rotate(i*0.01);

		//ellipse(h.x,h.y,3,3);
		//console.log(h);
		line(h.x,h.y,r.x,r.y);
		r = h.copy();

	i += 0.01;
	pop();
	}
		noLoop();
}


function calculateInterception(r1,R1,r2,R2){

	let d = p5.Vector.sub(r2,r1);


	//stroke(255,0,0);
	let dmag = d.mag();
	if(R2+R1 < dmag || abs(R2 - R1) > dmag){
		console.log("salto");
		return Null;
	}
	let a = 0.5*(R1*R1 - R2*R2 + dmag*dmag)/dmag;
	let pc = p5.Vector.add(r1, p5.Vector.mult(d,a/dmag));

	
	let h = d.copy();
	h.rotate(HALF_PI);
	h.setMag(sqrt(R1*R1 - a*a));
	let r = p5.Vector.add(pc,h);
	let rn = p5.Vector.sub(pc,h);

	if(false){
	ellipse(pc.x,pc.y,3,3);

	ellipse(r1.x,r1.y,5,5);
	ellipse(r2.x,r2.y,5,5);
	ellipse(r1.x,r1.y,2*R1,2*R1);
	ellipse(r2.x,r2.y,2*R2,2*R2);

	ellipse(r.x,r.y,3,3);
	ellipse(rn.x,rn.y,3,3);
	line(r.x,r.y,rn.x,rn.y);
	}
	return rn;
}


function keyTyped(){
	if(key==='r'){
		myRandomSeed = random(1000);
		loop();
	}

	if(key==='s') save();
	if(key==='p') saveParameters();
}