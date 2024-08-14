var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var level = 1;
var gameStarted = false;

var blinkInterval = setInterval(function() {
    $("h1").fadeOut(500);
    $("h1").fadeIn(500);
    }, 1000);

$(document).one("keydown touchstart", function() {
    if(!gameStarted) {
        gameStarted = true;
        clearInterval(blinkInterval);
        $("h1").stop(true, true).fadeIn();
        $("#level-title").text("Level - " + level++);
        
        nextSequence();

        $(".btn").on("click", function() {
            var userChosenColor = $(this).attr("id");
            userPattern.push(userChosenColor);
            console.log("User Pattern: " + userPattern);

            playSound(userChosenColor); 
            clickEffects(userChosenColor);

            checkAnswer(userPattern.length - 1);
        });
    }
});

function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber]; 
    gamePattern.push(randomChosenColor);
    console.log("Game Pattern: " + gamePattern); 
    playSound(randomChosenColor); 
    clickEffects(randomChosenColor);
    userPattern = [];
}

function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function clickEffects(buttonColor) {
    $("#" + buttonColor).addClass("pressed");
    setTimeout(function() {
        $("#" + buttonColor).removeClass("pressed")
    }, 250);
}

function checkAnswer(currentLevel) {
    if (userPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("correct");
        if (userPattern.length === gamePattern.length) {
            setTimeout(function() {
                $("#level-title").text("Level - " + level++);
            }, 500);
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");

        $("h1").html("GAME OVER<h2>Press any key to restart</h2>");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        var blinkInterval = setInterval(function() {
            $("h2").fadeOut(500).fadeIn(500);
        }, 1000);
        
        $(document).on("keydown touchstart", function() {
            gameStarted = false;
            location.reload();
        });
    }
}
