// Array Created for randomization.
let buttonColors = ["red", "blue", "green", "yellow"];

// Array created to store patterns created by the Computer/game.
let gamePattern = [];

// Array created to store the pattern of color choices made by the Player/user.
let userClickedPattern = [];

// Setting this to false , as we want the nextSequence to be executed only on one/first keypress
// then after execution of nextSequence it is set to true.
// Due to this, next time a key is pressed, the nextSequence will not execute.
let started = false;

// Starting the game from level 0. This will be further incremented
let gameLevel = 0;

// Looking for any key pressed to start the game so that nextSequence() will be executed,
// only once i.e. on first keypress only.
$(document).keydown(function (e) {
  if (started === false) {
    $("#level-title").text(`Level ${gameLevel}`);
    nextSequence();
    started = true;
  }
});

// Looking for the button pressed by the user
// Store user chosen colours as pattern and pass the length as level in checkAnswer function to compare the levels.
$(".btn").click(function (e) {
  // Another Methods to do the same thing as below (line 38)
  // let userChosenColor = this.id;
  // let userChosenColor = this.getAttribute("id");
  // let userChosenColor = e.target.id;

  let userChosenColor = $(this).attr("id"); //Getting the id (ie. Blue, Red, Green, Yellow) of the pressed button
  userClickedPattern.push(userChosenColor); //Pushing the pressed button id into an array

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1); //Inputting the last color clicked
});

function nextSequence() {
  // We reset the userClickedPattern to an empty array ready for the next level.
  // but doing that we create a pattern for user in which their selected colors will be stored, when they presses the color.
  userClickedPattern = [];
  gameLevel++;
  $("#level-title").text(`Level ${gameLevel}`); // Showing the user which level are they on [level number]

  // Generating the random game pattern
  let randomNumber = Math.floor(Math.random() * 4); // Generates Random Number between 0 - 3
  let randomChosenColor = buttonColors[randomNumber]; // Selects a random color from the 'buttonColors' array
  gamePattern.push(randomChosenColor);

  // Adding some animation to the randomly generated color
  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  // Calling "playSound function" to play sound
  playSound(randomChosenColor);
}

function checkAnswer(currentlevel) {
  // Checking the user's answer
  // Checks the most recent answer given by the user i.e. [recent color chosen]
  if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
    console.log("success");

    // Checks if the entire sequence is completed by the user
    if (gamePattern.length === userClickedPattern.length) {
      // If both the if conditions come as true, then a timeout is set.
      // If the user responds correctly, the nextSequence is called in 1000ms.
      setTimeout(() => {
        nextSequence(); // calling the next sequence function to move on to the next level
      }, 1000);
    }

    // If the if conditions are not satisfied,  i.e. user presses wrong colors compared to game's color,
    // in short patterns do not tally, then the game will end and else statements will be executed.
  } else {
    console.log("wrong");
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Gamer-over animation
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    // The startOver function will reset the gamelevel to 0, emptying the game pattern, and making the started variable to 'false',
    // Setting the started value to false is the only reason due to which we are able to restart our game.
    // Because of this function, once the game ends, if the user wishes to restart, they can do so by pressing any key. Once the key is pressed,
    startOver();
  }
}

// PlaySound Function , it takes color name or variable name as a parameter
function playSound(button) {
  let audio = new Audio(`sounds/${button}.mp3`);
  audio.play();
}

// Creating an animation for the button which is pressed [by the player/user]
function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

// function to start over the game after user inputs the wrong answer
// It restarts the gamelevel to 0, emptying the game pattern, and making the started variable value 'false',
// so as to be able to use it in then function where we use keypress.
function startOver() {
  gameLevel = 0;
  gamePattern = [];
  started = false;
}
