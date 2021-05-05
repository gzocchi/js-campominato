// Il computer deve generare 16 numeri casuali tra 1 e 100.
// I numeri non possono essere duplicati.
// In seguito deve chiedere all'utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
// L'utente non può inserire più volte lo stesso numero.
// Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all'utente un altro numero.
// La partita termina quando il giocatore inserisce un numero "vietato" o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l'utente ha inserito un numero consentito.
// all'inizio il software richiede anche una difficoltà all'utente che cambia il range di numeri casuali:
// con difficoltà 0 => tra 1 e 100
// con difficoltà 1 => tra 1 e 80
// con difficoltà 2 => tra 1 e 50

var bombArray = [];
var attemptsArray = [];
var cells = 100;
var bomb = 16;
var attempts = cells - bomb;
var score = 0;
var gameOver = false;


// genero 16 numeri univoci per le bombe
for (var i = 0; i < bomb; i++) {
    do {
        var number = casualNumber(1, cells);
    } while (isInArray(number, bombArray));
    bombArray.push(number);
};
console.log(bombArray.sort()); // debug

// chiedo un numero univoco e che non sia una bomba
while (attemptsArray.length < attempts && !gameOver) {
    do  {
        var questionNumber = parseInt(prompt("Dimmi un numero tra 1 e " + cells));
    } while (isInArray(questionNumber, attemptsArray) || isNaN(questionNumber) || questionNumber < 1 || questionNumber > cells);

    if (isInArray(questionNumber, bombArray)) {
        gameOver = true;
        if (score == 1) {
            console.log("Hai Perso, hai totalizzato 1 punto!");
            alert("Hai Perso, hai totalizzato 1 punto!");
            
        } else {
            console.log("Hai Perso, hai totalizzato " + score + " punti!");
            alert("Hai Perso, hai totalizzato " + score + " punti!");
        };
    } else {
        attemptsArray.push(questionNumber);
        score += 1;
    };

    if (attemptsArray.length == attempts) {
        console.log("Hai Vinto!!! Hai totalizzato " + score + " punti su un massimo di " + attempts);
        alert("Hai Vinto!!! Hai totalizzato " + score + " punti su un massimo di " + attempts);
    };
};

console.log(attemptsArray); // debug
console.log(score);         // debug



// FUNCTIONS
function casualNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
};

function isInArray (element, array) {
    return array.indexOf(element) != -1;
};
