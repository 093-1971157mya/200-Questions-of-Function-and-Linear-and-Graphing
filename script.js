/* =========================================================
   GED MATHEMATICS TEST
   200 QUESTIONS
   FUNCTIONS
   LINEAR EQUATIONS
   GRAPHING

   30 QUESTIONS PER TEST
   45 MINUTES
   PRACTICE + EXAM MODE
========================================================= */


const TOTAL_QUESTIONS = 30;

const TIME_LIMIT = 45 * 60;

const EXAM_STORAGE_KEY =
  "GED_MATH_EXAM_SUBMITTED_V1";


let questionBank = [];

let examQuestions = [];

let studentAnswers = [];

let currentQuestion = 0;

let timeLeft = TIME_LIMIT;

let timer = null;

let studentName = "";

let testMode = "practice";


/* =========================================================
   HELPER
========================================================= */

function shuffle(array) {

  const copy = [...array];

  for (
    let i = copy.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random() * (i + 1)
      );

    [
      copy[i],
      copy[j]
    ] =
      [
        copy[j],
        copy[i]
      ];
  }

  return copy;
}


/* =========================================================
   ADD QUESTION
========================================================= */

function addQuestion(
  topic,
  question,
  choices,
  correctAnswer,
  explanation,
  visual = ""
) {

  questionBank.push({

    topic,

    question,

    choices,

    correctAnswer,

    explanation,

    visual

  });

}


/* =========================================================
   GRAPH GENERATOR
========================================================= */

function createGraph(
  slope,
  intercept
) {

  const width = 360;

  const height = 240;

  const left = 30;

  const top = 15;

  const plotWidth = 300;

  const plotHeight = 200;


  function xPixel(x) {

    return (
      left +
      ((x + 10) / 20) *
      plotWidth
    );

  }


  function yPixel(y) {

    return (
      top +
      ((10 - y) / 20) *
      plotHeight
    );

  }


  let grid = "";


  for (
    let x = -10;
    x <= 10;
    x += 2
  ) {

    grid += `
      <line
        x1="${xPixel(x)}"
        y1="${top}"
        x2="${xPixel(x)}"
        y2="${top + plotHeight}"
        stroke="#ddd"
      >
      </line>
    `;

  }


  for (
    let y = -10;
    y <= 10;
    y += 2
  ) {

    grid += `
      <line
        x1="${left}"
        y1="${yPixel(y)}"
        x2="${left + plotWidth}"
        y2="${yPixel(y)}"
        stroke="#ddd"
      >
      </line>
    `;

  }


  grid += `
    <line
      x1="${xPixel(0)}"
      y1="${top}"
      x2="${xPixel(0)}"
      y2="${top + plotHeight}"
      stroke="#333"
      stroke-width="2"
    >
    </line>
  `;


  grid += `
    <line
      x1="${left}"
      y1="${yPixel(0)}"
      x2="${left + plotWidth}"
      y2="${yPixel(0)}"
      stroke="#333"
      stroke-width="2"
    >
    </line>
  `;


  const x1 = -10;

  const x2 = 10;

  const y1 =
    slope * x1 + intercept;

  const y2 =
    slope * x2 + intercept;


  return `

    <svg
      width="${width}"
      height="${height}"
      viewBox="0 0 ${width} ${height}"
    >

      ${grid}

      <line
        x1="${xPixel(x1)}"
        y1="${yPixel(y1)}"
        x2="${xPixel(x2)}"
        y2="${yPixel(y2)}"
        stroke="#2365aa"
        stroke-width="3"
      >
      </line>

    </svg>

  `;

}


/* =========================================================
   CREATE 200 QUESTIONS
========================================================= */

function createQuestionBank() {


  /* =======================================================
     FUNCTIONS
     70 QUESTIONS
  ======================================================= */


  for (
    let n = 1;
    n <= 70;
    n++
  ) {

    const type = n % 7;


    const a =
      (n % 6) + 1;


    const b =
      (n % 9) - 4;


    const x =
      (n % 7) - 3;


    const y =
      a * x + b;


    /* FUNCTION VALUE */

    if (type === 1) {

      addQuestion(

        "Functions",

        `If f(x) = ${a}x ${
          b >= 0 ? "+" : "−"
        } ${Math.abs(b)}, what is f(${x})?`,

        [

          `${y}`,

          `${y + 1}`,

          `${y - 1}`,

          `${-y}`

        ],

        0,

        `Substitute x = ${x}. 
        f(${x}) = ${a}(${x}) ${
          b >= 0 ? "+" : "−"
        } ${Math.abs(b)} = ${y}.`

      );

    }


    /* FUNCTION DEFINITION */

    else if (type === 2) {

      addQuestion(

        "Functions",

        "Which equation represents a function of x?",

        [

          `y = ${a}x + ${b}`,

          `x = y² + ${b}`,

          `x² + y² = ${a * a}`,

          `y² = x + ${b}`

        ],

        0,

        "A function gives exactly one output y for every input x."

      );

    }


    /* FUNCTION VALUE SQUARED */

    else if (type === 3) {

      const answer =
        x * x - (n % 5);


      addQuestion(

        "Functions",

        `For f(x) = x² − ${n % 5}, what is f(${x})?`,

        [

          `${answer}`,

          `${answer + 2}`,

          `${x * x + n % 5}`,

          `${x + n % 5}`

        ],

        0,

        `Square x first:
        ${x}² − ${n % 5} = ${answer}.`

      );

    }


    /* ORDERED PAIR */

    else if (type === 4) {

      const answer =
        2 * x - 3;


      addQuestion(

        "Functions",

        "Which ordered pair belongs to y = 2x − 3?",

        [

          `(${x}, ${answer})`,

          `(${x}, ${answer + 1})`,

          `(${x + 1}, ${answer})`,

          `(${x}, ${-answer})`

        ],

        0,

        `Substitute x = ${x}.
        y = 2(${x}) − 3 = ${answer}.`

      );

    }


    /* RANGE */

    else if (type === 5) {

      addQuestion(

        "Functions",

        "What is the range of {(-2,4), (-1,1), (0,0), (1,1), (2,4)}?",

        [

          "{0, 1, 4}",

          "{-2, -1, 0, 1, 2}",

          "{1, 2, 4}",

          "{0, 1, 2, 4}"

        ],

        0,

        "The range contains the y-values. Repeated values are written only once."

      );

    }


    /* TABLE */

    else if (type === 6) {

      addQuestion(

        "Functions",

        "Which table represents a function?",

        [

          "x: 1, 2, 3   y: 4, 5, 6",

          "x: 1, 1, 2   y: 4, 5, 6",

          "x: 2, 3, 2   y: 4, 5, 6",

          "x: 0, 0, 1   y: 2, 3, 4"

        ],

        0,

        "Each input x must have exactly one output y."

      );

    }


    /* Y INTERCEPT */

    else {

      addQuestion(

        "Functions",

        `What is the y-intercept of f(x) = ${a}x ${
          b >= 0 ? "+" : "−"
        } ${Math.abs(b)}?`,

        [

          `${b}`,

          `${a}`,

          `${-b}`,

          `${a + b}`

        ],

        0,

        "The y-intercept occurs when x = 0, so it is the constant term."

      );

    }

  }



  /* =======================================================
     LINEAR EQUATIONS
     70 QUESTIONS
  ======================================================= */


  for (
    let n = 71;
    n <= 140;
    n++
  ) {

    const type = n % 7;


    const a =
      (n % 7) + 2;


    const b =
      (n % 9) - 4;


    const x =
      (n % 7) - 3;


    const m =
      (n % 5) + 1;


    /* SOLVE */

    if (type === 1) {

      const constant =
        20;


      const right =
        a * x + constant;


      addQuestion(

        "Linear Equations",

        `Solve:
        ${a}x + ${constant} = ${right}`,

        [

          `${x}`,

          `${x + 1}`,

          `${x - 1}`,

          `${-x}`

        ],

        0,

        `Subtract ${constant} from both sides,
        then divide by ${a}. The answer is x = ${x}.`

      );

    }


    /* SUBSTITUTE */

    else if (type === 2) {

      const answer =
        m * x + 4;


      addQuestion(

        "Linear Equations",

        `If y = ${m}x + 4, what is y when x = ${x}?`,

        [

          `${answer}`,

          `${answer + 4}`,

          `${answer - m}`,

          `${-answer}`

        ],

        0,

        `Substitute x = ${x}:
        y = ${m}(${x}) + 4 = ${answer}.`

      );

    }


    /* SLOPE */

    else if (type === 3) {

      addQuestion(

        "Linear Equations",

        `What is the slope of
        y = ${m}x ${
          b >= 0 ? "+" : "−"
        } ${Math.abs(b)}?`,

        [

          `${m}`,

          `${b}`,

          `${-m}`,

          `${1 / m}`

        ],

        0,

        "In y = mx + b, m is the slope."

      );

    }


    /* EQUATION FROM SLOPE */

    else if (type === 4) {

      addQuestion(

        "Linear Equations",

        `Which equation has slope ${m}
        and y-intercept ${b}?`,

        [

          `y = ${m}x ${
            b >= 0 ? "+" : "−"
          } ${Math.abs(b)}`,

          `y = ${b}x + ${m}`,

          `y = -${m}x + ${b}`,

          `y = ${m} + ${b}x²`

        ],

        0,

        "Use slope-intercept form y = mx + b."

      );

    }


    /* WORD PROBLEM */

    else if (type === 5) {

      const price =
        (n % 9) + 2;


      const total =
        5 + 3 * price;


      addQuestion(

        "Linear Equations",

        `A service charges $5 plus $${price}
        per item. What is the cost of 3 items?`,

        [

          `$${total}`,

          `$${total + price}`,

          `$${total - 5}`,

          `$${3 * price}`

        ],

        0,

        `Cost = 5 + 3(${price}) = $${total}.`

      );

    }


    /* STANDARD FORM */

    else if (type === 6) {

      addQuestion(

        "Linear Equations",

        `Which equation is equivalent to
        ${a}x + ${a}y = ${a * 5}?`,

        [

          "x + y = 5",

          "x + y = 4",

          `${a}x + y = 5`,

          "x − y = 5"

        ],

        0,

        `Divide every term by ${a}.`

      );

    }


    /* X INTERCEPT */

    else {

      const intercept =
        -b / m;


      addQuestion(

        "Linear Equations",

        `What is the x-intercept of
        y = ${m}x ${
          b >= 0 ? "+" : "−"
        } ${Math.abs(b)}?`,

        [

          `(${intercept}, 0)`,

          `(0, ${b})`,

          `(${b}, 0)`,

          `(0, ${intercept})`

        ],

        0,

        "Set y = 0 and solve for x."

      );

    }

  }



  /* =======================================================
     GRAPHING
     60 QUESTIONS
  ======================================================= */


  for (
    let n = 141;
    n <= 200;
    n++
  ) {

    const type = n % 6;


    const slope =
      (n % 5) + 1;


    const intercept =
      (n % 7) - 3;


    const y =
      slope * 2 + intercept;


    /* GRAPH EQUATION */

    if (type === 1) {

      addQuestion(

        "Graphing",

        "Which equation matches the line shown?",

        [

          `y = ${slope}x ${
            intercept >= 0
              ? "+"
              : "−"
          } ${Math.abs(intercept)}`,

          `y = -${slope}x + ${intercept}`,

          `y = ${slope}x + ${
            Math.abs(intercept) + 1
          }`,

          `y = ${intercept}x + ${slope}`

        ],

        0,

        "The graph has the given slope and y-intercept.",

        createGraph(
          slope,
          intercept
        )

      );

    }


    /* Y INTERCEPT */

    else if (type === 2) {

      addQuestion(

        "Graphing",

        `A line has slope ${slope}
        and y-intercept ${intercept}.
        Which point lies on the line?`,

        [

          `(0, ${intercept})`,

          `(1, ${intercept + 2})`,

          `(2, ${intercept + slope + 1})`,

          `(-1, ${intercept + slope})`

        ],

        0,

        "The y-intercept is the point where x = 0.",

        createGraph(
          slope,
          intercept
        )

      );

    }


    /* SLOPE GRAPH */

    else if (type === 3) {

      addQuestion(

        "Graphing",

        "What is the slope of the line shown?",

        [

          `${slope}`,

          `${-slope}`,

          `${1 / slope}`,

          "0"

        ],

        0,

        `The line rises ${slope}
        units for every 1 unit to the right.`,

        createGraph(
          slope,
          0
        )

      );

    }


    /* Y VALUE */

    else if (type === 4) {

      addQuestion(

        "Graphing",

        "According to the graph,
        what is y when x = 2?",

        [

          `${y}`,

          `${y + 1}`,

          `${y - slope}`,

          `${-y}`

        ],

        0,

        `Substitute x = 2:
        y = ${slope}(2) + ${intercept}
        = ${y}.`,

        createGraph(
          slope,
          intercept
        )

      );

    }


    /* Y AXIS */

    else if (type === 5) {

      addQuestion(

        "Graphing",

        "What feature identifies the y-intercept?",

        [

          "Where the line crosses the y-axis",

          "Where the line crosses the x-axis",

          "The highest point",

          "The width of the graph"

        ],

        0,

        "The y-intercept is where the graph crosses the y-axis."

      );

    }


    /* NEGATIVE SLOPE */

    else {

      const negativeSlope =
        -slope;


      addQuestion(

        "Graphing",

        `Which statement describes
        y = ${negativeSlope}x + ${intercept}?`,

        [

          "The line decreases from left to right",

          "The line increases from left to right",

          "The line is horizontal",

          "The line is vertical"

        ],

        0,

        "A negative slope means the line decreases as x increases.",

        createGraph(
          negativeSlope,
          intercept
        )

      );

    }

  }

}


/* =========================================================
   START EXAM
========================================================= */

function startExam() {

  testMode =
    document.querySelector(
      'input[name="testMode"]:checked'
    ).value;


  /* EXAM MODE ONE SUBMISSION */

  if (
    testMode === "exam" &&
    localStorage.getItem(
      EXAM_STORAGE_KEY
    )
  ) {

    alert(
      "Exam Mode has already been submitted on this browser/device."
    );

    return;
  }


  studentName =
    document
      .getElementById(
        "studentName"
      )
      .value
      .trim();


  /* CREATE QUESTION BANK */

  if (
    questionBank.length === 0
  ) {

    createQuestionBank();

  }


  /*
    Select:
    10 Functions
    10 Linear Equations
    10 Graphing
  */


  const functions =
    shuffle(
      questionBank.filter(
        q =>
          q.topic ===
          "Functions"
      )
    ).slice(0, 10);


  const equations =
    shuffle(
      questionBank.filter(
        q =>
          q.topic ===
          "Linear Equations"
      )
    ).slice(0, 10);


  const graphing =
    shuffle(
      questionBank.filter(
        q =>
          q.topic ===
          "Graphing"
      )
    ).slice(0, 10);


  /*
    Shuffle the 30 selected
    questions.
  */


  examQuestions =
    shuffle([
      ...functions,
      ...equations,
      ...graphing
    ]);


  /*
    Shuffle answer choices.
  */


  examQuestions =
    examQuestions.map(
      question => {

        const choices =
          question.choices.map(
            (text, index) => ({

              text,

              correct:
                index ===
                question.correctAnswer

            })
          );


        return {

          ...question,

          choices:
            shuffle(choices)

        };

      }
    );


  studentAnswers =
    Array(TOTAL_QUESTIONS)
      .fill(null);


  currentQuestion = 0;

  timeLeft = TIME_LIMIT;


  /* CHANGE SCREEN */

  document
    .getElementById(
      "startScreen"
    )
    .classList
    .add("hidden");


  document
    .getElementById(
      "examScreen"
    )
    .classList
    .remove("hidden");


  document
    .getElementById(
      "studentDisplay"
    )
    .textContent =
      studentName
        ? `Student: ${studentName}`
        : "";


  document
    .getElementById(
      "modeDisplay"
    )
    .textContent =
      testMode === "practice"
        ? "Practice Mode"
        : "Exam Mode";


  renderQuestion();


  updateTimer();


  timer =
    setInterval(
      updateTimer,
      1000
    );

}


/* =========================================================
   DISPLAY QUESTION
========================================================= */

function renderQuestion() {

  const question =
    examQuestions[
      currentQuestion
    ];


  document
    .getElementById(
      "topicBadge"
    )
    .textContent =
      question.topic;


  document
    .getElementById(
      "questionNumber"
    )
    .textContent =
      `Question ${
        currentQuestion + 1
      }`;


  document
    .getElementById(
      "questionProgress"
    )
    .textContent =
      `Question ${
        currentQuestion + 1
      } of ${TOTAL_QUESTIONS}`;


  document
    .getElementById(
      "answeredProgress"
    )
    .textContent =
      `Answered: ${
        studentAnswers.filter(
          answer =>
            answer !== null
        ).length
      } / ${TOTAL_QUESTIONS}`;


  document
    .getElementById(
      "progressFill"
    )
    .style
    .width =
      `${
        (
          (currentQuestion + 1) /
          TOTAL_QUESTIONS
        ) * 100
      }%`;


  document
    .getElementById(
      "questionText"
    )
    .textContent =
      question.question;


  document
    .getElementById(
      "questionVisual"
    )
    .innerHTML =
      question.visual;


  const choices =
    document.getElementById(
      "answerChoices"
    );


  choices.innerHTML = "";


  question.choices.forEach(
    (choice, index) => {

      const label =
        document.createElement(
          "label"
        );


      label.className =
        "answerChoice";


      label.innerHTML = `

        <input
          type="radio"
          name="answer"
          value="${index}"

          ${
            studentAnswers[
              currentQuestion
            ] === index
              ? "checked"
              : ""
          }

        >

        <span>
          ${choice.text}
        </span>

      `;


      label
        .querySelector(
          "input"
        )
        .addEventListener(
          "change",
          function () {

            studentAnswers[
              currentQuestion
            ] =
              Number(
                this.value
              );


            updateNavigation();

          }
        );


      choices.appendChild(
        label
      );

    }
  );


  document
    .getElementById(
      "previousButton"
    )
    .disabled =
      currentQuestion === 0;


  document
    .getElementById(
      "nextButton"
    )
    .disabled =
      currentQuestion ===
      TOTAL_QUESTIONS - 1;


  updateNavigation();

}


/* =========================================================
   QUESTION NUMBERS
========================================================= */

function updateNavigation() {

  const container =
    document.getElementById(
      "questionNumbers"
    );


  container.innerHTML = "";


  examQuestions.forEach(
    (_, index) => {

      const button =
        document.createElement(
          "button"
        );


      button.className =
        "questionDot";


      button.textContent =
        index + 1;


      if (
        index ===
        currentQuestion
      ) {

        button.classList.add(
          "current"
        );

      }


      if (
        studentAnswers[
          index
        ] !== null
      ) {

        button.classList.add(
          "answered"
        );

      }


      button.addEventListener(
        "click",
        () => {

          currentQuestion =
            index;

          renderQuestion();

          window.scrollTo(
            {
              top: 0,
              behavior: "smooth"
            }
          );

        }
      );


      container.appendChild(
        button
      );

    }
  );


  document
    .getElementById(
      "answeredProgress"
    )
    .textContent =
      `Answered: ${
        studentAnswers.filter(
          answer =>
            answer !== null
        ).length
      } / ${TOTAL_QUESTIONS}`;

}


/* =========================================================
   TIMER
========================================================= */

function updateTimer() {

  const minutes =
    Math.floor(
      timeLeft / 60
    );


  const seconds =
    timeLeft % 60;


  document
    .getElementById(
      "timer"
    )
    .textContent =
      `${String(minutes)
        .padStart(2, "0")}:${String(seconds)
        .padStart(2, "0")}`;


  /* LAST 5 MINUTES */

  if (
    timeLeft <= 300
  ) {

    document
      .getElementById(
        "timer"
      )
      .style
      .color =
      "#a3242b";

  }


  /* TIME UP */

  if (
    timeLeft <= 0
  ) {

    clearInterval(timer);

    submitTest(true);

    return;

  }


  timeLeft--;

}


/* =========================================================
   SUBMIT TEST
========================================================= */

function submitTest(
  automatic = false
) {


  if (
    !automatic
  ) {

    const unanswered =
      studentAnswers.filter(
        answer =>
          answer === null
      ).length;


    if (
      unanswered > 0
    ) {

      const confirmSubmit =
        confirm(
          `You have ${
            unanswered
          } unanswered question(s).

Submit anyway?`
        );


      if (
        !confirmSubmit
      ) {

        return;

      }

    }


    else {

      const confirmSubmit =
        confirm(
          "Submit your test now?\n\nYou cannot change your answers after submission."
        );


      if (
        !confirmSubmit
      ) {

        return;

      }

    }

  }


  clearInterval(timer);


  /*
    ONLY EXAM MODE
    saves the one-submission
    restriction.
  */


  if (
    testMode ===
    "exam"
  ) {

    localStorage.setItem(

      EXAM_STORAGE_KEY,

      JSON.stringify({

        date:
          new Date()
            .toISOString(),

        student:
          studentName

      })

    );

  }


  calculateResult();

}


/* =========================================================
   RESULT
========================================================= */

function calculateResult() {

  let score = 0;


  examQuestions.forEach(
    (question, index) => {

      const answer =
        studentAnswers[
          index
        ];


      if (
        answer !== null &&
        question.choices[
          answer
        ].correct
      ) {

        score++;

      }

    }
  );


  const percentage =
    Math.round(
      (
        score /
        TOTAL_QUESTIONS
      ) * 100
    );


  document
    .getElementById(
      "examScreen"
    )
    .classList
    .add("hidden");


  document
    .getElementById(
      "resultScreen"
    )
    .classList
    .remove("hidden");


  document
    .getElementById(
      "resultStudent"
    )
    .textContent =
      studentName
        ? `Student: ${studentName}`
        : "";


  document
    .getElementById(
      "percentage"
    )
    .textContent =
      `${percentage}%`;


  document
    .getElementById(
      "finalScore"
    )
    .textContent =
      `Score: ${score} / ${TOTAL_QUESTIONS}`;


  if (
    testMode ===
    "practice"
  ) {

    document
      .getElementById(
        "resultMessage"
      )
      .textContent =
      percentage >= 70
        ? "Good work! Review any mistakes below and try another practice test."
        : "Keep practicing. Review the explanations below and try again.";


    document
      .getElementById(
        "practiceAgainButton"
      )
      .classList
      .remove("hidden");

  }


  else {

    document
      .getElementById(
        "resultMessage"
      )
      .textContent =
      "Exam Mode submission is complete. This browser/device cannot submit another Exam Mode attempt.";

  }

}


/* =========================================================
   REVIEW QUESTIONS
========================================================= */

function reviewQuestions() {

  const area =
    document.getElementById(
      "reviewArea"
    );


  area.innerHTML =
    "<h2>Question Review</h2>";


  examQuestions.forEach(
    (question, index) => {

      const studentAnswer =
        studentAnswers[
          index
        ];


      const isCorrect =
        studentAnswer !== null &&
        question.choices[
          studentAnswer
        ].correct;


      const correctChoice =
        question.choices.find(
          choice =>
            choice.correct
        );


      const item =
        document.createElement(
          "article"
        );


      item.className =
        isCorrect
          ? "reviewItem correct"
          : "reviewItem incorrect";


      let answerText;


      if (
        studentAnswer === null
      ) {

        answerText =
          "No answer";

      }

      else {

        answerText =
          question.choices[
            studentAnswer
          ].text;

      }


      item.innerHTML = `

        <h3>
          Question ${
            index + 1
          }
          —
          ${question.topic}
        </h3>


        <p>
          <strong>
            ${question.question}
          </strong>
        </p>


        ${
          question.visual
            ? `<div class="questionVisual">
                ${question.visual}
              </div>`
            : ""
        }


        <p>
          Your answer:
          <strong>
            ${answerText}
          </strong>
        </p>


        <p>
          Correct answer:
          <strong>
            ${correctChoice.text}
          </strong>
        </p>


        ${
          isCorrect
            ? ""
            : `
              <div class="explanation">

                <strong>
                  Explanation:
                </strong>

                <p>
                  ${question.explanation}
                </p>

              </div>
            `
        }

      `;


      area.appendChild(
        item
      );

    }
  );


  area.classList.remove(
    "hidden"
  );


  area.scrollIntoView(
    {
      behavior: "smooth"
    }
  );

}


/* =========================================================
   PRACTICE AGAIN
========================================================= */

function practiceAgain() {

  if (
    testMode !==
    "practice"
  ) {

    return;

  }


  location.reload();

}


/* =========================================================
   BUTTON EVENTS
========================================================= */

document
  .getElementById(
    "startButton"
  )
  .addEventListener(
    "click",
    startExam
  );


document
  .getElementById(
    "previousButton"
  )
  .addEventListener(
    "click",
    function () {

      if (
        currentQuestion > 0
      ) {

        currentQuestion--;

        renderQuestion();

        window.scrollTo(
          {
            top: 0,
            behavior: "smooth"
          }
        );

      }

    }
  );


document
  .getElementById(
    "nextButton"
  )
  .addEventListener(
    "click",
    function () {

      if (
        currentQuestion <
        TOTAL_QUESTIONS - 1
      ) {

        currentQuestion++;

        renderQuestion();

        window.scrollTo(
          {
            top: 0,
            behavior: "smooth"
          }
        );

      }

    }
  );


document
  .getElementById(
    "submitButton"
  )
  .addEventListener(
    "click",
    () =>
      submitTest(false)
  );


document
  .getElementById(
    "reviewButton"
  )
  .addEventListener(
    "click",
    reviewQuestions
  );


document
  .getElementById(
    "practiceAgainButton"
  )
  .addEventListener(
    "click",
    practiceAgain
  );


/* =========================================================
   COPY PROTECTION
========================================================= */

document.addEventListener(
  "contextmenu",
  function (event) {

    event.preventDefault();

  }
);


[
  "copy",
  "cut",
  "paste",
  "dragstart"
].forEach(
  eventName => {

    document.addEventListener(
      eventName,
      function (event) {

        event.preventDefault();

      }
    );

  }
);


/* =========================================================
   KEYBOARD PROTECTION
========================================================= */

document.addEventListener(
  "keydown",
  function (event) {

    const key =
      event.key.toLowerCase();


    /*
      Disable:
      Ctrl+C
      Ctrl+V
      Ctrl+X
      Ctrl+U
      Ctrl+S
      Ctrl+P
    */

    if (
      event.ctrlKey &&
      [
        "c",
        "v",
        "x",
        "u",
        "s",
        "p"
      ].includes(key)
    ) {

      event.preventDefault();

    }


    /*
      Developer tools shortcuts
    */

    if (
      event.ctrlKey &&
      event.shiftKey &&
      [
        "i",
        "j",
        "c"
      ].includes(key)
    ) {

      event.preventDefault();

    }


    /*
      F12
    */

    if (
      event.key === "F12"
    ) {

      event.preventDefault();

    }

  }
);


/* =========================================================
   NO PAUSE
========================================================= */

document.addEventListener(
  "visibilitychange",
  function () {

    /*
      IMPORTANT:

      We do NOT stop the timer.

      If the student changes tabs,
      the timer continues.
    */

    if (
      document.hidden
    ) {

      console.log(
        "Timer continues. No pause is available."
      );

    }

  }
);


/* =========================================================
   BACK BUTTON PROTECTION
========================================================= */

history.pushState(
  null,
  "",
  location.href
);


window.addEventListener(
  "popstate",
  function () {

    if (
      !document
        .getElementById(
          "examScreen"
        )
        .classList
        .contains("hidden")
    ) {

      history.pushState(
        null,
        "",
        location.href
      );

    }

  }
);