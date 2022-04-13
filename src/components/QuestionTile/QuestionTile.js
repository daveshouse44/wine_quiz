import React from "react";
import RecordOfQuestion from "./RecordOfQuestion/RecordOfQuestion";

const handleWidth = (width) => {
  let size = width * 10;
  return `width:${size}%`;
};

const QuestionTile = (props) => {
  const {
    questionTime,
    questionNumber,
    currentQuestionIndex,
    questionArray,
    fn: clickQuestionHandler,
  } = props;
  const question = questionArray[currentQuestionIndex];
  const numberQuestion = `${currentQuestionIndex + 1} / ${questionNumber}`;

  const answers = question.answers.map((answer, index) => {
    return (
      <button
        key={index}
        value={answer}
        onClick={() => clickQuestionHandler(answer)}
      >
        {answer}
      </button>
    );
  });

  return (
    <>
      <section>
        <div className="displayWrapper">
          <div className="timer">{questionTime}</div>
          <h1 className="questionContent">{question.question}</h1>
          <div className="questionCounter">{numberQuestion}</div>
          <div className="progressBar" width={handleWidth(questionTime)}></div>
          <RecordOfQuestion {...props} />
        </div>
        <div className="buttonWrapper">{answers}</div>
      </section>
    </>
  );
};

export default QuestionTile;
