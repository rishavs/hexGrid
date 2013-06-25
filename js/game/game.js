var stage;
var mapHeightHexNo = 5;            // Number of vertical hexes
var mapWidthHexNo = 10;             // Number of horizontal hexes
var mapStartX = 60;
var mapStartY = 60;
var mapHexSize = 50;

// calculate hex width and height. We will use these values to offset neighbouring hexes
var mapHexWidth = Math.sqrt(3)/2 * 2 * mapHexSize;
var mapHexHeight = 3/4 * 2 * mapHexSize;

function init() {
    //Create stage object - our root level container
    stage = new createjs.Stage("demoCanvas");
    
    // Call the function to craete the hex grid
    createMap(mapWidthHexNo, mapHeightHexNo);

    stage.update();
}

function createMap (mapSizeX, mapSizeY) {
    for (var i=0;i<mapHexHeight;i++) {                      // iterate over total number of hex rows
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
            createHex (hexX, hexY, mapHexSize);        
        }       
    }
}

function createHex (x,y,size) {

    var hex = new createjs.Shape();
    hex.graphics.beginStroke("#aaa").beginLinearGradientFill(["#eee","#fafafa"], [0, 1], 0, y-20, 0, y+30).drawPolyStar(x,y,size,6,0,30);
    
    stage.addChild(hex);
}
