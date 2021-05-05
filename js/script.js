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

var scoreArray = [];
var replay = false;

alert("Campo Minato\n3 difficoltà possibili:\nDifficoltà 0 => numeri tra 1 e 100\nDifficoltà 1 => numeri tra 1 e 80\nDifficoltà 2 => numeri tra 1 e 50")

do {
    game(difficultChoice());
} while (replay)

for (var i = 0; i < scoreArray.length; i++) {
    document.getElementById("partite_giocate").innerHTML += "<li>" + scoreArray[i] + "</li>";
}

console.log("Punteggi partite:", scoreArray); // debug



// FUNCTIONS
function casualNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
};

function isInArray (element, array) {
    return array.indexOf(element) != -1;
};

function difficultChoice () {
    // chiedo la difficoltà gioco e ritorno il valore da impostare a cells
    do {
        var level = parseInt(prompt("Scegli la difficoltà: 0, 1 o 2?\nMi sento fortunato => 3"));
    } while (isNaN(level) || level < 0 || level > 3);

    if (level == 3) {
        level = casualNumber(0, 2);
        alert("Modalità casuale, difficoltà: " + level);
    };
    
    if (level == 0) {
        return 100
    } else if (level == 1) {
        return 80
    } else if (level == 2)  {
        return 50
    };
};

function game (difficult) {
    var bombArray = [];
    var attemptsArray = [];
    var cells = difficult;
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

    scoreArray.push(score);

    do {
    var questionGame = prompt("Vuoi fare un'altra partita? SI / NO").trim().toLowerCase();
    } while (questionGame != "si" && questionGame != "no");

    questionGame == "si" ? replay = true : replay = false;

}; 