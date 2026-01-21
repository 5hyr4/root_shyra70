// Créer le canevas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
document.querySelector("#gameBox").appendChild(canvas);

var gameState = "playing"; // can be "playing", "won", or "lost"**
var restartBtn = document.getElementById("restartBtn");


// === Helper: check if screen is desktop ===
function isDesktop() {
    return window.innerWidth >= 1024;
}

// === Resize canvas and re-init game state ===
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init(); // re-center player and goodies
}

//Charger les sprites
// Image d'arrière-plan
var bgReady = false;
var bgImage = new Image();
bgImage.src = "images/game_background.png";
bgImage.onload = function () {
	bgReady = true; 
};
// Estampe gagnant
var winReady = false;
var winImage = new Image(); 
winImage.src = "images/win.png"; 
winImage.onload = function () {
    winReady = true; 
};

// Estampe perdant
var loseReady = false;
var loseImage = new Image(); 
loseImage.src = "images/lose.png"; 
loseImage.onload = function () {
    loseReady = true; 
};

// Image du joueur
var playerReady = false;
var playerImage = new Image(); 
playerImage.src = "images/somnia_fairy.png"; 
playerImage.onload = function () {
    playerReady = true; 
};

// Image des goodies
var goodyReady = false;
var goodyImage = new Image(); 
goodyImage.src = "images/luminae.png"; 
goodyImage.onload = function () {
    goodyReady = true; 
};

 // Image des baddies
 var badReady = false;
 var badImage = new Image();
 badImage.src = "images/nocturns.png";
 badImage.onload = function () {
     badReady = true;
 };

 // === GAME STATE CONTROL ===
var gameState = "playing"; // "playing", "won", or "lost"
var restartBtn = document.getElementById("restartBtn");

// Restart button click
restartBtn.addEventListener("click", function() {
    if (gameState === "won" || gameState === "lost") {

        goodies = [
            { width: 50, height: 70 },
            { width: 50, height: 70 },
            { width: 50, height: 70 }
        ];
        
        bad = [
            { width: 50, height: 70, x: 0, y: 0, speed: 2 }
        ];
        
        // reset state
        gameState = "playing";
        restartBtn.style.display = "none";

        // clear the previous win/lose overlay
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // reset everything and restart loop
        init();
        window.requestAnimationFrame(main);
    }
});


// Game Over screen
function gameOver() {
    gameState = "lost";
    restartBtn.style.display = "block";

    // Dim background
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Show lose image
    if (loseReady && loseImage.complete) {
        var scale = 0.8;
        var imgW = loseImage.width * scale;
        var imgH = loseImage.height * scale;
        ctx.drawImage(
            loseImage,
            (canvas.width - imgW) / 2,
            (canvas.height - imgH) / 2,
            imgW,
            imgH
        );
    }
}

// Win screen
function winScreen() {
    gameState = "won";
    restartBtn.style.display = "block";

    // Dim background
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Show win image
    if (winReady && winImage.complete) {
        var scale = 0.8;
        var imgW = winImage.width * scale;
        var imgH = winImage.height * scale;
        ctx.drawImage(
            winImage,
            (canvas.width - imgW) / 2,
            (canvas.height - imgH) / 2,
            imgW,
            imgH
        );
    }
}


// Créer des objets de jeu globaux 
var player = {
    speed : 5, // mouvement en pixels par tick 
    width: 100,
    height: 110
};

var goodies = [ // ceci est un tableau (array)
    { width: 50, height: 70 }, // un goody
    { width: 50, height: 70 }, // deux goodies
    { width: 50, height: 70 }  // trois goodies
];

var bad = [
    { width: 50, height: 70, x: 0, y: 0, speed: 2 }
];



// Variables de vitesse
var vX = 0;
var vY = 0;


// Gérer les commandes du clavier
addEventListener("keydown", function (e) {
    //Touches
    if (e.keyCode == 38) { // HAUT
        vX = 0;
        vY = -player.speed;
    }
    if (e.keyCode == 40) { // BAS
        vX = 0;
        vY = player.speed;
    }
    if (e.keyCode == 37) { // GAUCHE
        vX = -player.speed;
        vY = 0;
    }
    if (e.keyCode == 39) { // DROITE
        vX = player.speed;
        vY = 0;
    }
    if (e.keyCode == 32) { // ARRÊT barre d’espace
        vX = 0;
        vY = 0;
    }
}, false);

// Gérer les commandes tactiles
addEventListener("touchstart", function (e) {
    if (e.target.id == "uArrow") { // HAUT
        vX = 0;
        vY = -player.speed;
    }
    else if (e.target.id == "dArrow") { // BAS
        vX = 0;
        vY = player.speed;
    }
    else if (e.target.id == "lArrow") { // GAUCHE
        vX = -player.speed;
        vY = 0;
    }
    else if (e.target.id == "rArrow") { //DROIT
        vX = player.speed;
        vY = 0;
    }
    else { // ARRÊT S’arrête si vous touchez ailleurs
        vX = 0;
        vY = 0;
    }
});



//Définir l'état initial
var init = function () {
    //Mettre le joueur au centre
    player.x = (canvas.width - player.width) / 2; 
    player.y = (canvas.height - player.height) / 2;

      // properly randomize each bad's position
    for (var i in bad) {
        bad[i].x = Math.random() * (canvas.width - bad[i].width);
        bad[i].y = Math.random() * (canvas.height - bad[i].height);

        // Keep enemy at least 200px away from player
        while (Math.abs(bad[i].x - player.x) < 200 && Math.abs(bad[i].y - player.y) < 200) {
            bad[i].x = Math.random() * (canvas.width - bad[i].width);
            bad[i].y = Math.random() * (canvas.height - bad[i].height);
        }
    }

    //Placez des goodies à des endroits aléatoires 
    for (var i in goodies) {
        goodies[i].x = (Math.random() * (canvas.width - goodies[i].width));
        goodies[i].y = (Math.random() * (canvas.height - goodies[i].height));
    }
};

var landingScreen = document.getElementById("landingScreen");
var startBtn = document.getElementById("startBtn");

function startGame() {
    landingScreen.style.display = "none"; // hide landing page
    gameState = "playing";
    init();
    window.requestAnimationFrame(main);
}

// Click to start
startBtn.addEventListener("click", startGame);

// Optional: start with spacebar
document.addEventListener("keydown", function(e) {
    if (landingScreen.style.display !== "none" && e.code === "Space") {
        startGame();
    }
});


// La boucle de jeu principale
var main = function () {
    if (checkWin()) {
        winScreen();
        return;
    }

    if (gameState !== "playing") {
        return; // stop the game loop when not playing
    }

    // Player movement
    if (player.x > 0 && player.x < canvas.width - player.width) {
        player.x += vX;
    } else {
        player.x -= vX;
        vX = -vX; // bounce
    }

    if (player.y > 0 && player.y < canvas.height - player.height) {
        player.y += vY;
    } else {
        player.y -= vY;
        vY = -vY; // bounce
    }

    // Check collisions
    for (var i in goodies) {
        if (checkCollision(player, goodies[i])) {
            goodies.splice(i, 1);
        }
    }

    for (var i in bad) {
        var dx = player.x - bad[i].x;
        var dy = player.y - bad[i].y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            bad[i].x += (dx / distance) * bad[i].speed;
            bad[i].y += (dy / distance) * bad[i].speed;
        }

        if (checkCollision(player, bad[i])) {
            gameOver();
            return;
        }
    }

    render();
    window.requestAnimationFrame(main);
};



// Dessinez le tout
var render = function () {
    if (bgReady) {
        ctx.fillStyle = ctx.createPattern(bgImage, 'repeat');
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
    if (playerReady) {
        ctx.drawImage(playerImage, player.x, player.y);
    }
    if (goodyReady)
        for (var i in goodies) {
        ctx.drawImage(goodyImage, goodies[i].x, goodies[i].y);
    }
    if (badReady)
        for (var i in bad) {
        ctx.drawImage(badImage, bad[i].x, bad[i].y);
    }

    //Label
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font="18pt Helvetica";
    ctx.fillText("Luminae restants : "+goodies.length, 30, 45);};

//Fonction générique pour vérifier les collisions 
var checkCollision = function (obj1,obj2) {
    if (obj1.x < (obj2.x + obj2.width) && 
        (obj1.x + obj1.width) > obj2.x && 
        obj1.y < (obj2.y + obj2.height) && 
        (obj1.y + obj1.height) > obj2.y
        ) {
            return true;
    }
};

//Vérifiez si nous avons gagné
var checkWin = function () {
    if (goodies.length > 0) { 
        return false;
    } else { 
        return true;
    }
};

