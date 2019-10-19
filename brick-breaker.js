/**************************************
STARTING SCREEN GLOBAL VARIABLES/FUNCTIONS
***************************************/
// defines button object
var Button = function(config)
{
    this.x = config.x || 15;
    this.y = config.y || 0;
    this.width = config.width || 150;
    this.height = config.height || 50;
    this.text = config.text || "Click"; 
    this.colorX = config.colorX || 255;
    this.colorY = config.colorY || 255;
    this.colorZ = config.colorZ || 255;
};

// defines how to draw the button object
Button.prototype.draw = function() 
{
    fill(this.colorX, this.colorY, this.colorZ);
    rect(this.x, this.y, this.width, this.height);
    fill(0, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(30); 
    text(this.text, this.x + this.width / 2, this.y + this.height / 2); 
};

// starting button
var startButton = new Button
({
    x: 125,
    y: 225, 
    width: 150,
    height: 50,
    text: "START",
    colorX: 0,
    colorY: 234,
    colorZ: 255
}); 

// function that chekcs whether the mouse is inside a button
Button.prototype.isMouseInside = function()
{
    return mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height; 
};


// starting screen
var start = function()
{
    draw = function() {
        background(43, 141, 148); 
        fill(217, 186, 245);
        textAlign(CENTER);
        textSize(20);
        text("WELCOME TO BRICK BREAKER", width / 2, height / 2); 
        startButton.draw(); 
    };
};

// draws the starting screen 
start();

/*****************************************
GAMEPLAY SCREEN GLOBAL VARIABLES/FUNCTIONS
******************************************/
// score
var score = 0; 

// ball variables
var ballDiam = 20, ballX = random (20, 300), ballY = random(100, 200), dx = random(-3,3), dy = 4;  


// brick variables
var brickCol = 10, brickRow = 3, brickWidth = 40, brickHeight = 15;

// arrays to store the positions of bricks
var bricksX = [];
var bricksY = []; 

//pushes x-positions of bricks into brickX array
for (var col = 0; col < brickCol; col++)
{
    for (var row = 0; row < brickRow; row++)
    {
        bricksX.push(col * brickWidth);   
    }
}

    
//pushes y-positions of bricks into brickY array
for (var col = 0; col < brickCol; col++)
{
    for (var row = 0; row < brickRow; row++)
    {
        bricksY.push(row * brickHeight);    
    }
}

// function to draw "game over" screen
var gameOver = function()
{
   background(130, 30, 38);
   textAlign(CENTER); 
   textSize(30);
   fill(255, 255, 255);
   text("GAME OVER", height / 2, width / 2); 
   textSize(20);
   text("Score: " + score, height / 2, width / 2 + 40); 
}; 

// function to draw "win" screen
var win = function()
{
  background(119, 0, 255);
  textAlign(CENTER); 
  textSize(30);
  fill(255, 255, 255);
  text("CONGRATULATIONS!", height / 2, width / 2);
  
};

/*****************************
DEFINES THE GAMEPLAY SCREEN
******************************/
var gameplay = function()
{
    draw = function() {
        background(191, 253, 255);
        
        // paddle variables
        var paddleWidth = 80, paddleHeight = 15, paddleX = mouseX - paddleWidth / 2,          paddleY = 355; 
    
        // draw paddle
        fill(221, 0, 255);
        rect(paddleX, paddleY, paddleWidth, paddleHeight); 
        
        // draw ball
        fill(0, 255, 81);
        ellipse(ballX, ballY, ballDiam, ballDiam); 
        ballX += dx;
        ballY += dy; 
        
        // draws bricks according to bricksX and bricksY arrays
        for (var i = 0; i < brickRow * brickCol; i++)
        {
            fill(130, 54, 54);
            rect(bricksX[i], bricksY[i], brickWidth, brickHeight);    
        }
        
        // score
        fill(255, 13, 255);
        textSize(20); 
        text("SCORE: " + score, 50, brickHeight * (brickRow + 2)); 
    
        
        // ball bounces off left and right walls
        if ((ballX >= width - ballDiam / 2) || (ballX <= ballDiam / 2)) 
        {
            dx = -dx;     
        }
        
        // ball bounces off paddle
        if (ballY >= paddleY - ballDiam / 2 && ballY < paddleY - ballDiam / 4 && ballX >= mouseX - paddleWidth / 2 && ballX <= mouseX + paddleWidth /2)
        {
            dy = -dy;     
        }
        
        // ball falls below screen
        if (ballY >= height)
        {
            gameOver(); 
        }
        
        // ball collision detection with bricks
        for (var i = 0; i < brickRow * brickCol; i++)
        {
           if (ballY <= bricksY[i] + brickHeight && ballX <= bricksX[i] + brickWidth && ballX >= bricksX[i])
           {
              bricksY[i] -= 200;
              dy = -dy; 
              score += 1; 
           }
        }
        
        // ball collision detection with top
        if (ballY <= ballDiam / 2)
        {
            dy = -dy; 
        }
        
        // if player wins game
        if (score === brickRow * brickCol)
        {
            win();     
        }
    };  
};

// senses when the start button is clicked and brings player to the gameplay screen 
mouseClicked = function() {
    if (startButton.isMouseInside())
    {
        gameplay();  
    }
};
