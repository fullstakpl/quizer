import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectActiveQuestion,
  selectQuestions,
  selectStartedAt,
  selectFinishedAt,
  toggleAnswer,
  start,
  prev,
  next,
  restart,
  selectMaxPoints,
  selectPoints,
  finish
} from './quizSlice';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


export function Quiz() {
  const dispatch = useDispatch();
  const questions = useSelector(selectQuestions);
  const activeQuestion = useSelector(selectActiveQuestion);
  const startedAt = useSelector(selectStartedAt);
  const finishedAt = useSelector(selectFinishedAt);
  const points = useSelector(selectPoints);
  const maxPoints = useSelector(selectMaxPoints);

  const question = questions[activeQuestion];



  const handleToggle = (i) => () => {
    dispatch(toggleAnswer({ answer: i }));
  };

  const handleNext = () => {
    if(questions[activeQuestion + 1]) {
      dispatch(next());
    } else {
      dispatch(finish());
    }
  }

  const handlePrev = () => {
    if(questions[activeQuestion - 1]) {
      dispatch(prev());
    } else {
      dispatch(restart());
    }
  }

  return (
    <div>
      {finishedAt && <>
          <p>Twój wynik: {points}/{maxPoints}</p>
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(restart())}
          >
            Jeszcze raz
          </Button>
        </>}

      {!startedAt && !finishedAt && <>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(start())}
        >
          Rozpocznij Quiz
        </Button>
      </>}

      {startedAt && !finishedAt && <>
        <Grid container>
          <Grid item xs={12}>
            {activeQuestion+1} / {questions.length}
          </Grid>
        </Grid>
        <p>{question.content}</p>


      <List>
        {question.answers.map((answer, i) =>
          <ListItem key={i} dense button onClick={handleToggle(i)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={answer.checked}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': i }}
              />
            </ListItemIcon>
            <ListItemText id={i} primary={answer.content} />
          </ListItem>
        )}
      </List>
      <Grid container>
        <Grid item xs={6}>
          <Button onClick={handlePrev}>
            Cofnij
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={handleNext}>
            Dalej
          </Button>
        </Grid>
      </Grid>
      </>}
    </div>
  );
}
