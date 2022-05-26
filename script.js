// grabbing all buttons from the dom
const start_button = document.getElementById("startbut");
const question_DOM = document.getElementById("question");
const next_button = document.getElementById("next");
const submit_button = document.getElementById("sub");
const play_button = document.getElementById("play");
const clear_button = document.getElementById("clear")

const button_1 = document.getElementById("but1"),
      button_2 = document.getElementById("but2"),
      button_3 = document.getElementById("but3"),
      button_4 = document.getElementById("but4");


//   an array of objects representing each question and their answers
const questions = [
    {
        question: 'Commonly used data types Do Not include:',
        answers: [
        { text: 'strings', correct: false },
        { text: 'booleans', correct: false },
        { text: 'alerts', correct: true },
        { text: 'numbers', correct: false },
        ]
    },
    {
        question: 'The condition in a if/else statment is enclosed with ____.',
        answers: [
        { text: 'tags', correct: false },
        { text: 'curly brackets', correct: false },
        { text: 'parenthesis', correct: true },
        { text: 'square brackets', correct: false }
        ]
    },
    {
        question: 'Arrays in Javascript can be used to store ____.',
        answers: [
        { text: 'numbers and strings', correct: false },
        { text: 'other arrays', correct: false },
        { text: 'booleans', correct: false },
        { text: 'all of the above', correct: true }
        ]
    },
    {
        question: 'String values must be enclosed within ___ when being assigned to variables.',
        answers: [
        { text: 'commas', correct: false },
        { text: 'curly brackets', correct: false },
        { text: 'quotes', correct: true },
        { text: 'none of the above', correct: false },
        ]
    },
    {
        question: 'A very usefull tool used during development and debugging for printing content to the debugger is',
        answers: [
            { text: 'javascript', correct: false },
            { text: 'terminal/bash', correct: false },
            { text: 'for loops', correct: true },
            { text: 'console.log', correct: false },
        ]
    }
];


let questionIndex = 0;
let time = 30;
let score = 0;

// function that will begin the clock
function beginTimer(){
    let timer = setInterval(()=>{
        time -= 1;
        document.getElementById("time").innerText = time;

        if(time == 0){
            clearInterval(timer);
            document.getElementById("score-co").style.display = "none";
            document.getElementById("fin").style.display = "block";
            document.getElementById("q-box").style.display = "none";
            document.getElementById("intro").style.display = "none";
        }
    }, 1000)
}

// function that will hide the begin game div and display the first question
function startGame(){
    document.getElementById("intro").style.display = "none";
    document.getElementById("q-box").style.display = "block";

    question_DOM.innerText = questions[questionIndex].question;
    button_1.innerText = questions[questionIndex].answers[0].text;
    button_2.innerText = questions[questionIndex].answers[1].text;
    button_3.innerText = questions[questionIndex].answers[2].text;
    button_4.innerText = questions[questionIndex].answers[3].text;

    beginTimer();
}

// function that will check if the answer is correct and add to the score
function checkAnswers (event){
    const user_answer = event.target.innerText;

    if(user_answer == 'alerts' || user_answer == 'parenthesis' || user_answer == 'all of the above' || user_answer == 'quotes' || user_answer == 'for loops'){
        event.target.style.backgroundColor = "green";
        score += 1;
    } else {
        event.target.style.backgroundColor = "red";
    }
}

// function that will set the next question when button is clicked
function nextQuestion (event){
    questionIndex += 1;

    button_1.style.backgroundColor = "darkblue";
    button_2.style.backgroundColor = "darkblue";
    button_3.style.backgroundColor = "darkblue";
    button_4.style.backgroundColor = "darkblue";

    document.getElementById("final-score").innerText = score;

    if(questionIndex == 5){
        document.getElementById("q-box").style.display = "none";
        document.getElementById("fin").style.display = "block";
    } else {
        question_DOM.innerText = questions[questionIndex].question;
        button_1.innerText = questions[questionIndex].answers[0].text;
        button_2.innerText = questions[questionIndex].answers[1].text;
        button_3.innerText = questions[questionIndex].answers[2].text;
        button_4.innerText = questions[questionIndex].answers[3].text;
    }
}

// function that will display the end screen and send data to the dashboard and local storage
function endScreen(event){

    const initals = document.getElementById("intal").value;

    if (initals == ""){
        alert("please enter valid initals")
    } else {
        document.getElementById("fin").style.display = "none";
        document.getElementById("score-co").style.display = "block";
        let data = {
            name: initals,
            score: score
        }
        localStorage.setItem("scoreboard", JSON.stringify(data));
        let record = document.createElement("h2");
        record.innerText = `${data.name} - ${data.score}`;
        document.getElementById("score-container").appendChild(record);
    }
}

// function that will start the game all over again
function playAgain(){
    document.getElementById("score-co").style.display = "none";
    document.getElementById("fin").style.display = "none";
    document.getElementById("q-box").style.display = "none";
    document.getElementById("intro").style.display = "block";

    location.reload();

    score = 0;
    questionIndex = 0;
    time = 30;
}

// clears the score
function clearScore(){
    document.getElementById("score-container").innerHTML = "";
}


document.getElementById("score").addEventListener("click", ()=>{
    document.getElementById("score-co").style.display = "block";
    document.getElementById("fin").style.display = "none";
    document.getElementById("q-box").style.display = "none";
    document.getElementById("intro").style.display = "none";
})


// all buttons will envoke the functions above
start_button.addEventListener('click', startGame);
button_1.addEventListener("click", checkAnswers);
button_2.addEventListener("click", checkAnswers);
button_3.addEventListener("click", checkAnswers);
button_4.addEventListener("click", checkAnswers);
next_button.addEventListener("click", nextQuestion);
submit_button.addEventListener("click", endScreen);
play_button.addEventListener("click", playAgain);
clear_button.addEventListener("click", clearScore);
