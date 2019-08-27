import React, { Component } from 'react';
import { ActionTypes } from '../redux/ActionTypes';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ ...state.quiz, ...state.mode, ...state.page });
const mapDispatchToProps = dispatch => ({
    onSubmit: payload => dispatch({ type: ActionTypes.QuizSubmit, payload }),
    onSel: payload => dispatch({ type: ActionTypes.QuizSelection, payload })
});

class Quiz extends Component {

    onSel(question, option) {
        let quiz = JSON.parse(JSON.stringify(this.props.quiz));
        let q = quiz.questions.find(x => x.id === question.id);
        q.options.forEach((x) => { x.selected = false; });
        q.options.find(x => x.id === option.id).selected = true;
        this.props.onSel(quiz);
    }

    setMode = (el) => this.props.onSubmit(el.target.id);

    render() {
        let questions = this.props.quiz.questions.slice(this.props.page.index, this.props.page.index + 1);

        return (
            <div className="col-12 " id="quiz">
                <h1 className="text-center font-weight-bold">Quiz</h1>
                {questions.map(qu =>
                    <div key={qu.id}>
                        <h3 className="text-center">{this.props.page.index + 1}/{this.props.page.counter}: <span>{qu.name}</span></h3>
                        <div className="text-left row options">
                            {
                                qu.options.map(option =>
                                    <div key={option.id} className="col-12">
                                        <div className="option">
                                            <label className="font-weight-bold" htmlFor={option.id}>
                                                <input id={option.id} checked={option.selected} type="radio" onChange={() => this.onSel(qu, option)} />
                                                {option.name}
                                            </label>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                )}
                <div className="text-center">
                    <button disabled={(this.props.page.index === 0)? true : false} id="prev" className="btn btn-success" onClick={this.props.mover}>Prev</button>
                    <button id="next" className="btn btn-success" onClick = {(this.props.page.index !== this.props.page.counter-1)? this.props.mover : this.setMode}>{(this.props.page.index !== this.props.page.counter-1)? 'Next' : 'Done !'}</button>
                </div>
            </div >
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);