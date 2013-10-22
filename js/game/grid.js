var stage;
var mapHeightHexNo = 10;            // Number of vertical hexes
var mapWidthHexNo = 10;             // Number of horizontal hexes
var hexList = {};
var mapStartX = 60;
var mapStartY = 60;
var mapHexSize = 30;
var mapHexGap = 2;
var moveDistance = 3;


// calculate hex width and height. We will use these values to offset neighbouring hexes
var mapHexWidth = Math.sqrt(3)/2 * 2 * mapHexSize;
var mapHexHeight = 3/4 * 2 * mapHexSize;

function init() {
    //Create stage object - our root level container
    stage = new createjs.Stage("demoCanvas");
    
    // Turn on mouseover support
    stage.enableMouseOver();  
    
    // Call the function to create the hex grid
    createMap(mapWidthHexNo, mapHeightHexNo);
    
    // Show text on top of page
    logTextField = new createjs.Text("Log text gets shown here", "14px Arial");
    logTextField.x = logTextField.y = 0;
    stage.addChild(logTextField);

    stage.update();
}

function createMap (mapSizeX, mapSizeY) {
    for (var i=0;i<mapHeightHexNo;i++) {                      // iterate over total number of hex rows
        for (var j=0;j<mapWidthHexNo;j++) {                 // iterate over each hex to be created in a single row.
        
            var hexY = mapStartY + i * mapHexHeight;
            
            //remember, each alternate row of hexes is offset in the x axis by half the width of the hex
            // so just add an extra half of the width of the hex, to the x axis displacement of rows 1, 3, 5 etc...
            if (i%2 == 0) {
                var hexX = mapStartX + j * mapHexWidth;
            }
            else {
                var hexX = mapStartX + j * mapHexWidth + 1/2* mapHexWidth;
            }
            
            //call the function to create individual hexes
            createHex (hexX, hexY, mapHexSize, i, j);
           
        }       
    }
    
}

function createHex (x,y,size, iterI, iterJ) {

    var hex = new createjs.Shape();
    hex.graphics.beginStroke("#aaa").beginLinearGradientFill(["#eee","#fafafa"], [0, 1], 0, y-20, 0, y+30).drawPolyStar(x,y,size-mapHexGap,6,0,30);
	
	// calculate and save the axial coordinates
	var cX = iterJ - (iterI - (iterI&1)) / 2;
    var cZ = iterI;
    var cY = -1*(cX+cZ);
    
	hex.id = cX + "x" + cY + "y" + cZ + "z";
    hex.posX = x;
    hex.posY = y;
    // add the hex to our hexList with the id as identifier
    hexList[hex.id] = hex;
    // add events for mouse hover on any hex
    hex.addEventListener("mouseover", mouseOverHex);
    hex.addEventListener("mouseout", mouseOutHex);
    
    stage.addChild(hex);
}

function mouseOverHex(event) {
    debugText ("MouseOver hex id is: (" + event.target.id + "). The Stage Index of the hex is [" + stage.getChildIndex(event.target) + "]. The position is: " + event.target.posX + "x" + event.target.posY +"y");
	event.target.graphics.clear().beginStroke("#888").beginLinearGradientFill(["#fafafa","#fafafa"], [0, 1], 0, event.target.posY-20, 0, event.target.posY+30).drawPolyStar(event.target.posX,event.target.posY,mapHexSize - mapHexGap - 1,6,0,30);
    stage.update();
}

function mouseOutHex(event) {
    event.target.graphics.clear().beginStroke("#aaa").beginLinearGradientFill(["#eee","#fafafa"], [0, 1], 0, event.target.posY-20, 0, event.target.posY+30).drawPolyStar(event.target.posX,event.target.posY,mapHexSize - mapHexGap,6,0,30);
    stage.update();
}

// Simple function to show a text label which tells the id of the hex over which mouse is placed
function debugText (textString) {
    logTextField.text = textString.toString();
    stage.update();
}