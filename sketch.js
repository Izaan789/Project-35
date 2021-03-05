var BackgroundImg,Balloon1Img,Balloon2Img,Balloon3Img;

var database;

database = firebase.database()

function preload(){
  BackgroundImg = loadImage("Hot Air Ballon-01.png")
  BalloonImg = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png")

}

function setup() {
  createCanvas(1365,610);
  Balloon = createSprite(200, 450, 50, 50);
  Balloon.addAnimation("hotairballoon", BalloonImg);
  Balloon.scale = 0.6

  var balloonpositionref = database.ref("Balloon/Position")
  balloonpositionref.on("value",readPosition,showError);
}
function draw() {
  background(BackgroundImg); 

  if(keyDown(LEFT_ARROW)){
        changePosition(-5,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(5,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-5);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+5);
    }
    drawSprites();
}

function changePosition(x,y){
    Balloon.x = Balloon.x + x;
    Balloon.y = Balloon.y + y;
    database.ref("Balloon/Position").update({x:Balloon.x,y:Balloon.y})
    
}

function readPosition(data){
  position = data.val();
Balloon.x = position.x;
Balloon.y = position.y;
}

function showError(){
console.error("error")
}