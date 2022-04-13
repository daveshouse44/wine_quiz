import React, { Component } from "react";
import wineData from "../api/data";
import QuestionTile from "./QuestionTile/QuestionTile";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import "./App.css";

class App extends Component {
  state = {
    questionArray: [...wineData],
    questionNumber: [...wineData].length,
    recordedAnswers: [],
    currentQuestionIndex: 0,
    score: 0,
    quizStatus: true,
    questionTime: 10,
  };

  questionClickHandler = (question) => {
    clearInterval(this.timer);
    this.checkAnswer(question);
    this.incrementIndexHandler();
    this.setState({ questionTime: 10 });
    if (this.state.questionNumber !== this.state.currentQuestionIndex + 1) {
      this.timer = setInterval(this.increment, 1000);
    }
  };

  increment = () => {
    const { questionTime } = this.state;
    if (questionTime > 0) {
      this.setState({ questionTime: this.state.questionTime - 1 });
    } else {
      clearInterval(this.timer);
      this.timer = setInterval(this.increment, 1000);
      this.incrementIndexHandler();
      this.setState({ questionTime: 10 });
    }
  };

  componentMounted() {
    if (this.state.quizStatus) {
      this.timer = setInterval(this.increment, 1000);
    }
  }

  checkAnswer = (question) => {
    const { questionArray, currentQuestionIndex } = this.state;
    const correct = questionArray[currentQuestionIndex].correct;
    if (question === correct) {
      this.setState((prevState) => ({
        score: prevState.score + 1,
        recordedAnswers: [...prevState.recordedAnswers, true],
      }));
    } else {
      this.setState((prevState) => ({
        recordedAnswers: [...prevState.recordedAnswers, false],
      }));
    }
  };

  incrementIndexHandler = () => {
    const { currentQuestionIndex, questionNumber } = this.state;
    if (currentQuestionIndex + 1 === questionNumber) {
      this.checkAnswer();
      this.updateQuizStatus();
      clearInterval(this.timer);
      return;
    }

    if (this.state.questionTime === 0) {
      this.setState((prevState) => ({
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        recordedAnswers: [...prevState.recordedAnswers, false],
      }));
    } else {
      this.setState((prevState) => ({
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
      }));
    }
  };

  updateQuizStatus = () => {
    this.setState({ quizStatus: false });
  };

  resetQuiz = () => {
    this.setState({
      questionArray: [...wineData],
      questionNumber: [...wineData].length,
      recordedAnswers: [],
      currentQuestionIndex: 0,
      score: 0,
      quizStatus: true,
      questionTime: 10,
    });
    clearInterval(this.timer);
    this.timer = setInterval(this.increment, 1000);
  };

  render() {
    const items = this.state;

    return (
      <>
        <section>
          {this.state.quizStatus ? (
            <QuestionTile fn={this.questionClickHandler} {...items} />
          ) : (
            <ScoreBoard props={this.state} fn={this.resetQuiz} />
          )}
        </section>
        ;
      </>
    );
  }
}

export default App;
