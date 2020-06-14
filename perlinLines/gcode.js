var printWidthmm = 200;
var printHeightmm = 200;
var penUP = "M03 S0\n";
var penDOWN = "M03 S100\n";
var moveFeedRate = "2200";
var rapidFeedRate = "3000";
var startGcode = "G90\n" + penUP;
var endGcode = "G0 F" + rapidFeedRate + " X0 Y0\n";

var gcode = "";

function gcodeLine( x, y){
  var xmm = x * printWidthmm / width;
  var ymm = y * printHeightmm / height;
  return "G1 " + "F" + moveFeedRate + " X" + str(xmm) + " Y" + str(ymm) + "\n";  
}
