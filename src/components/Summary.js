import React from 'react';

function Summary(props) {
    let questions = props.questions;
        questions.forEach(qu => { qu.isCorrect = qu.options.every(x => x.selected === x.isAnswer); })

    let numCorrect = questions.filter(qu => qu.isCorrect);
    let score = numCorrect.length/questions.length * 100;

    return (
        <div className="text-center">
            <h1 className="text-center font-weight-bold">Quiz Summary</h1>
            <div className="summary col-12">
                <h4>{"Your score is :  " + score}</h4>
                <h4>{"Correctly answered :  " + numCorrect.length + "/" + questions.length + " questions"}</h4>
            </div>
        </div>
    )
}

export default Summary;