

function make2DArray(cols, rows){
   var arr = new Array(cols);
   for (var i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
   }
   return arr;
}

var grid;
var cols;
var rows;
var w = 30;

var totalBees = 40;

function setup(){

   createCanvas(401,401)
   cols = floor(width / w);
   rows = floor(height / w);
   grid = make2DArray(cols,rows);
   for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
         grid[i][j] = new Cell(i, j, w);
      }
   }
   // Pick totlaBees spots
   var n = 0;
   while (n < totalBees ) {
      var i = floor(random(cols));
      var j = floor(random(rows));
      if (grid[i][j].bee == false) {
         grid[i][j].bee = true;
         n++;
      }
   }

   for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
         if (grid[i][j].bee) {
            console.log("bee");
         }
      }
   }


   for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
         grid[i][j].countBees();
      }
   }
}

function mousePressed(){
   for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
         if (grid[i][j].contains(mouseX, mouseY)){
            grid[i][j].reveal();
         }
      }
   }
}

function draw(){
   background(255);
   for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
         grid[i][j].show();
      }
   }
}
