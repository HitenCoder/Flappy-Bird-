var backImg;
var bird,birdImg;
var gameOver,gameOverImg;
var logo,logoImg;
var pipe1,pipe2,pipe1Img,pipe2Img;
var obs1Group,obs2Group;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var Score=0;

function preload(){

  birdImg=loadImage("images/Flappy Bird.png");

  backImg=loadImage("images/background.png");

  gameOverImg=loadImage("images/gameOver.png");
  
  logoImg=loadImage("images/logo.png");

  pipe1Img=loadImage("images/pipe1.png");
  pipe2Img=loadImage("images/pipe2.png");
}

function setup() {
  createCanvas(600,600);

  back=createSprite(500,200,10,10);
  back.addImage("back",backImg);
  back.velocityX=-4;
  back.x = back.width/2;

  bird=createSprite(100,0,10,10);
  bird.addImage("bird",birdImg);
  bird.scale=0.4;

  gameOver=createSprite(300,280,10,10);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.scale=1;
  gameOver.visible=false;

  logo=createSprite(300,20,10,10);
  logo.addImage("logo",logoImg);

  obs1Group=new Group();
  obs2Group=new Group();

  bird.setCollider("circle",0,0,30);
  //bird.debug=true;
}

function draw() { 
  background(0);

  console.log(bird.position.y);

if (gameState === PLAY){

  Score=Score+Math.round(frameCount/120);

if (back.x < 0 ){
    back.x = back.width/2;
}

if(keyWentDown("space")){
  bird.velocityY=-10;
} 
bird.velocityY= bird.velocityY +0.5;

if(bird.y < 0 || bird.y > 600){
  gameState=END;
}

if(obs1Group.isTouching(bird) || obs2Group.isTouching(bird)){
  gameState=END;
}
  
  spawnobstacle1();
  spawnobstacle2();
}

else if (gameState === END) {
  
  gameOver.visible = true;
  fill("red");
  textSize(30);
  text("Want to 'PLAY' again RELOAD",100,350);
  
  back.velocityX=0;
  back.visible=false;

  bird.velocityY=0;
  bird.destroy();

  obs1Group.setVelocityXEach(0);
  obs2Group.setVelocityXEach(0);

  obs1Group.destroyEach();
  obs2Group.destroyEach();  

  obs1Group.setLifetimeEach(-1);
  obs2Group.setLifetimeEach(-1);
}
  drawSprites();

  fill(0);
  textSize(25);
  text("Score="+ Score,460,20);

  fill(0);
  textSize(15);
  text("Press Space Bar to Fly!!",10,20);
}

function spawnobstacle1() {
  //write code here to spawn the obstacles
  if (frameCount % 120 === 0) {
    var obs1 = createSprite(600,550,40,10);
    obs1.y = Math.round(random(500,700));
    obs1.addImage("obs1",pipe1Img);
    obs1.scale = 0.5;
    obs1.velocityX = -3;
    
     //assign lifetime to the variable
     obs1.lifetime = 260;
    
     //add each cloud to the group
    obs1Group.add(obs1);
  }
}

function spawnobstacle2() {
  //write code here to spawn the obstacles
  if (frameCount % 120 === 0) {
    var obs2 = createSprite(600,50,40,10);
    //obs2.y = Math.round(random(100,-300));
    obs2.addImage("obs1",pipe2Img);
    obs2.scale = 0.5;
    obs2.velocityX = -3;
    
     //assign lifetime to the variable
     obs2.lifetime = 260;
    
     //add each cloud to the group
    obs2Group.add(obs2);
  }
}