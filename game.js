const gamePattern = [];
const userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let gameStarted = false;
let level = 0;

$("html").keydown(function () {
  if (!gameStarted) {
    gameStarted = true;
    setTimeout(() => {
      nextSequence();
    }, 500);
  }
});

$("div[type=button]").click(function () {
  if (gameStarted) {
    const userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
});

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  let targetButton = $("#" + randomChosenColour);
  playSound(randomChosenColour);
  targetButton.fadeOut(100).fadeIn(100);
}

function playSound(name) {
  const soundsDir = "sounds/";
  const fileExtension = ".mp3";
  const audio = new Audio(soundsDir + name + fileExtension);
  audio.play();
}

function animatePress(currentColour) {
  const target = $("#" + currentColour);
  target.addClass("pressed");
  setTimeout(() => {
    target.removeClass("pressed");
  }, 100);
}

function checkAnswer(level) {
  if (userClickedPattern[level] === gamePattern[level]) {
    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern.length = 0;
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 500);

    $("#level-title").text(
      "Game Over, score: " +
        (gamePattern.length - 1) +
        ". Press any key to start again."
    );

    startOver();
  }
}

function startOver() {
  level = 0;
  userClickedPattern.length = 0;
  gamePattern.length = 0;
  gameStarted = 0;
}
