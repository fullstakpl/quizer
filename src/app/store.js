import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import quizReducer from '../features/quiz/quizSlice';
import authReducer from '../features/auth/authSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    quiz: quizReducer,
    auth: authReducer
  },
});
