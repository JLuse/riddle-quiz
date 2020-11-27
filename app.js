/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What can travel around the world while staying in a corner?',
      answers: [
        'An Email',
        'Words',
        'A Stamp',
        'A Globe'
      ],
      correctAnswer: 'A Stamp',
      correctImg: 'images/stamp.jpg'
    },
    {
      question: 'You throw away the outside and cook the inside. Then you eat the outside and throw away the inside. What did you eat?',
      answers: [
        'Ear of Corn',
        'Potato',
        'Banana',
        'Pistachios'
      ],
      correctAnswer: 'Ear of Corn', // Throw away the husk, cook the kernel, eat the kernel, and throw away the cob
      correctImg: 'images/corn.jpg'
    },
    {
      question: 'I feather and run but am not a bird. I bleed but never lived. What am I?',
      answers: [
        'A River',
        'Ink',
        'An Arrow',
        'Machine'
      ],
      correctAnswer: 'Ink', // Ink can bleed and run, also used on a qwil
      correctImg: 'images/ink.jpg'
    },
    {
      question: 'If I have a bee in my hand, what is in my eye?',
      answers: [
        'Hope',
        'A Stinger',
        'Beauty',
        'Pistachios'
      ],
      correctAnswer: 'Beauty', //  (BEAUTY is in the EYE of the bee-holder)
      correctImg: 'images/beauty.jpg'
    },
    {
      question: 'You get me when you park in a place off limits. I live in a swamp. I\'m the one who ribbits.',
      answers: [
        'Frog',
        'Parking Ticket',
        'Towed',
        'Flat Tire'
      ],
      correctAnswer: 'Towed', //  Toad
      correctImg: 'images/towed.jpg'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  currentQuestion: 0
};
/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/***************************************************/
/********** TEMPLATE GENERATION FUNCTIONS **********/
/***************************************************/
// These functions return HTML templates

function generateIntroHtmlText() {
  return $('main').html(
  `
  <div class="intro">
    <h2>Welcome to Riddle Me This</h2>
    <form class="intro-form">
      <label for="get-started">Shall we get started?</label>
      <button type="submit">Lets do it</button>
    </form>
  </div>
  `
  )
}

// A function render all the other quiz pages (include argument)
function generateRiddle(currentQuestion) {
  return $('main').html(
  // console.log(currentQuestion);
  `
  <div class="question-container">
    <div class="current-container">
      <div class="current-question-num">Question ${store.currentQuestion + 1} out of ${store.questions.length}</div>
      <div class="question-score-seperator"> : </div>
      <div class="current-score"> Score - ${store.score} out of ${store.questions.length} </div>
    </div>
    <div class="promt-question">
      <div class="current-question">${currentQuestion.question}</div>
      <form class="answers-form">
        ${generateAnswers(currentQuestion)}
      </form>
  </div>
  `
  )
}

function generateAnswers(currentQuesion) {
  const currentQuestionAnswers = currentQuesion.answers.map(answer =>  `<button class="answer-buttons">${answer}</button>`)
  const currentAnswersString = currentQuestionAnswers.join('');
  // console.log(currentAnswersString);
  return currentAnswersString;
}

function generateCorrectResult() {
  return  `
  <div class="answer">Correct! The answer was: <strong>${store.questions[store.currentQuestion].correctAnswer}</strong>
  <img src="${store.questions[store.currentQuestion].correctImg}" alt="Image of ${store.questions[store.currentQuestion].correctAnswer}" width="500" height="500">
  </div>
  <form class="answers-form">
      <button class="next-button">Next</button>
  </form>
  `;
}

function generateIncorrectResult() {
  return  `
  <div class="answer">Sorry! The correct answer was: <strong>${store.questions[store.currentQuestion].correctAnswer}</strong>
  <img src="${store.questions[store.currentQuestion].correctImg}" alt="Image of ${store.questions[store.currentQuestion].correctAnswer}" width="500" height="500">
  </div>
  <form class="answers-form">
      <button class="next-button">Next</button>
  </form>
  `;
}

function generateFinalResults() {
  return  `
  <div class="final-results">You scored ${store.score} out of ${store.questions.length}</div>
  <form class="answer-form">
      <button class="reset-button">Restart Quiz?</button>
  </form>
  `;
}

/****************************************/
/********** RENDER FUNCTION(S) **********/
/****************************************/
function startQuiz() {
  store.quizStarted = true;
}


// NEED TO MAKE A SINGLE RENDER FUNCTION
function render() {
  let currentQuestion = store.questions[store.currentQuestion]

  if (store.quizStarted) {
    if (store.currentQuestion === store.questions.length) {
     return generateFinalResults();
    }
    generateRiddle(currentQuestion);
    // checkAnswerSubmit();
    if (checkAnswerSubmit()) {
      
      // console.log("That is correct!")
      store.score++
      generateCorrectResult();
    } else {
      // console.log("WRONG!")
      generateIncorrectResult();
    }
  } else {
    generateIntroHtmlText();
  }

}

/*********************************************/
/********** EVENT HANDLER FUNCTIONS **********/
/*********************************************/
// These functions handle events (submit, click, etc)

function handleQuizBeginsSubmit() {
  // when the user clicks the button this is where we handle the beging
  $('.intro-form').on('submit', e => {
    e.preventDefault();
    startQuiz();
    render();
  })
}

// TODO: This will likely need to be changed to anctual next button after selection your answer
function checkAnswerSubmit() {
  let correct = false;
  $('main').on('click', '.answer-buttons', e => {
    e.preventDefault();

    let correctAnswer = store.questions[store.currentQuestion].correctAnswer;
    correct = correctAnswer === e.currentTarget.innerHTML

    console.log(correct);

    return correct;
  })
}

function handleNextQuestonSubmit() {
  $('main').on('click', '.next-button', e => {
    e.preventDefault();
    store.currentQuestion++
    render();
  })
}


// launch all functions after page loads
function handleQuiz() {
  render();
  handleQuizBeginsSubmit();
  // checkAnswerSubmit();
  handleNextQuestonSubmit();
}

$(handleQuiz);