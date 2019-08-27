import React, { Component } from 'react';
import { ActionTypes } from '../redux/ActionTypes';
import Quiz from './Quiz';
import Summary from './Summary';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ ...state.quiz, ...state.mode, ...state.page });
const mapDispatchToProps = dispatch => ({onPageUpdate: payload => dispatch({ type: ActionTypes.PageUpdate, payload })});

class Main extends Component {
    mover = (el) => {
        let id = el.target.id;
        let index = 0;
        if (id === 'prev')
            index = this.props.page.index - 1;
        else 
            index = this.props.page.index + 1;

        if (index >= 0 && index < this.props.page.counter) {
            let page = {
                index: index,
                counter: this.props.page.counter
            };
            this.props.onPageUpdate(page);
        }
    }

    renderMode() {
        if (this.props.mode === 'quiz') {
            return (<Quiz mover={this.mover} />)
        } else {
            return (<Summary questions={this.props.quiz.questions || []} />)
        }
    }

    render() {
        return (
            <div>
                {this.renderMode()}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);