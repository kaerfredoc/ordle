const randomWord = generateWord();
let currentRow = 0;    

function loadApp() {
    document.getElementById('userGuess').focus();
//    changeTitle();
    displayLetters();
    document.querySelector('#userGuess').addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
            handleSubmit();
        }
    });
}

function handleSubmit() {
    const guess = document.getElementById('userGuess').value;
    if (!isWordValid(guess)) {
        alert("Enter a Valid Word")
        return;
    } else {
        for (let i=0;i<5;i++) {
            document.getElementById('cell'+currentRow+i).innerText = guess[i].toUpperCase();
            document.getElementById('letter'+guess[i].toUpperCase()).classList.add("greyLetter");
        }
        document.getElementById('userGuess').value = '';
    }
    
    // We have a valid word, check letters
    let testChars = randomWord.split('');
    let guessChars = guess.split('');
    for (let cnt = 0; cnt<5; cnt++) {
        //Check green
        if(testChars[cnt]===guessChars[cnt]) {
            document.getElementById('cell'+currentRow+cnt).classList.add("greenLetter");
            testChars[cnt] = '';
            guessChars[cnt] = '';
        }
    }
    
    //Check yellow
    for (let idx = 0; idx<5; idx++) {
        let currentLetter = guessChars[idx];
        if(testChars.indexOf(currentLetter) !== -1) {
            document.getElementById('cell'+currentRow+idx).classList.add("yellowLetter");
            testChars[testChars.indexOf(currentLetter)] = '';
            guessChars[guessChars.indexOf(currentLetter)] = '';
        }
    }

    // Exact match or game over
    if(randomWord===guess || currentRow===5) {
        document.getElementById('guessSection').style.display = 'none'
        document.getElementById('resetSection').style.display = 'block'
        setTimeout(function() {
            if(randomWord===guess) {
                alert("Winner!")
            } else {
                alert("Game Over\n" + "Word was: " + randomWord.toUpperCase())
            }      
        },10)
        return
    }

    currentRow++;
    document.getElementById('userGuess').focus();
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateWord() {
    const idx = randomIntFromInterval(0, (answerList.length-1));
    return answerList[idx];
}

function changeTitle() {
    document.getElementById('title').innerText = randomWord;
}

function displayLetters() {
    for(let i=65;i<91;i++) {
        let curLetter = String.fromCharCode(i);
        document.getElementById('letters').innerHTML +=
            "<span class='letterBox' id='letter"+curLetter+"'>"+curLetter+"</span>";
    }
}

function isWordValid(guess) {
    if (wordList.indexOf(guess.toLowerCase()) === -1) {
        return false;
    }
    else return true;
} 