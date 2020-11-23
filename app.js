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
      correctAnswer: 'A Stamp'
    },
    {
      question: 'You throw away the outside and cook the inside. Then you eat the outside and throw away the inside. What did you eat?',
      answers: [
        'Ear of Corn',
        'Potato',
        'Banana',
        'Pistachios'
      ],
      correctAnswer: 'Ear of Corn' // Throw away the husk, cook the kernel, eat the kernel, and throw away the cob
    },
    {
      question: 'I feather and run but am not a bird. I bleed but never lived. What am I?',
      answers: [
        'A River',
        'Ink',
        'An Arrow',
        'Machine'
      ],
      correctAnswer: 'Ink' // Ink can bleed and run, also used on a qwil
    },
    {
      question: 'If I have a bee in my hand, what is in my eye?',
      answers: [
        'Hope',
        'A Stinger',
        'Beauty',
        'Pistachios'
      ],
      correctAnswer: 'Beauty' //  (BEAUTY is in the EYE of the bee-holder)
    },
    {
      question: 'You get me when you park in a place off limits. I live in a swamp. I\'m the one who ribbits.',
      answers: [
        'Frog',
        'Parking Ticket',
        'Towed',
        'Flat Tire'
      ],
      correctAnswer: 'Towed' //  Toad
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

// An intro function

function generateIntroHtmlText() {
  return `
  <div class="intro">
    <h2>Welcome to your Riddle Me this</h2>
    <form class="intro-form">
      <label for="get-started">Lets Get Started</label>
      <button type="submit">Lets Get Started</button>
    </form>
  </div>
  `;
}

// A function render all the other quiz pages (include argument)
function generateRiddle() {
  let currentQuestion = store.questions[store.currentQuestion]
  // console.log(currentQuestion);
  return `
  <div class="question-container">
    <div class="current-question">Question ${store.currentQuestion + 1} / ${store.questions.length}</div>
    <div class="correct-question">You have ${store.score} out of ${store.questions.length} correct so far</div>
    <div class="promt-question">${currentQuestion.question}<div>
    <form class="answers-form">
      ${generateAnswers(currentQuestion)}
    </form>
  </div>
  `;
}

function generateAnswers(currentQuesion) {
  const currentQuestionAnswers = currentQuesion.answers.map(answer =>  `<button class="answer-buttons">${answer}</button>`)
  const currentAnswersString = currentQuestionAnswers.join('');
  // console.log(currentAnswersString);
  return currentAnswersString;
}

function generateCorrectResult() {
  return  `
  <div class="answer">The answer was ${store.questions[store.currentQuestion].correctAnswer}</div>
  <form class="answer-form">
      <button class="next-button">Next</button>
  </form>
  `;
}

function generateIncorrectResult() {
  return  `
  <div class="answer">Sorry the correct answer was ${store.questions[store.currentQuestion].correctAnswer}</div>
  <form class="answer-form">
      <button class="next-button">Next</button>
  </form>
  `;
}

function generateFinalResults() {
  return  `
  <div class="final-results">You ended with ${store.score} out of ${store.questions.length}</div>
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
  // console.log("Inside startQuiz()")
}

function renderIntro() {
  $('main').html(generateIntroHtmlText)
}

function renderRiddles() {
  $('main').html(generateRiddle());
}

function renderCorrectResult() {
  $('main').html(generateCorrectResult());
}

function renderInccorectResult() {
  $('main').html(generateIncorrectResult());
}

function renderFinalresults() {
  $('main').html(generateFinalResults());
}

// function currentQuestion() {
//   let questionIndex = store.questionNumber;
//   let questionObj = store.questions[questionIndex];
//   return {
//     questionIndex: questionIndex += 1,
//     question: questionObj
//   };
// }


// This function conditionally replaces the contents of the <main> tag based on the state of the store
function renderQuiz() {
  if (store.currentQuestion === store.questions.length) {
    console.log("YOURE AT THE END - TODO: Render results page");
    renderFinalresults();
  }
  // check if quiz is started
  if (store.quizStarted === false) {
    renderIntro();
    // console.log(store.quizStarted + " - Quiz is initally false, in renderQuiz()");
  } else if (store.quizStarted === true) {
    // console.log(store.quizStarted + " - The Button has been pressed inside RenderQuiz");
    renderRiddles();
  }
}

// create a function to find the currentQuestion of the store array



/*********************************************/
/********** EVENT HANDLER FUNCTIONS **********/
/*********************************************/

// These functions handle events (submit, click, etc)

function handleQuizBeginsSubmit() {
  // when the user clicks the button this is where we handle the beging
  $('.intro-form').on('submit', e => {
    e.preventDefault();
    startQuiz();
    renderQuiz();
  })
}

// TODO: This will likely need to be changed to anctual next button after selection your answer
function checkAnswerSubmit() {
  $('main').on('click', '.answer-buttons', e => {
    e.preventDefault();
    let correctAnswer = store.questions[store.currentQuestion].correctAnswer;

    if (correctAnswer === e.currentTarget.innerHTML) {
      console.log("That is correct!")
      store.score++
      renderCorrectResult();
    } else {
      console.log("WRONG!")
      renderInccorectResult();
    }
    console.log(correctAnswer);
  })
}

function handleNextQuestonSubmit() {
  $('main').on('click', '.next-button', e => {
    e.preventDefault();
    store.currentQuestion++
    renderQuiz();
  })
}

// function handleIncorrectNextQuestonSubmit() {
//   $('main').on('click', '.incorrect-next-button', e => {
//     e.preventDefault();
//     store.currentQuestion++
//     renderQuiz();
//   })
// }


// launch all functions after page loads
function handleQuiz() {
  renderQuiz();
  handleQuizBeginsSubmit();
  checkAnswerSubmit();
  handleNextQuestonSubmit();
}

$(handleQuiz);