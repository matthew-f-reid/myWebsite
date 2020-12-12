//Canvas Size
let maxH = 900;
let maxW = 600;
//Car/Fireball size
let carH = maxH / 6;
let carW = maxW / 8;
//Screen States
const LOADING = 0;
const MAIN_MENU = 1;
const PLAY = 2;
const HI_SCORE = 3;
const END = 4;
const HOW_TO = 5;
//Difficulty Modes
const EASY = 1;
const MED = 2;
const HARD = 3;
//Starting State
let currentState = LOADING;
//Video variables
let video;
let finished = true;
//Is enemy at bottom of screen
let atBottom = false;
//Is game initialized
let initialized = false;
//Button Hovers
let playHover = false;
let howToHover = false;
let hiScoreHover = false;
//Is how to displayed
let howToBool = true;
//GUI buttons
let playButton;
let hiScoreButton;
let backButton;
let submitButton;
let howToButton;
let quitButton;
let difficultyButton;
//Textfield to enter user name
let nameTextfield;
//Button location height
let buttonY = maxH / 9;
//Difficulty slider
let difficulty;
//Difficulty mode
let mode = 1;
//Counter for fuel drain & road line animation
let counter = 0;
//Array of X values
let randX = new Array(4);
//Array of enemy car/fireball
let carsArray = new Array(3);
//Group containing enemy car/fireball
let cars;
//Player object
let player;
//Player starting coords
let playerX = (maxW / 8) * 3;
let playerY = (maxH / 8) * 7;
//Player health value
let playerHP;
//Player fuel value
let playerFuel;
//Player enemies passed value
let carsPassed;
//Player name
let userName;
//JSON file containing hi scores
let hiScoreJSON;
//Array to store JSON file
let hiScoreArray = [];
//Rating for difficulty mode for sorting if same cars/fireball passed value
let rating;
//Sounds
let powerUpSound;
let crashSound;
let explodeSound;
let hpSound;
let gameOver;
let music;
//Fuel object
let fuelSprite;
//Fuel image
let fuelImg;
//Health object
let hpSprite;
//Health image
let hpImg;
//Sprite for how to page
let fuel;
let hp;
//Player images
let p00;
let p01;
let p02;
let p03;
//Enemy animation
let enemy;
//Title image
let title;
//font
let font;

//Loads images/videos/audio before starting
function preload(){
    video = createVideo('assets/video/Intro.mp4');
    hiScoreJSON = loadJSON('assets/JSON/hiscores.json');
    powerUpSound = loadSound('assets/sound/fuel.mp3');
    crashSound = loadSound('assets/sound/crash.mp3');
    explodeSound = loadSound('assets/sound/explode.mp3');
    hpSound = loadSound('assets/sound/hp.mp3');
    music = loadSound('assets/sound/music.mp3');
    gameOver = loadSound('assets/sound/gameOver.mp3');
    title = loadImage('assets/img/title.png');
    p00 = loadImage('assets/img/player/p00.png');
    p01 = loadImage('assets/img/player/p01.png');
    p02 = loadImage('assets/img/player/p02.png');
    p03 = loadImage('assets/img/player/p03.png');
    p04 = loadImage('assets/img/player/p04.png');
    p05 = loadImage('assets/img/player/p05.png');
    fuelImg = loadImage('assets/img/fuel/fuel00.png');
    hpImg = loadImage('assets/img/hp/hp01.png');
    font = loadFont('assets/font/font.ttf');
}

//Runs once initializing starting values
function setup() {
    createCanvas(maxW,maxH);
    frameRate(60);
    textFont(font);
    
    playButton = new Clickable();
    playButton.color = "#FF000000";
    playButton.width = 200;
    playButton.height = 50;
    playButton.locate(
        maxW / 2 -playButton.width / 2,buttonY * 6);
    playButton.text = "Start Game";
    playButton.textFont = font;
    playButton.strokeWeight = 0;
    playButton.textSize = 40;
    
    howToButton = new Clickable();
    howToButton.color = "#FF000000";
    howToButton.width = 200;
    howToButton.height = 50;
    howToButton.locate(
        maxW / 2 -howToButton.width / 2,buttonY * 6.6);
    howToButton.text = "How To Play";
    howToButton.textFont = font;
    howToButton.strokeWeight = 0;
    howToButton.textSize = 40;
    
    hiScoreButton = new Clickable();
    hiScoreButton.color = "#FF000000";
    hiScoreButton.width = 200;
    hiScoreButton.height = 50;
    hiScoreButton.locate(
        maxW / 2 -hiScoreButton.width / 2,buttonY * 7.2);
    hiScoreButton.text = "Hiscores";
    hiScoreButton.textFont = font;
    hiScoreButton.strokeWeight = 0;
    hiScoreButton.textSize = 40;
    
    quitButton = new Clickable();
    quitButton.color = "#000000AA";
    quitButton.textColor = "#FF0000";
    quitButton.width = 100;
    quitButton.height = 50;
    quitButton.locate(
        maxW / 2 -quitButton.width / 2,buttonY * 8.4);
    quitButton.text = "Quit";
    quitButton.textFont = font;
    quitButton.strokeWeight = 0;
    quitButton.textSize = 40;
    
    backButton = new Clickable();
    backButton.color = "#FF000000";
    backButton.textColor = "#FF0000";
    backButton.width = 200;
    backButton.height = 50;
    backButton.locate(
        maxW / 2 -backButton.width / 2,buttonY * 8);
    backButton.text = "Back";
    backButton.textFont = font;
    backButton.strokeWeight = 0;
    backButton.textSize = 40;
    
    submitButton = new Clickable();
    submitButton.color = "#FF000000";
    submitButton.width = 200;
    submitButton.height = 50;
    submitButton.locate(
        maxW / 2 -submitButton.width / 2,buttonY * 8);
    submitButton.text = "Submit";
    submitButton.textFont = font;
    submitButton.strokeWeight = 0;
    submitButton.textSize = 40;
    
    difficultyButton = new Clickable();
    difficultyButton.color = "#FF000000";
    difficultyButton.width = 200;
    difficultyButton.height = 50;
    difficultyButton.locate(
        maxW / 2 -submitButton.width / 2,buttonY * 4.5);
    difficultyButton.textFont = font;
    difficultyButton.strokeWeight = 0;
    difficultyButton.textSize = 40;
    

    video.hide();
    video.volume(1);
    powerUpSound.setVolume(3);
    hpSound.setVolume(1);
    crashSound.setVolume(1);
    explodeSound.setVolume(1);
    music.setVolume(1);
    gameOver.setVolume(0.5);
    
    cars = new Group();
    
    loadJson();
    
    nameTextfield = createInput();
    difficulty = createSlider(1, 3, 0);
    
    let inputSize = nameTextfield.size().width / 2;
    
    //Button/Slider positions
    difficulty.position(
        (maxW / 2) -(difficulty.width / 2), buttonY * 8.7);
    nameTextfield.position(
        (width / 2) -inputSize, buttonY * 11);
    
    difficulty.hide();
    nameTextfield.hide();

}

//Load JSON file for highscores
function loadJson(){
    for(let i = 0; i < hiScoreJSON.scores.length; i++){
        let user = hiScoreJSON.scores[i].user;
        let carNum = hiScoreJSON.scores[i].cars;
        let difMode = hiScoreJSON.scores[i].mode;
        let rate = hiScoreJSON.scores[i].rating;
        let score = {
            "scores": {
                "user": user,
                "cars": carNum,
                "mode": difMode,
                "rating": rate
            }
        };
        hiScoreArray.push(score);
    }
}

//Choose state
function draw() {
    switch (currentState){
        case LOADING:
            displayLoading();
            break;
        case MAIN_MENU:
            displayMenu();
            break;
        case PLAY:
            startGame();
            break;
        case HI_SCORE:
            displayHiScores();
            break;
        case END:
            displayEnd();
            break;
        case HOW_TO:
            displayHowTo();
            break;
    }
    if(counter == 90){
        counter = 0;
    }
    if(initialized && frameCount % 60 == 0){
        playerFuel--;
    }
    counter++;
}

//Draw road with moving lines
function drawRoad(counter){
    //set background
    background(50);
    //Space between lines
    let space = width / 4;
    //Gap between dashed lines
    let step = height / 10;
    //Line width
    let lineW = 10;
    //Road lines
    //Remove outline on shapes
    noStroke();
    //Dashed lines
    for (i = - 2; i < height; i++) {
    //Yellow lines
        fill(255,i * 25, 0);
        rect(space, step * i + counter, 10, 30);
        rect(space * 3, step * i + counter, 10, 30);
    }
    for(i = 0; i < maxH; i++){
        let val = map(i, 0, maxH, 0, 255);
        stroke(255, val, 0);
        line(0, i, lineW, i);
        
        line(space * 2 - lineW, i, space * 2 - lineW * 2, i);
        line(space * 2 + lineW, i, space * 2 + lineW * 2, i);
        line(maxW - lineW, i, maxW, i); 
    }
}

//Draws players HP, fuel, cars/fireballs passed
function drawHUD(){
    let hudX = 50;
    stroke('black');
    textSize(30);
    textAlign(LEFT);
    fill(255, 0, 0);
    text('Health: ' + playerHP, 
         hudX, 50);
    fill(255, 128, 0);
    text('Fuel: ' + playerFuel, 
         hudX, 50 * 2);
    fill(255, 225, 0);
    text('Fireballs Passed: ' + carsPassed, 
         hudX, 50 * 3);
}

//Play state
function play(){
    currentState = PLAY;
}

//Hiscore state
function hiScore(){
    currentState = HI_SCORE;
}

//Menu state
function menu(){
    if(fuel != undefined){
        fuel.remove();
    }
    if(hp != undefined){
        hp.remove();
    }
    if(enemy != undefined){
        enemy.remove();
    }
    howToBool = true;
    currentState = MAIN_MENU;
}

//How to state
function howTo(){
    currentState = HOW_TO;
}

//End state
function end(){
    music.stop(0);
    gameOver.play();
    initialized = false;
    player.remove();
    fuelSprite.remove();
    hpSprite.remove();
    cars.removeSprites();
    currentState = END;
}

//Show how to play the game
function displayHowTo(){
    background('black');
    
    if(howToBool){
        fuel = createSprite(maxW / 2, 300, 50, 50);
        fuel.addImage(fuelImg);
        hp = createSprite(maxW / 1.5, 300, 50, 50);
        hp.addImage(hpImg);
        enemy = createSprite(maxW / 2, 500, 50, 50);
        enemy.addAnimation(
            'fire',
            'assets/img/fireball/f00.png',
            'assets/img/fireball/f02.png');
        howToBool = false;
    }
    
    fuel.rotation += 3;
    hp.rotation += 3;
    
    nameTextfield.hide();
    backButton.draw();
    backButton.onPress = function(){
        menu();
    }
    difficulty.hide();
    
    textSize(48);
    textAlign(CENTER);
    fill(255, 0, 0);
    text('How To Play', 
         maxW / 2, 60);
    textSize(32);
    textAlign(LEFT);
    fill(255, 64, 0);
    text('Aim: Last as long as you can and', 
         maxW / 10, 140);
    fill(255, 128, 0);
    text('pass as many fireballs as you can.', 
         maxW / 10, 180);
    fill(255, 192, 0);
    text('Collect:', 
         maxW / 10, 300);
    fill(255, 255, 0);
    text('Avoid:', 
         maxW / 10, 500);
    
    drawSprites();
}

//Play video once
function displayLoading(){
    video.size(maxW, maxH);
    video.show();
    nameTextfield.hide();
    if(finished){
        return currentState = MAIN_MENU;
    } else {
        video.play();
        //video.autoplay();
    }
    if (video.time() > 8){
        finished = true;
    }
}

//Show all menu options
function displayMenu(){
    
    drawBG();
    background(title);
    
    mode = difficulty.value();

    video.hide();
    
    textAlign(CENTER);
    stroke(0);
    textSize(100);
    title1 = text('H I G H W A Y', 
                  width / 2, buttonY * 1);
    title2 = text('T O', 
                  width / 2, buttonY * 2);
    title3 = text('H E L L', 
                  width / 2, buttonY * 3);
    strokeWeight(1);
    textSize(32);
    
    difficulty.show();
    
    checkMode();
    playButton.onPress = function(){
        play();
    }
    playButton.onHover = function(){
        playHover = true;
    }
    howToButton.onPress = function(){
        howTo();
    }
    howToButton.onHover = function(){
        howToHover = true;
    }
    hiScoreButton.onPress = function(){
        hiScore();
    }
    hiScoreButton.onHover = function(){
        hiScoreHover = true;
    }
    
    nameTextfield.hide();
    playButton.draw();
    howToButton.draw();
    hiScoreButton.draw();
    difficultyButton.draw();
    
    if(playHover){
        playButton.textColor = "#FF0000";
    } else {
        playButton.textColor = "#000000";
    }
    if(howToHover){
        howToButton.textColor = "#FF0000";
    } else {
        howToButton.textColor = "#000000";
    }
    if(hiScoreHover){
        hiScoreButton.textColor = "#FF0000";
    } else {
        hiScoreButton.textColor = "#000000";
    }
    playHover = false;
    howToHover = false;
    hiScoreHover = false;
}

//Red to yellow gradient background
function drawBG(){
    for(let a = 0; a < maxH; a++){
        let val = map(a, 0, maxH, 0, 255);
        stroke(255, val, 0);
        line(0, a, maxW, a);
    }
}

//Shows game over screen with user stats for the round.
//Enter name to submit score
function displayEnd(){
    background(255, 0, 0);
    fill(0);
    textSize(48);
    textAlign(CENTER);
    text('Game Over', 
         width / 2, height / 2);
    textSize(32);
    text('You passed ' + carsPassed + ' fireballs.', 
         width / 2, height / 2 + 100);
    text('Difficulty: ' + checkMode() + ' ', 
         width / 2, height / 2 + 150);
    textSize(30);
    textAlign(CENTER);
    let nameLabel = text('Enter Name', 
                         maxW / 2, buttonY*7.2);
    nameTextfield.show();
    nameTextfield.elt.focus();
    submitButton.draw();
    submitButton.onPress = function(){
        submitScore();
    }
}

//Displays top 10 highest passed cars if tied, compares 
//rating which is based on easy, medium, hard
//easy-lowest, medium-middle, high-highest
//high > medium > easy
function displayHiScores(){
    let scoreTextX = maxW / 20;
    let scoreTextY = maxH / 15;
    background('black');

    hiScoreArray.sort(
        (a, b) => 
        (a.scores.cars < b.scores.cars) ? 1 : 
        (a.scores.cars === b.scores.cars) ? 
        ((a.scores.rating < b.scores.rating) ? 1 : -1) : -1);
    
    //Title
    fill('red');
    textAlign(CENTER);
    textSize(48);
    text("Hi Scores", 
         maxW / 2, scoreTextY);
    
    //Box
    strokeWeight(5);
    stroke('red');
    noFill();
    rect(scoreTextX, scoreTextY * 1.5, 
         scoreTextX * 18, scoreTextY * 11.5);
    
    //HiScores
    fill('red');
    textSize(32);
    strokeWeight(0);
    text("Name    Fireballs Passed    Mode", 
         maxW / 2, scoreTextY * 2.5);
    for(let i = 0; i < 10; i++){
        fill(255, i * 21, 0);
        textAlign(CENTER);
        text(i + 1, 
             scoreTextX * 2, scoreTextY * 3.5 + i * 60);
        textAlign(LEFT);
        text(hiScoreArray[i].scores.user, 
             scoreTextX * 3.5, scoreTextY * 3.5 + i * 60);
        textAlign(CENTER);
        text(hiScoreArray[i].scores.cars, 
             scoreTextX * 10, scoreTextY * 3.5 + i * 60);
        textAlign(LEFT);
        text(hiScoreArray[i].scores.mode, 
             scoreTextX * 14.5, scoreTextY * 3.5 + i * 60);
    }
    
    nameTextfield.hide();
    difficulty.hide();
    backButton.draw();
    backButton.onPress = function(){
        menu();
    }
}

//Set difficulty mode
function checkMode(){
        if(mode == EASY){
            rating = 1;
            return difficultyButton.text = "EASY";
        } else if(mode == MED){
            rating = 2;
            return difficultyButton.text = "MEDIUM";
        } else if(mode == HARD){
            rating = 3;
            return difficultyButton.text = "HARD";
        }
}

//Assign image to player depending on health
function checkDmg(){
    if(playerHP <= 100){
        player.changeImage('start');
    }
    if(playerHP <= 83){
        player.changeImage('dmg01');
    }
    if(playerHP <= 66){
        player.changeImage('dmg02');
    }
    if(playerHP <= 53){
        player.changeImage('dmg03');
    }
    if(playerHP <= 36){
        player.changeImage('dmg04');
    }
    if(playerHP <= 19){
        player.changeImage('dmg05');
    }
}

//Game play loop
function startGame(){
    checkDmg();
    
    nameTextfield.hide();
    difficulty.hide();
    
    if(!initialized){
        music.play();
        refreshArray();
        initializeCars();
        initializePlayer();
        initializeFuel();
        initializeHP();
        initialized = true;
    }
    //Kill player if conditions are met
    if(playerFuel <= 0 || playerHP <= 0){
        end();
    }
    if(fuelSprite.position.y > maxH + 50){
        updateFuel();
    }
    if(hpSprite.position.y > maxH + 50){
        updateFuel();
    }
    fuelSprite.rotation += 3;
    hpSprite.rotation += 3;
    checkFuelSpeed();
    checkHPSpeed();
    checkMovement();
    checkCollision();
    drawRoad(counter);
    checkPos(carsArray);
    setMovement(carsArray);
    player.collide(cars, damageCar);
    player.collide(fuelSprite, collectFuel);
    player.collide(hpSprite, collectHP);
    cars.bounce(cars);
    drawSprites();
    drawHUD();
    quitButton.draw();
    quitButton.onPress = function(){
        end();
    }
}

//If fuel speed starts going to fast slow down
function checkFuelSpeed(){
    if(fuelSprite.getSpeed() > 10){
        fuelSprite.setSpeed(1);
    }
}
//If health speed starts going to fast slow down
function checkHPSpeed(){
    if(hpSprite.getSpeed() > 10){
        hpSprite.setSpeed(1);
    }
}

//Scales player size depending on difficulty mode
function scalePlayer(mode){
    return map(mode, 1,3,2,1);
}

//Creates player sprite and sets HP, fuel, cars passed
function initializePlayer(){
    let scale = scalePlayer(mode);
    playerHP = 100;
    playerFuel = 100;
    carsPassed = 0;
    //Player start position
    player = createSprite(playerX,playerY, 
                          carW / scale, carH / scale);
    player.addImage('start', p00);
    player.addImage('dmg01', p01);
    player.addImage('dmg02', p02);
    player.addImage('dmg03', p03);
    player.addImage('dmg04', p04);
    player.addImage('dmg05', p05);
    player.changeImage('start');
}

//Create fuel sprite
function initializeFuel(){
    let randomX = changeX();
    let randomY = randNum(-1000, -2000);
    fuelSprite = createSprite(randomX, randomY, 50, 50);
    fuelSprite.attractionPoint(1, randomX, maxH + 50);
    fuelSprite.addImage(fuelImg);
}

//Add fuel to player
function collectFuel(){
    powerUpSound.play();
    playerFuel += 20;
    if(playerFuel > 100){
        playerFuel = 100;
    }
    updateFuel();
}

//Update fuel location
function updateFuel(){
    let randomX = changeX();
    let randomY = randNum(-1000, -2000);
    fuelSprite.position.x = randomX;
    fuelSprite.position.y = randomY;
    fuelSprite.attractionPoint(1, randomX, maxH + 50);
}

//Create health sprite
function initializeHP(){
    let randomX = changeX();
    let randomY = randNum(-2000, -3000);
    hpSprite = createSprite(randomX, randomY, 50, 50);
    hpSprite.attractionPoint(1, randomX, maxH + 50);
    hpSprite.addImage(hpImg);
}

//Add health to player
function collectHP(){
    hpSound.play();
    playerHP += 20;
    if(playerHP > 100){
        playerHP = 100;
    }
    updateHP();
}

//Update health location
function updateHP(){
    let randomX = changeX();
    let randomY = randNum(-1000, -3000);
    hpSprite.position.x = randomX;
    hpSprite.position.y = randomY;
    hpSprite.attractionPoint(1, randomX, maxH + 50);
}

//Creates enemy sprites and sets attraction to bottom of screen
function initializeCars(){
    let car;
    for(let i=0; i<carsArray.length; i++){
        //Random speed
        let rand = random(0.5,2);
        //Random X start
        let randXStart = randNum(0,3);
        car = createSprite(randX[randXStart], 0 - carH / 2,
                           carW * 1.5, carH);
        car.attractionPoint(rand, randX[randXStart], maxH + carH);
        car.addAnimation('fire', 
                         'assets/img/fireball/f00.png', 
                         'assets/img/fireball/f02.png');
        carsArray[i] = car;
        cars.add(car);
    }
}

//Creates array of all possible X value spawn point
function refreshArray(){
    let a = maxW / 8;
    randX[0] = a * 1;
    randX[1] = a * 3;
    randX[2] = a * 5;
    randX[3] = a * 7;
}

//Sets movement speed of enemy car/fireball depending on difficulty mode
function setMovement(car, difficulty){
    if(atBottom){
        let a = randNum(0.4, 0.6);
        let newX = changeX();
        car.position.x = newX;
        car.position.y = 0 - carH / 2;
        car.attractionPoint(difficulty * a, newX, maxH + carH);
        atBottom = false;
    }
}

//Checks position of the enemy car/fireball.
//Adds 1 to passedCars for each car that hits the bottom of screen
function checkPos(car){
    for(let i = 0; i < car.length; i++){
        if(car[i].position.y > maxH + carH){
            atBottom = true;
            carsPassed++;
            if(car[i].getSpeed() > 20){
                setMovement(car[i], - 10);
            } else {
                setMovement(car[i], mode);
            }
        }
    }
}

//Choose random X value from pre-allocated X values in array
function changeX(){
    let rand = randNum(0,3);
    return randX[rand];
}

//Choose random number between a & b and rounds to nearest whole number
function randNum(a,b){
    return Math.round(random(a,b));
}

//Adds damge if user hits cars
function damageCar(){
    playerHP -= 17;
    if(playerHP < 0){
        explodeSound.play();
    } else {
        crashSound.play();
    }
    let posX = maxW / 2;
    let posY = maxH / 2;
    if(player.position.x < posX){
        player.position.x -= 50;
    } else if(player.position.x > posX){
        player.position.x += 50;
    }
    if(player.position.y < posY){
        player.position.y -= 50;
    } else if(player.position.y > posY){
        player.position.y += 50;
    }
}

//Adds new entry into hiScoreArray
function submitScore(){
    gameOver.stop(0);
    userName = nameTextfield.value();
    if (userName.length > 8) {
        userName = userName.substring(0,10);
    }
    let difMode = checkMode();
    let carNum = carsPassed;
    let save = { "scores":
                {
                    "user": userName,
                    "cars": carNum,
                    "mode": difMode,
                    "rating": rating
                }
               }
    hiScoreArray.push(save);
    //saveJson();
    hiScore();
}

//download hiscores to json file
function saveJson(){
    saveJSON(hiScoreArray, 'hiscores.json');
}

//Maps difficulty mode
function setMode(mode){
    return map(mode,1,3,9,3);
}

//Checks if player pressed movement keys
//Movement speed depends on difficulty mode
function checkMovement(){
    if(keyIsDown(65)){
        player.position.x -=setMode(mode);
    }
    if(keyIsDown(68)){
        player.position.x +=setMode(mode);
    }
    if(keyIsDown(87)){
        player.position.y -=setMode(mode);
    }
    if(keyIsDown(83)){
        player.position.y +=setMode(mode);
    }
}

//Checks if player has hit canvas edge
function checkCollision(){
    if (player.position.x < carW / 2){
        player.position.x = carW / 2 + 15;
        wallDmg();
    }
    if (player.position.x > width - (carW / 2)){
        player.position.x = (width - (carW / 2)) - 15;
        wallDmg();
    }
    if (player.position.y < carH / 2){
        player.position.y = carH / 2;
    } 
    if (player.position.y > height - (carH / 2)){
        player.position.y = (height - (carH / 2)) - 15;
    }
}

//Add damage and play sound when hitting walls
function wallDmg(){
    playerHP -= 1;
    if(playerHP < 0){
        if(!explodeSound.isPlaying()){
            explodeSound.play();
        }
    } else {
        if(!crashSound.isPlaying()){
            crashSound.play();
        }
    }
}