import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Main from './components/Main';
import { connect } from 'react-redux';
import { ActionTypes } from './redux/ActionTypes';

const mapStateToProps = state => ({...state.quiz });
const mapDispatchToProps = dispatch => ({
  onMainLoad: payload => dispatch({ type: ActionTypes.QuizLoad, payload }),
  onPageUpdate: payload => dispatch({ type: ActionTypes.PageUpdate, payload })
});

class App extends Component {
  state = {
    quiz: 'qObj.json'
  };

  page = {
    index: 0,
    counter: 1
  }

  componentDidMount() {
    this.loadQuiz(this.state.quiz);
  }

  loadQuiz(quiz) {
    fetch(quiz)
      .then(res => res.json())
      .then(res => {
      res.questions.forEach(qu => {
        qu.options.forEach(op => op.selected = false);
      });
      this.page.counter = res.questions.length;
      this.props.onMainLoad(res);
      this.props.onPageUpdate(this.page);
    });
  }

  render() {
    return (
      <div><Main/></div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
