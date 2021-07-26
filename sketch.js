var dog,sadDog,happyDog;
var foodStock;
var addFood;
var foodObj;
var feed ;
var Food ;
var database;
var button1,button2;
var sadDogImg
var happyDogImg
var Milkimg
 

function preload(){
  sadDogImg=loadImage("Images/Dog.png");
  happyDogImg=loadImage("Images/happy dog.png");
  MilkImg=loadImage("Images/Milk.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('feedTime');
  foodStock.on("value",function(data){
    lastFed = data.val();
  })

  dog=createSprite(800,200,150,150)
  dog.addImage(sadDog);
  dog.scale=0.15;

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed=createButton("Feed The Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)
  

}
 
function draw() {
  background(46,139,87);

  food();
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDogImg);

  //write code here to update food stock and last fed time
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
    foodObj.updateFoodStock(food_stock_val * 0);
  }else{
    foodObj.updateFoodStock(food_stock_val -1);
  }

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
      FeedTime:hour()
    
  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}



