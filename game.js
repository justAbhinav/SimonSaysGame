//
var firstTimeFlag = false;
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var counter = 0;

function addClicker() {
  $(".btn").click(function () {
    animatePress(this.id);
    playSound(this.id);
    //   debugger;
    clickHandler(this.id);
  });
}

function removeClicker() {
  $(".btn").off("click");
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function clickHandler(color) {
  userClickedPattern.push(color);
  console.log(userClickedPattern);
  if (counter < level) {
    if (color == gamePattern[counter]) {
      counter++;
      if (counter == level) {
        counter = 0;
        userClickedPattern = [];
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      removeClicker();
      counter = 0;
      $("h1").text("Game Over, Press Any Key to Restart");
      console.log("gameover detected");
      gameOver();
    }
  } else {
    counter = 0;
    userClickedPattern = [];
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
}

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function flash(color) {
  $("." + color)
    .fadeOut(100)
    .fadeIn(100);
}

function nextSequence() {
  var randomnumber = Math.floor(Math.random() * 4);
  const buttonColors = ["red", "blue", "green", "yellow"];
  var randomchosenColor = buttonColors[randomnumber];
  gamePattern.push(randomchosenColor);

  $("h1").text("Level " + level);
  level++;
  flash(randomchosenColor);
  playSound(randomchosenColor);
}

$(document).keydown(function (event) {
  if (firstTimeFlag == false) {
    firstTimeFlag = true;
    level = 0;
    addClicker();
    nextSequence();
  }
});

function gameOver() {
  $("body").addClass("game-over");
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  firstTimeFlag = false;
}
