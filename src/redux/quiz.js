import { ActionTypes } from '../redux/ActionTypes';

let initialQuiz = {
    quiz: {
        questions: []
    },
    mode: 'quiz',
    page: {
        index: 0,
        counter: 1
    }
}

export default (state = { ...initialQuiz }, action) => {
    switch (action.type) {
        case ActionTypes.PageUpdate:
            return {
                ...state, page: action.payload
            }
        case ActionTypes.QuizLoad:
            return {
                ...state, quiz: action.payload
            }
        case ActionTypes.QuizSubmit:
            return {
                ...state, mode: action.payload
            }
        case ActionTypes.QuizSelection:
            return {
                ...state, quiz: action.payload
            }
        default:
            return state;
    }
};
