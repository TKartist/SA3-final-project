// Set up the chess clock buttons
const startButton = document.querySelector(".start-button");
const stopButton = document.querySelector(".stop-button");
const resetButton = document.querySelector(".reset-button");

// Set up the chess clock timers
const player1Timer = document.querySelector(".player-1-timer");
const player2Timer = document.querySelector(".player-2-timer");

// Set up the initial time for each player
let player1Time = 20;
let player2Time = 20;

// Set up a flag to keep track of which player's turn it is
let isPlayer1Turn = true;

// Set up the interval for the chess clock
let interval;

// Set up the function to start the chess clock
function startClock() {
  // Start the interval that will update the timers
  interval = setInterval(() => {
    // If it is player 1's turn, decrement their time and update the timer display
    if (isPlayer1Turn) {
      player1Time--;
      player1Timer.textContent = player1Time;

      // If player 1 runs out of time, stop the clock and switch to player 2's turn
      if (player1Time === 0) {
        stopClock();
        gameover();
      }
    } else {
      // If it is player 2's turn, decrement their time and update the timer display
      player2Time--;
      player2Timer.textContent = player2Time;

      // If player 2 runs out of time, stop the clock and switch to player 1's turn
      if (player2Time === 0) {
        stopClock();
        gameover()
      }
    }
  }, 1000); // Update the timers every 1000 milliseconds (1 second)
}

// Set up the function to stop the chess clock
function stopClock() {
  clearInterval(interval);
}

// Set up the function to reset the chess clock
function resetClock() {
  // Stop the clock and reset the timers
  stopClock();
  player1Time = 20;
  player2Time = 20;
  player1Timer.textContent = player1Time;
  player2Timer.textContent = player2Time;

  // // Set player 1's turn
  // isPlayer1Turn = true;
}

// Listen for clicks on the start, stop, and reset buttons
startButton.addEventListener("click", startClock);
stopButton.addEventListener("click", stopClock);
resetButton.addEventListener("click", resetClock);