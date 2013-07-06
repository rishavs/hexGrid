var stage;
var mapHeightHexNo = 10;            // Number of vertical hexes
var mapWidthHexNo = 20;             // Number of horizontal hexes
var mapStartX = 60;
var mapStartY = 60;
var mapHexSize = 30;

// calculate hex width and height. We will use these values to offset neighbouring hexes
var mapHexWidth = Math.sqrt(3)/2 * 2 * mapHexSize;
var mapHexHeight = 3/4 * 2 * mapHexSize;

function init() {
    //Create stage object - our root level container
    stage = new createjs.Stage("demoCanvas");
    
    // Turn on mouseover support
    stage.enableMouseOver(20);  
    
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
            
            // create labels over each hex telling its id. i have moved the labels a bit to the left and top so as to centre them in the hex
            createHexIdLabel(hexX - 1/2* mapHexWidth + 5, hexY - 1/4* mapHexHeight, i, j);

        }       
    }
    
}

function createHex (x,y,size, iterI, iterJ) {

    var hex = new createjs.Shape();
    hex.graphics.beginStroke("#aaa").beginLinearGradientFill(["#eee","#fafafa"], [0, 1], 0, y-20, 0, y+30).drawPolyStar(x,y,size,6,0,30);
    hex.id = [iterJ, iterI];
    // add events for mouse hover on any hex
    hex.addEventListener("mouseover", function() {
        debugText ("MouseOver hex id is: (" + hex.id + "). The Stage Index of the hex is [" + stage.getChildIndex(hex) + "]" );
        mouseOverHex(stage.getChildIndex(hex))
    });
    hex.addEventListener("mouseout", function() {
        // empty right now
    });
    
    stage.addChild(hex);
}

function createHexIdLabel(labelX, labelY, iterI, iterJ) {
    hexIdLabel = new createjs.Text("(" + iterJ + "," + iterI + ")", "10px Arial", "#666");
    hexIdLabel.x = labelX;
    hexIdLabel.y = labelY;
    
    var cX = iterJ - (iterI - iterI&1) / 2;
    var cZ = iterI;
    var cY = -1*(cX+cZ);
    
    hexIdLabel2 = new createjs.Text("(" + cX + "," + cY + "," +cZ + ")", "10px Arial", "#666");
    hexIdLabel2.x = labelX;
    hexIdLabel2.y = labelY+10;
    stage.addChild(hexIdLabel,hexIdLabel2);
}


function mouseOverHex(stageIndex) {
    // empty right now
    stage.getChildAt(stageIndex).graphics.setStrokeStyle(8,"round").beginStroke("#F00");
    stage.update();
}

function mouseOutHex(event) {
    // empty right now
    stage.update();
}

// Simple function to show a text label which tells the id of the hex over which mouse is placed
function debugText (textString) {
    logTextField.text = textString.toString();
    stage.update();
}