var WIDTH = 100; 
var HEIGHT = 100;

var circleColor = Color.red;
var player = 1;
var lineVertical;
var lineHorizontal;
var winnerSelected = 0;
var overallCircleCount = 0;

var myArray = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
   ];
   
var myArrayPositionX = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
    ];

var myArrayPositionY = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
    ];

setSize(400, 400);

function drawBoard(){
    
    WIDTH = getWidth();
    HEIGHT = getHeight();
    var left = WIDTH / 7;
    var right = 7 * WIDTH / 7;
    var top = HEIGHT / 6;
    var bottom = 6 * HEIGHT / 6;
    
    for(let j = 0; j < 9; j++){
       add(lineVertical = new Line(left * j, 0, left * j, HEIGHT));
       lineVertical.setColor("blue");
    }
    
     for(let j = 0; j < 8; j++){
       add(lineHorizontal = new Line(0, top * j, WIDTH, top * j));
       lineHorizontal.setColor("blue");
       
    }
}

function start(){
    
    drawBoard();
    mouseClickMethod(handleClick);
    
}


function drawCircleColor(box1, box2, color){
    WIDTH = getWidth();
    HEIGHT = getHeight();
    var dim = WIDTH / 7;
    var dim2 = HEIGHT / 6;
	var radius = dim / 2;
	var cx = box1 * dim + radius;
	var cy = box2 * dim2 + radius;
	var circle = new Circle(radius - 5);
	circle.setColor(color);
	circle.setPosition(cx, cy + 5);
	myArrayPositionX[box2][box1] = cx;
	myArrayPositionY[box2][box1] = cy + 5;
	add(circle);
	overallCircleCount++;
}

function handleClick(e){
    var selectionTxt = new Text("Please select a different slot", "17pt Arial");
    selectionTxt.setPosition(60, 100);
    selectionTxt.setColor(Color.red);
    var textAdded = 0;
    var dimX = getWidth() / 7;
    var dimY = getHeight() / 6;
	
	var xBox = Math.floor(e.getX() / dimX);
	var yBox = Math.floor(e.getY() / dimY);
    
    if(yBox == 5)
    {
        if(myArray[yBox][xBox] == 0)
        {
        	if(isWinner(myArray,player)){
        
        	}
        
        	else if(circleColor == Color.red)
        	{
        	    drawCircleColor(xBox, yBox, Color.yellow);
                circleColor = Color.yellow;
                myArray[yBox][xBox] = 1;
                player = 1;
        	}
        	else if(circleColor == Color.yellow){ 
        	    drawCircleColor(xBox, yBox, Color.red);
        	    circleColor = Color.red;
        	    myArray[yBox][xBox] = 2;
        	    player = 2;
        	}
        }
    }

    else if(myArray[yBox][xBox] == 0 && myArray[yBox+1][xBox] != 0)
    {
        if(isWinner(myArray, player)){
            
        }
        else if(circleColor == Color.red)
        {
            drawCircleColor(xBox, yBox, Color.yellow);
            circleColor = Color.yellow;
            myArray[yBox][xBox] = 1;
            player = 1;
        }
        else if(circleColor == Color.yellow)
        {
            drawCircleColor(xBox, yBox, Color.red);
            circleColor = Color.red;
            myArray[yBox][xBox] = 2;
            player = 2;
        }
    } 
    
   
   
    else if (myArray[yBox][xBox] == 0 && myArray[yBox+1][xBox] == 0 && !isWinner(myArray,player)) {
            add(selectionTxt);
            textAdded = 1;
            
    }
    
    else if(isWinner(myArray,player)) {
  
    }
    
    
    if(textAdded == 1)
    {
        setTimeout(removeText, 1500); 
    }
    
    function removeText(){
        remove(selectionTxt);
    }
    
   
	if(isWinner(myArray,player)){
	    if(player == 1)
	    {
	        var text = new Text("YELLOW player wins!"," 30pt Arial");
	        text.setColor(Color.black);
	        text.setPosition(5, 50);
	        add(text);
	        
	   }else{
	       var text = new Text("RED player wins!"," 30pt Arial");
	       text.setColor(Color.black);
	       text.setPosition(48, 50);
	       add(text);
	  
	   }
	   
	}
   
  if (overallCircleCount == 42 && !isWinner(myArray,player))
  {
        var text = new Text("DRAW!"," 30pt Arial");
        text.setColor(Color.black);
        text.setPosition(130, 200);
        add(text)
    }
	    
}

function checkHorizontal(array, turn) {
    var initX = 0;
    var initY = 0;
    for(var i = 0; i < 6; i++)
    { 
        var count = 0;
        for(var j = 0; j < 7; j++)
        {
            if(array[i][j] == turn) {
                if(count == 1)
                {
                    initX = i;
                    initY = j;
                }
                count++;
                if(count == 4) {
                    var line = new Line(myArrayPositionX[initX][initY-1],myArrayPositionY[initX][initY-1],myArrayPositionX[i][j],myArrayPositionY[i][j]);
                    line.setColor(Color.black);
                    line.setLineWidth(10);
                    add(line);
                    return true;
                }
            } else {
                count = 0;
                initX = 0;
                initY = 0;
            }
        }    
    }
}

function checkVertical(array, turn) {
    var initX = 0;
    var initY = 0;
    for(var i = 0; i < 7; i++)
    {
        var count = 0;
        for(var j = 0; j < 6; j++)
        { 
            if(array[j][i] == turn) {
                count++;
                if(count == 1){
                    initX = j;
                    initY = i;
                }
                if(count == 4) {
                  var line = new Line(myArrayPositionX[initX][initY],myArrayPositionY[initX][initY],myArrayPositionX[j][i],myArrayPositionY[j][i]);
                  line.setColor(Color.black);
                  line.setLineWidth(10);
                  add(line);
                  return true;
                }
            }else{
                count = 0;
            }
        }
    }
}

function checkDiagonal1(array, turn) {
    for(var i = 0; i < 3; i++)
    {
        var count = 0;
        for(var j = 0; j < 4; j++)
        {
            if( turn == array[i][j] &&
                turn == array[i + 1][j + 1] &&
                turn == array[i + 2][j + 2] &&
                turn == array[i + 3][j + 3]){
                var line = new Line(myArrayPositionX[i][j],myArrayPositionY[i][j],myArrayPositionX[i+3][j+3],myArrayPositionY[i+3][j+3]);
                line.setColor(Color.black);
                line.setLineWidth(10);
                add(line);
                return true;
            }
        }
    }
    return false;
}

function checkDiagonal2(array, turn)
{
    for(var i = 0; i < 3; i++)
    {
        for(var j = 3; j < 7; j++)
        {
            var startValue = array[i][j];
            if( turn == array[i][j]&&
               turn == array[i + 1][j - 1]&&
                turn == array[i + 2][j - 2]&&
                turn == array[i + 3][j - 3])
            {
                var line = new Line(myArrayPositionX[i][j],myArrayPositionY[i][j],myArrayPositionX[i+3][j-3],myArrayPositionY[i+3][j-3]);
                line.setColor(Color.black);
                line.setLineWidth(10);
                add(line);
                return true;
            }
        }
    }
    return false;
}


function isWinner(myArray, player){
    return checkVertical(myArray, player)
    || checkHorizontal(myArray, player) 
    || checkDiagonal1(myArray, player)
    || checkDiagonal2(myArray, player);
}


//collaborated throughout entire program