import { combineReducers } from 'redux';
import { createStore } from 'redux';
import quiz from './quiz';

export const ConfigureStore = () => {
  const store = createStore(
      combineReducers({
          quiz
      })
  );

  return store;
}