import React from "react";

const ballColorHandle = (ball) => {
  switch (ball) {
    case true:
      return "background: #42f580;";
    case false:
      return "background: #f54e40";
    default:
      return "background: #e6ede0";
  }
};

const RecordOfQuestion = ({ questionArray, recordedAnswers }) => {
  const RecordBall = questionArray.map((question, index) => {
    const ball = questionArray[index];
    return (
      <div className="ballDisplay" key={index} balls={ballColorHandle(ball)} />
    );
  });
  return <wrapper>{RecordBall}</wrapper>;
};
export default RecordOfQuestion;
