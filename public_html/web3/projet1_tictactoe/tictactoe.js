
let cases = document.querySelectorAll(".case");
let replayBtn = document.querySelector("#replay");
let panneauMessage = document.querySelector("#message");
let panneauMessageGagnant = document.querySelector("#message img");

let joueurX = true;
let gagnant = '';
const patrons = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]

];

for (let boite of cases) {
    boite.active = true;
    boite.addEventListener("click", function() {
        if (boite.active) {
            if (joueurX) {
               // boite.innerText = "X";
               boite.style.backgroundImage = "url('img/e.png')";
                joueurX = false;
            }
            else {
              //  boite.innerText = "O";
              boite.style.backgroundImage = "url('img/m.png')";
                joueurX = true;
            }
        }
        boite.active = false;
        valide();
    });

}

const valide = function () {

        let victoire = false;
    
        let isTie = Array.from(cases).every(boite => !boite.active);
            if (isTie && !victoire) {
                showPanneauMessageGagnant("Partie nulle");
            }

    for (let patron of patrons) {
       // let val1 = cases[patron[0]].innerText;
       // let val2= cases[patron[1]].innerText;
       // let val3= cases[patron[2]].innerText;
       let val1 = cases[patron[0]].style.backgroundImage.slice(5,14);
       let val2 = cases[patron[1]].style.backgroundImage.slice(5,14);
       let val3 = cases[patron[2]].style.backgroundImage.slice(5,14);

        if (val1 &&
            val1 === val2 &&
            val1 === val3) {
                
            let gagnant = "";
            if (val1.includes("e.png")) {
                gagnant = "e";
                showPanneauMessageGagnant("Étoile a gagné!");
                
            } else {
                gagnant = "m";
                showPanneauMessageGagnant("Méduse a gagné!");
            }
    
            for (let boite of cases) {
                boite.active = false;
            
                }
            }
    }
}


replayBtn.addEventListener("click", function () {
    for (let boite of cases) {
        boite.active = true;
        boite.style.backgroundImage = "";
        joueurX = true;
    }
    hidePanneauMessageGagnant();
});

function showPanneauMessageGagnant(text) {
    message.textContent = text;
    message.classList.remove("hidden");
  }

function hidePanneauMessageGagnant() {
    message.classList.add("hidden");
  }

// Partie nulle:
function replayGame() {
    for (let boite of cases) 
      boite.active = true;
      boite.style.backgroundImage = "";
    }

  // Hide overlay just in case
  hidePanneauMessageGagnant();




