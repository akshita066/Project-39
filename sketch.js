var path,mainCyclist,pink,redd,yellow,bell,obstacle1,obstacle2,obstacle3;
var pathImg,mainRacerImg1,mainRacerImg2,mainRacerImg3,pink1,pink2,pink3,redd1,redd2,redd3,yellow1,yellow2,yellow3,obs1,obs2,obs3;
var camera;
var pinkCG,reddCG,yellowCG,obsCG;

var gameOver,gameoverimg;

var select_opp;
var select_obs;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  
  pink1 = loadAnimation("opponent1.png","opponent2.png");
  pink2 = loadAnimation("opponent3.png");
  
  redd1 = loadAnimation("opponent4.png","opponent5.png");
  redd2 = loadAnimation("opponent6.png");
  
  yellow1 = loadAnimation("opponent7.png","opponent8.png");
  yellow2 = loadAnimation("opponent9.png");
  
  gameoverimg = loadImage("gameOver.png");
  
  obs1=loadImage("obstacle1.png");
  obs2=loadImage("obstacle2.png");
  obs3=loadImage("obstacle3.png");
}

function setup(){
  
createCanvas(1300,350);
  
// Moving background
path=createSprite(100,170);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.06;
  
//obstacle = createSprite(1250,Math.round(random(50,250),30,30));
  
 pinkCG = createGroup();
 reddCG = createGroup();
 yellowCG = createGroup();
 obsCG= createGroup();
  
gameOver = createSprite(650,150,50,50);
gameOver.addImage(gameoverimg);
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,1150,30);
  
  
  if(gameState===PLAY){
   
   gameOver.visible=false;
    
   mainCyclist.y = World.mouseY;
   
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
    distance = distance + Math.round(getFrameRate()/50);
    
    camera.position.x = displayWidth/2;
    camera.position.y = mainCyclist.y;
    
    path.velocityX = -(6+2*distance/150);
    pinkCG.setVelocityXEach(-(6+2*distance/150));
    reddCG.setVelocityXEach(-(6+2*distance/150));
    yellowCG.setVelocityXEach(-(6+2*distance/150));
    obsCG.setVelocityXEach(-(6+2*distance/150));
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/1.01;
  }
    
    select_opp= Math.round(random(1,3));
    
    spawnobs();
    
  if (frameCount % 150 == 0)
    {
      if (select_opp == 1)
        {
          pinkCyclists();
        }
      
      if (select_opp == 2)
        {
          reddCyclists();
        }
      
      if (select_opp == 3)
        {
          yellowCyclists();
        }
    }
  }
   if (mainCyclist.isTouching(pinkCG)||mainCyclist.isTouching(reddCG)||mainCyclist.isTouching(yellowCG)||mainCyclist.isTouching(obsCG)) 
   {
     gameState = END;
   }
    if (gameState === END)
      {
     gameOver.visible = true;
  path.velocityX = 0;
  mainCyclist.velocityY = 0;
  mainCyclist.velocityX = 0;
     
  //mainCyclist.changeAnimation("crashed", mainRacerImg2);
  //pinkCG.changeAnimation("pinkcrashed", pink2);
  //reddCG.changeAnimation("reddcrashed", redd2);
  //yellowCG.changeAnimation("yellowcrashed", yellow2);

  pinkCG.setLifetimeEach(-1);
  reddCG.setLifetimeEach(-1);
  yellowCG.setLifetimeEach(-1);
  obsCG.setLifetimeEach(-1);
     
  pinkCG.setVelocityXEach(0);
  reddCG.setVelocityXEach(0);
  yellowCG.setVelocityXEach(0);
  obsCG.setVelocityXEach(0);
     
  text("Press Up Arrow to Restart the game!",500,200);
     
  if (keyDown("UP_ARROW"))
  {
    reset();
  }
     
}

}

function pinkCyclists()
{
  pink = createSprite(1200,Math.round(random(50,250),10,10));
  pink.scale=0.05;
  pink.addAnimation("PinkC",pink1);
  pink.setLifetime=170;
  pinkCG.add(pink);
  pink.velocityX=-5;
  pink.debug= false;
  pink.setCollider("circle",0,0,600);
}

function reddCyclists()
{
  redd = createSprite(1200,Math.round(random(50,250),10,10));
  redd.scale=0.05;
  redd.addAnimation("reddC",redd1);
  redd.setLifetime=170;
  reddCG.add(redd);
  redd.velocityX=-5;
  redd.debug= false;
  redd.setCollider("circle",0,0,600);
}

function yellowCyclists()
{
  yellow = createSprite(1200,Math.round(random(50,250),10,10));
  yellow.scale=0.05;
  yellow.addAnimation("yellowC",yellow1);
  yellow.setLifetime=170;
  yellowCG.add(yellow);
  yellow.velocityX=-5;
  yellow.debug= false;
  yellow.setCollider("circle",0,0,600);
}

function Obstacle1()
{
  obstacle1 = createSprite(1200,Math.round(random(50,250),10,10));
  obstacle1.scale=0.06;
  obstacle1.addImage(obs1);
  obstacle1.setLifetime=170;
  obsCG.add(obstacle1);
  obstacle1.velocityX=-5;
  obstacle1.debug= false;
  obstacle1.setCollider("circle",0,0,200);
}
function Obstacle2()
{
  obstacle2 = createSprite(1200,Math.round(random(50,250),10,10));
  obstacle2.scale=0.06;
  obstacle2.addImage(obs2);
  obstacle2.setLifetime=170;
  obsCG.add(obstacle2);
  obstacle2.velocityX=-5;
  obstacle2.debug= false;
  obstacle2.setCollider("circle",0,0,200);
}
function Obstacle3()
{
  obstacle3 = createSprite(1200,Math.round(random(50,250),10,10));
  obstacle3.scale=0.06;
  obstacle3.addImage(obs3);
  obstacle3.setLifetime=170;
  obsCG.add(obstacle3);
  obstacle3.velocityX=-7;
  obstacle3.debug= false;
  obstacle3.setCollider("circle",0,0,200);
}
function spawnobs()
{
  select_obs= Math.round(random(1,3));
  
  if (frameCount % 40 === 0)
    {
  if (select_obs == 1)
    {
      Obstacle1();
    }
  if (select_obs == 2)
    {
      Obstacle2();
    }
  if (select_obs == 3)
    {
      Obstacle3();
    }
    }
}
function reset()
{
  gameState = PLAY;
  gameOver.visible=false;
  
  pinkCG.destroyEach();
  reddCG.destroyEach();
  yellowCG.destroyEach();
  obsCG.destroyEach();
  
  distance = 0;
}