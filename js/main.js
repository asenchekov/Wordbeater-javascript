// // window.addEventListener('load', init);
// const appID = 'f62f4455';
// const appKey = 'bcdf960119082f9f9619017f183df110';
// const Http = new XMLHttpRequest();
// Http.withCredentials = true;
// let data = null;
// const url=' http://randomword.setgetgo.com/';
// Http.addEventListener("readystatechange", function () {
//     if (this.readyState === 4) {
//       console.log(this.responseText);
//     }
//   });
// Http.open("GET", url);
// Http.setRequestHeader("app_id", appID);
// Http.setRequestHeader("app_key", appKey);
// Http.setRequestHeader("cache-control", "no-cache");
// Http.setRequestHeader("Access-Control-Allow-Origin", "*");
// // Http.setRequestHeader("Postman-Token", "5a5483de-d983-4926-969e-4e26d3bc91f1");
// Http.send(data);
// // Http.onreadystatechange=(e)=>{
// // console.log(Http.responseText)
// // }

// Globals
let time;
let score = 0;
let isPlaying;

// Available Levels
const level = {
    easy: 5,
    medium: 3,
    hard: 1
}
// TO change level
const selectedLevel = document.querySelector('#currentLevel');
let currentLevel = level[selectedLevel.value];
selectedLevel.addEventListener('change', () =>{
    currentLevel = level[selectedLevel.value];
    seconds.innerHTML = currentLevel;
    // time = currentLevel;
    wordInput.value = '';
});

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
seconds.innerHTML = currentLevel;
wordInput.disabled = true;


const words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition'
];

// Initialize Game
function init() {
    wordInput.disabled = false;
    wordInput.focus();
    wordInput.placeholder = 'Write....';
    time = currentLevel + 1;
    wordInput.value = '';
    message.innerHTML = 'Start!!!'
    //Show number of seconds in UI
    seconds.innerHTML = currentLevel;
    // Load word from array
    showWord(words);
    //Start matching on word input
    wordInput.addEventListener('input', startMatch);
    startMatch();
    // Call countdown every second
    setInterval(countdown, 1000);
    //Check game status
    setInterval(checkStatus, 50);
}

//Start match
function startMatch() {
    if(matchWords()) {
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
    }

    // If the score is -1, display 0
    if(score === -1) {
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;
    }
}

//Match currentWord to wordInput
function matchWords() {
    if(wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Correct';
        return true;
    } else {
        message.innerHTML = '';
        return false;
    }        
}

// Pick and show random word
function showWord(words) {
    // Generate random array index
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord.innerHTML = words[randomIndex];
}

// Countdown timer
function countdown() {
   // Make sure time is not run out
   if(time > 0) {
       //Decrement
       time--;
   } else if(time === 0) {
       //Game Over
       isPlaying = false;
   }
   //Show time
   timeDisplay.innerHTML = time;
}

//Check game status
function checkStatus() {
    if(!isPlaying && time === 0) {
     message.innerHTML = 'Game Over!!!';
     score = -1;   
    }
}