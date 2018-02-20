

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

var totalBees = 30;

function setup(){

   createCanvas(801,801)
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
         grid[i][j].neighborCount = -1;
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

function reveal0Zone(i,j){
   for (var xoff = -1; xoff <= 1; xoff++) {
      for (var yoff = -1; yoff <= 1; yoff++) {
         var x = i + xoff;
         var y = j + yoff;
         if (x > -1 && x < cols && y > -1 && y< rows) {
            if (grid[x][y].revealed == false) {
               grid[x][y].reveal();
               if (grid[x][y].neighborCount == 0) {
                  reveal0Zone(x,y);
               }
            }
         }

      }
   }
}

function gameOver(){
   for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
         grid[i][j].reveal();
      }
   }
}

function mousePressed(){
   for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
         if (grid[i][j].contains(mouseX, mouseY)){
            if (grid[i][j].revealed == false) {
               if (grid[i][j].bee == true) {
                  gameOver();
                  return;
               }
               if (grid[i][j].neighborCount == 0) {
                  reveal0Zone(i,j);
                  return;
               }
            }
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
