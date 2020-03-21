import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  startedAt: null,
  finishedAt: null,
  activeQuestion: 0,
  result: 0,
  questions: [
    {
      id: 1,
      content: 'Redux służy do...',
      answers: [
        { valid: false, checked: false, content: "Zarządzania logiką biznesową w React" },
        { valid: false, checked: false, content: "Wykonywania operacji asynchronicznych"},
        { valid: true, checked: false, content: "Zarządzania stanem"},
        { valid: false, checked: false, content: "Automatyzacji testowania komponentów"},
      ]
    },
    {
      id: 2,
      content: 'Redux Toolkit to...',
      answers: [
        { valid: false, checked: false, content: "Middleware do obsługi API" },
        { valid: true, checked: false, content: "Projekt ułatwiający pracę z Redux"},
        { valid: false, checked: false, content: "Plugin do Chrome"},
        { valid: false, checked: false, content: "Plik konfiguracyjny Redux"},
      ]
    }
  ]
};

export const slice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    start: state => {
      state.startedAt = Date.now();
    },
    finish: state => {
      let points = 0;

      state.questions.forEach(q => {
        points += q.answers.filter(a => a.checked === true && a.valid === true).length
      })

      state.points = points;
      state.finishedAt = Date.now();
    },
    restart: state => {
      state.startedAt = null;
      state.finishedAt = null;
      state.activeQuestion = 0;
      state.questions = initialState.questions;
    },
    next: state => {
      state.activeQuestion += 1;
    },
    prev: state => {
      state.activeQuestion -= 1;
    },
    toggleAnswer: (state, action) => {
      const { answer } = action.payload;
      const question = state.questions[state.activeQuestion]
      question.answers[answer].checked = !question.answers[answer].checked
    },
  },
});

export const {
  start,
  finish,
  toggleAnswer,
  next,
  prev,
  restart,
} = slice.actions;

export const selectStartedAt = state => state.quiz.startedAt;

export const selectFinishedAt = state => state.quiz.finishedAt;

export const selectQuestions = state => state.quiz.questions;

export const selectActiveQuestion = state => state.quiz.activeQuestion;

export const selectPoints = state => state.quiz.points;

export const selectMaxPoints = state => {
  let maxPoints = 0;

  state.quiz.questions.forEach(q => {
    maxPoints += q.answers.filter(a => a.valid === true).length
  })

  return maxPoints;
}

export default slice.reducer;
