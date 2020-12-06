var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running;
var obstacle, obstacleImage;
var obstacleGroup;
var bananaImage, bananaGroup;

var score =0;
var survivalTime=0;


function preload() {


  monkey_running = loadAnimation("monkey_0.png", "monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_6.png", "monkey_7.png", "monkey_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 600);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  //monkey.debug = true;
  monkey.setCollider("circle",0,0,300);

  ground = createSprite(400, 350, 1200, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x)


  obstaclesGroup = new Group();
  bananaGroup = new Group();

}


function draw() {

  background(255);
  textSize(20);
  fill("black");
   text("Survival Time: "+survivalTime,250,30);
    text("Score: "+score,270,70);

  if (gameState === PLAY) {

    survivalTime= Math.round(frameCount/frameRate());
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    
    if(monkey.isTouching(bananaGroup)){
      score=score+2;
      bananaGroup.destroyEach();
    }

    if (monkey.isTouching(obstaclesGroup)) {
      gameState=END;
      ground.velocityX = 0;
      monkey.velocityY = 0;
      obstaclesGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);


    }


    if (keyDown("space") && monkey.y >= 314) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.5;

    monkey.collide(ground);
    console.log(monkey.y)
    spawnObstacles();
    spawnBanana();

  } else if (gameState === END) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);


    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

  }
  drawSprites();
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var banana = createSprite(600, 120, 40, 10);
    banana.y = Math.round(random(150, 250));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;

    //assign lifetime to the variable
    banana.lifetime = 200;



    //add each cloud to the group
    bananaGroup.add(banana);
  }


}



function spawnObstacles() {
  if (frameCount % 200 === 0) {
    obstacle = createSprite(800, 320, 10, 40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.15;

    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);
  }
}