window.onload = function() {
  
}

// Player constructor
const Player = function(id) {
  this.id = id;
  this.totalScore = 0;
  this.currentScore = 0;
};

Player.prototype.reset = function() {
  this.totalScore = 0;
  this.currentScore = 0;
};

// Game constructor
const Game = function() {
  this.players = [new Player(0), new Player(1)];
  this.activePlayer = 0;
  this.dice = 0;
  this.playing = false;
};

Game.prototype.init = function() {
  this.players.forEach(function(player) {
    player.reset();
  });
  this.activePlayer = 0;
  this.dice = 0;
  this.playing = true;
  this.updateUI();
};

Game.prototype.rollDice = function() {
  this.dice = Math.floor(Math.random() * 6) + 1;
};

Game.prototype.switchPlayer = function() {
  this.players[this.activePlayer].currentScore = 0;
  this.activePlayer = this.activePlayer === 0 ? 1 : 0;
};

Game.prototype.hold = function() {
  const currentPlayer = this.players[this.activePlayer];
  currentPlayer.totalScore += currentPlayer.currentScore;
  currentPlayer.currentScore = 0;
  if (currentPlayer.totalScore >= 100) {
    this.playing = false;
    this.updateUI();
    document.querySelector('p#output').innerText = `Player ${currentPlayer.id + 1} wins!`;
  } else {
    this.switchPlayer();
    this.updateUI();
  }
};

Game.prototype.updateUI = function() {
  this.players.forEach(function(player, index) {
    document.getElementById(`score--${index}`).textContent = player.totalScore;
    document.getElementById(`current--${index}`).textContent = player.currentScore;
  });

  const currentPlayer = this.players[this.activePlayer];
  document.querySelector('.player--0').classList.toggle('player--active', currentPlayer.id === 0);
  document.querySelector('.player--1').classList.toggle('player--active', currentPlayer.id === 1);
};


const game = new Game();

// Attach event listeners to the buttons
const btnRoll = document.getElementById('btnRoll');
const btnHold = document.getElementById('btnHold');

btnRoll.addEventListener('click', function() {
  if (game.playing) {
    game.rollDice();
    document.querySelector('p#output').innerText = `Player ${game.players[game.activePlayer].id + 1} rolled a ${game.dice}.`;

    if (game.dice !== 1) {
      const currentPlayer = game.players[game.activePlayer];
      currentPlayer.currentScore += game.dice;
      game.updateUI();
    } else {
      game.switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function() {
  if (game.playing) {
    game.hold();
  }
});



// Initialize the game
game.init();
