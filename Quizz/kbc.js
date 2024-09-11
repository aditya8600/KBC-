// List of prizes from ₹1,000 up to ₹7 crore
const prizes = [
    "₹1,000", "₹2,000", "₹3,000", "₹5,000", "₹10,000",
    "₹20,000", "₹40,000", "₹80,000", "₹1,60,000", "₹3,20,000",
    "₹6,40,000", "₹12,50,000", "₹25,00,000", "₹50,00,000", "₹7,00,00,000"
];

// List of questions, options, and the correct answers
const questions = [
    {
        question: "Which CSS property controls the text size?",
        options: ["font-style", "font-size", "text-size", "text-style"],
        answer:1

    },
    {
        question: "How to write an IF statement in JavaScript?",
        options: ["if i=5 then", "if(i==5)", "if i =5", "if i ==5 then"],
        answer: 1
    },
    {
        question: "How to write an IF statement for executing some code if i is NOT equal to 5?",
        options: ["if(i!=5)", "if(i<>5)", "if i<>5", "if i=!5 then"],
        answer: 0
    },
    {
        question: "Which of the following is an advantage of using JavaScript?",
        options: ["Less Server Interaction","Immediate feedback to visitors","Increased interactivity","All of the above"],
        answer:3
    },
    {
        question:"Which of the following code creates an object?",
        options:["var book = Object()","var book = new Object()","var book = new OBJECT()","var book = new Book();"],
        answer:1
    },
    {
        question:"Which event occurs when the user clicks on an HTML element?",
        options:["onclick","onchange","onmouseclick","onmouseover"],
        answer:0
    },
    {
        question:"Which operator is used to assign a value to a variable?",
        options:["-","=","*","x"],
        answer:1
    },
    {
        question:"What does CSS stand for?",
        options:["Colorful Style Sheets","Cascading Style Sheet","Creative Style Sheet","Computer Style Sheet"],
        answer:1
    },
    {
        question:"Which HTML tag is used to define an internal style sheet?",
        options:["<style>","<script>","<css>","None Of the Above"],
        answer:0
    },
    {
        question:"Which property is used to change the background color?",
        options:["color","background-color","bgcolor","None of the Above"],
        answer:1
    },
    {
        question:"Which CSS property is used to change the text color of an element?",
        options:["fgcolor","color","text-color","None of the Above"],
        answer:2
    },
    {
        question:""
    }
    // Add more questions here (you can have 15 questions)
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30; // Initial timer
let timerInterval;

// Function to start the game
function startGame() {
    document.getElementById('mp').play()
    loadQuestion();  // Load the first question
    startTimer();    // Start the timer for the question
    displayPrizes(); // Show the prize list on screen
    // document.getElementById('gh').style.display="none"
}

// Function to load and display the current question
function loadQuestion() {
    const questionEl = document.getElementById('question');
    const optionsEl = document.querySelectorAll('.option-btn');

    // Set the current question and options
    questionEl.innerHTML = questions[currentQuestionIndex].question;
    optionsEl.forEach((btn, index) => {
        btn.innerHTML = questions[currentQuestionIndex].options[index];
        btn.style.backgroundColor = ''; // Reset button color
        btn.disabled = false;           // Enable buttons for the current question
    });

    // Hide the 'Next Question' button initially
    document.getElementById('next-btn').style.display = 'none';
}

// Function to display the list of prizes
function displayPrizes() {
    const prizeListEl = document.getElementById('prize-list');
    prizeListEl.innerHTML = ''; // Clear the prize list before updating

    // Loop through the prizes and display them
    prizes.forEach((prize, index) => {
        const li = document.createElement('li');
        li.innerText = prize;

        // Highlight the current prize for the active question
        if (index === currentQuestionIndex) {
            li.classList.add('highlight');
        }

        prizeListEl.appendChild(li);
    });
}

// Function to check if the selected answer is correct
function checkAnswer(selectedOptionIndex) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const optionsEl = document.querySelectorAll('.option-btn');

    // Check if the selected answer is correct
    if (selectedOptionIndex === correctAnswer) {
        score++;
        document.getElementById('score').innerText =` Score: ${score}`;
        optionsEl[selectedOptionIndex].style.backgroundColor = 'green'; // Correct answer
    } else {
        optionsEl[selectedOptionIndex].style.backgroundColor = 'red';   // Incorrect answer
        optionsEl[correctAnswer].style.backgroundColor = 'green'; 
        endGame();      // Highlight correct answer
    }

    // Disable all buttons after the answer is selected
    optionsEl.forEach(btn => btn.disabled = true);

    clearInterval(timerInterval); // Stop the timer after answering
    document.getElementById('next-btn').style.display = 'block'; // Show 'Next Question' button
}

// Function to move to the next question
function nextQuestion() {
    currentQuestionIndex++;

    // Check if there are more questions, or end the game
    if (currentQuestionIndex < questions.length) {
        adjustTimer();  // Adjust the timer for the next question
        loadQuestion(); // Load the next question
        startTimer();   // Start the timer again
        displayPrizes();// Update the prize list
    } else {
        endGame(); // End the game if there are no more questions
    }
}

// Function to start the timer
function startTimer() {
    adjustTimer(); // Adjust the timer based on the question number
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Time Left: ${timeLeft}`;

        // Check if the time has run out
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            checkAnswer(-1); // If time runs out, it's considered a wrong answer
        }
    }, 1000);
}

// Function to adjust the timer based on the question number
function adjustTimer() {
    if (currentQuestionIndex < 5) {
        timeLeft = 30; // 30 seconds for the first 5 questions
    } else if (currentQuestionIndex < 10) {
        timeLeft = 45; // 45 seconds for questions 6-10
    } else {
        timeLeft = 60; // 60 seconds for questions 11-15
    }
    document.getElementById('timer').innerText = `Time Left: ${timeLeft}`;
}

// Function to end the game
function endGame() {
    const que=document.getElementById('question-container')
    que.innerHTML =`<h2  >Game Over! You won: ${prizes[currentQuestionIndex - 1]}</h2>.`;
    que.style.color='red';
    document.getElementById('next-btn').style.display = 'none';
}

// Start the game when the page loads
window.onload = startGame;