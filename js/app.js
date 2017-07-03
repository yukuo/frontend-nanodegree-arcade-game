// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //Declare x, y location and speed variable
    var x, y, sp;

    //Declare width and height of the enemy-bug image
    var w, h;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.sp;
    if (this.x > 505) {
      this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  //Set the image of Player
  this.sprite = 'images/char-boy.png';

  //Declare x, y location variables, and speed variable for the Player
  //dr, direction to move
  var x, y, sp
  var dr = null;
};


// Update the enemy's position, required method for game
Player.prototype.update = function() {
  switch (this.dr) {
    case 'left':
      //Check if player is hitting left boundry by the expected left move
      //If hits boundry, don't move
      if((this.x - this.sp) > 0) {
        this.x -= this.sp;
      }
      this.dr = null;
      break;

    case 'right':
    //Check if player is hitting right boundry by the expected right move
    //If hits boundry, don't move
      if((this.x + Resources.get(this.sprite).width + this.sp) < ctx.canvas.width) {
        this.x += this.sp;
      }
      this.dr = null;
      break;

    case 'up':
    //Check if player is hitting top boundry by the expected up move
    //If hits boundry, don't move
      if ((this.y - this.sp) > 0) {
        this.y -= this.sp;
      }

      //Check if player had hit the water block. If so, reset player
      if (this.y < 30) {
        this.reset();
      }

      this.dr = null;
      break;

    case 'down':
    //Check if player is hitting bottom boundry by the expected down move
    //If hits boundry, don't move
    if ((this.y + Resources.get(this.sprite).height + this.sp) < ctx.canvas.height) {
      this.y += this.sp;
    }
      this.dr = null;
      break;
    default:
  }

  //Check if player collide into enemies
  if (this.checkCollisions()) {
    this.reset();
  }
};


//Draw the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//Set Player's direction of move based on user's action
Player.prototype.handleInput = function(inputKey) {
  switch (inputKey) {
    case 'left':
      this.dr = 'left';
      this.update();
      break;
    case 'right':
      this.dr = 'right';
      this.update();
      break;
    case 'up':
      this.dr = 'up';
      this.update();
      break;
    case 'down':
      this.dr = 'down';
      this.update();
      break;
    default:
  }
};

//Reset player initial location
Player.prototype.reset = function() {
  this.x = 202.5;
  this.y = 376;
};

//checkCollisions for Player
Player.prototype.checkCollisions = function() {
  for (var i = 0; i < allEnemies.length; i++) {
    if ((this.x <= (allEnemies[i].x + 101)) && (this.x >= allEnemies[i].x)) {
      if ((this.y >= allEnemies[i].y) && (this.y <= (allEnemies[i].y + 70))) {
        return true;
        break;
      }
    }
  }
  return false;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

//Instantiate 1st enemy, set initial x, y location and speed
var enemy1 = new Enemy();
enemy1.x = 0;
enemy1.y = 63;
enemy1.sp = 200;

//Push enemy1 to allEnemies array
allEnemies.push(enemy1);

//Instantiate 2nd enemy, set inital x, y location and speed
var enemy2 = new Enemy();
enemy2.x = 0;
enemy2.y = 146;
enemy2.sp = 100;

//Push enemy2 to allEnemies array
allEnemies.push(enemy2);

//Instantiate 3rd enemy, set inital x, y location and speed
var enemy3 = new Enemy();
enemy3.x = 0;
enemy3.y = 220;
enemy3.sp = 150;

//Push enemy3 to allEnemies array
allEnemies.push(enemy3);


//Instantiate the player, set inital x, y location and speed
var player = new Player();
player.x = 202.5;
player.y = 376;
player.sp = 50;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
