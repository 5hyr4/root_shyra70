
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
                console.log(`Le gagnant est ${val1}`);
                panneauMessageGagnant.src = val1;
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
});



