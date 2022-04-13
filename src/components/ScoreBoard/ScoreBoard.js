import React from "react";
import RecordOfQuestion from "../RecordOfQuestion/RecordOfQuestion";
import "./ScoreBoard.css";

const ScoreBoard = ({ props, fn }) => {
  return (
    <>
      <h1>
        Your Score : {props.score}
        <RecordOfQuestion {...props} />
        <button onClick={fn}>Reset</button>
      </h1>
    </>
  );
};
export default ScoreBoard;
