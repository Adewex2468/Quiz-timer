let quizData = [
    {
    questions: "What is the difference between div and span in HTML?",
    choices: ["A div is an inline elements while a span is a block element", 
              "A div is a block element while a span is an inline element", 
              "All of the above", 
              "None of the above"
            ],
    correctAnswer: 1,
    },
    {
        questions: "How do you an hyperlink that opens in a new tab?",
        choices: ["Use target='_self'", "Use target ='_parent'", "Use target = '_blank'", "Use target = '_top'"],
        correctAnswer: 2,
    },
    {
        questions: "What is the differences between inline, block and inline-block element?",
        choices: ["Block elements start on a new line, while inline element stays on the same line, and inline-block element behave like inline but allows width and height",
            "Inline elements start on a new line, while block element stays on the same line, and inline-block element behave like inline but allows width and height",
            "All of the above",
            "None of the above",
        ],
        correctAnswer: 0,
    },
    {
        questions: "What is the difference between class and id attributes?",
        choices: ["A class is not reusable while an id is reusable", 
                  "A class can contain one element while an id can contain more element", 
                  "A class is reusable and can apply to many elements while an id is unique it is used once per page",
                  "None of the above",
        ],
        correctAnswer: 2,
    },
    {
        questions: "How do you embed an image in HTML and make it clickable?",
        choices: ["Wrap the <img> inside an <a>", 
                  "Wrap the <img> inside a <p>",
                  "Wrap the <img> inside a <button>", 
                  "Wrap the <img> inside a <ul>",
        ],
        correctAnswer: 1,
    },
    {
        questions: "What is the differences between inline css, internal css, and external css",
        choices: ["Inline css is style inside the html tag, while internal css is style inside an head tag and external css is linked with a link tag",
                  "Internal css is style inside the html tag, while inline css is style inside an head tag and external css is linked with a link tag",
                  "Inline css is style inside the html tag, while external css is style inside an head tag and internal css is linked with a link tag",
                  "None of the above",
        ],
        correctAnswer: 0,
    },
    {
        questions: "What is the difference between em, rem, % and px",
        choices: ["px is a relative element to the parent, while rem is the fixed size, and % is the relative parent to the font-size, and em is the root of the parent",
                  "px is a fixed size, while % is relative to the parent element, and em is relative to the parent's font-size and rem is relative to the root of the parent element",
                  "None of the above",
                  "A only",
        ],
        correctAnswer: 1,
    },
    {
        questions: "How do you center a div",
        choices:["By using a display flex", 
                 "By using a display grid", 
                 "By using a display inline",
                 "By using a display inline-block"
        ],
        correctAnswer: 0,
    },
    {
        questions: "What is the differences between CSS Flexbox and CSS Grid",
        choices: ["Flexbox is two-dimensional and Grid is two-dimensional", 
                  "Flexbox is two-dimensional while Grid is one-dimensional",
                  "Flexbox is one-dimensional while Grid is two-dimensional",
                  "None of the Above",
        ],
        correctAnswer: 2,
    },
    {
        questions: "What is differences between color and background-color?",
        choices: ["Color is used to style the element of a text while background-color is specifies the background color of an element",
                  "They are both the same",
                  "None of the above",
                  "I dont know",
        ],
        correctAnswer: 0,
    },
];
let quizQuestion = document.getElementById("quiz-question");
let quizNumbers = document.getElementById("numbers");
let questionElement = document.getElementById("question");
let questionContainer = document.getElementById("question-container");
let choicesElement = document.getElementById("choices");
let timeSeconds = document.getElementById("time");
let submitBtn = document.getElementById("submit-btn");
let resultElement = document.getElementById("result");

let currentQuestion = 0;
let score = 0;
let numbers = 1;
let timerleft = 20;
let timer;
timeSeconds == timerleft;
function showQuestion(){
    const count = `<p>${numbers} out of ${quizData.length}</p>`;
    quizNumbers.innerHTML = count;
    const{questions, choices} = quizData[currentQuestion];
    questionElement.textContent = questions;
    choicesElement.innerHTML = "";
    choices.forEach((choice, index)=>{
        const button = document.createElement('button');
        button.textContent = choice;
        button.addEventListener("click", ()=> selectChoice(index));
        choicesElement.appendChild(button);
    });
    startQuiz();

}
function selectChoice(index){
    [...choicesElement.children].forEach((button)=>{
        button.classList.remove("selected");
    })
    choicesElement.children[index].classList.add('selected')
}
showQuestion();

submitBtn.addEventListener('click',  sumbitAnswer);

function sumbitAnswer(){
    const selectedButton = document.querySelector(".selected");
    if(!selectedButton) return;
    const selectedIndex = [...choicesElement.children].indexOf(selectedButton);
    if(selectedIndex === quizData[currentQuestion].correctAnswer){
        score++

    } 
    currentQuestion++;
    numbers++;

    if(currentQuestion < quizData.length){
        showQuestion();
    }else{
        showResult();
    }
}

function showResult(){
    questionContainer.style.display = "none";
    submitBtn.style.display = "none";
    const resultHTML = `<p class="score">You scored: ${Math.round(score*100/quizData.length)}%
    (${score} out of ${quizData.length})
    </p>`;
    resultElement.innerHTML = resultHTML;

}
function startQuiz(){
  timer = setInterval(()=>{
        timerleft--;
        timeSeconds.textContent = timerleft;
        if(timerleft <= 0){
            clearInterval(timer);
            showResult();
        }else{
            endQuiz();
        }
    }, 1000);
}

function endQuiz(){
    clearInterval(timer);
    timerleft.textContent = '0';
}