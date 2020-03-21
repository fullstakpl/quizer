import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import quizReducer from '../features/quiz/quizSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    quiz: quizReducer
  },
});
