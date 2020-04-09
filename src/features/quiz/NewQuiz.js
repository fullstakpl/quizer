import React from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import { useForm } from "react-hook-form";
import { db, auth } from "../../services/firebase";

const Question = styled.div`
  max-width: 400px;
  border: 1px solid #999;
  padding: 12px;
  margin-top: 12px;
  margin-bottom: 6px;
`;

const Answer = styled.div`
  margin: 12px;
`

const Points = styled(Input)`
  margin-left: 12px;
  width: 50px;
`

const Controls = styled.div`
  margin: 12px;
`

export default () => {

  const initialQuestion = {
    content: '',
    answers: [
      { content: '', points: 0 },
      { content: '', points: 0 },
      { content: '', points: 0 },
      { content: '', points: 0 },
    ]
  }
  const [questions, setQuestions] = React.useState([initialQuestion]);

  const addQuestion = () => {
    setQuestions([...questions, initialQuestion])
  }

  const removeQuestion = () => {
    const newArr = [...questions];
    newArr.splice(questions.length-1, 1);
    setQuestions(newArr);
  }

  const onSubmit = async values => {
    console.log(values);
    const authorId = auth().currentUser.uid
    const quiz = await db.collection("quizes").add({
      ...values,
      authorId
    })
    console.log(quiz.id);
  };

  const { handleSubmit, register, errors } = useForm();

  return(
    <div>
      <p>Utwórz nowy quiz</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="title"
          inputRef={register({ required: true })}
          placeholder="Nazwa"
          inputProps={{ 'aria-label': 'nazwa' }}
        />
        {errors.title && <p style={{color: 'red'}}>Pole wymagane</p>}
        {questions.map((question, q) =>
          <Question key={`question${q}`}>
            <Input
              fullWidth
              inputRef={register()}
              name={`questions[${q}].content`}
              placeholder={`Pytanie ${q+1}`}
              inputProps={{ 'aria-label': `pytanie ${q+1}` }}
            />
            {question.answers.map((answer, a) =>
              <Answer key={`answer${a}`}>
                <Input
                  inputRef={register()}
                  name={`questions[${q}].answers[${a}].content`}
                  placeholder={`Odp ${a+1}`}
                  inputProps={{ 'aria-label': `odp ${a+1}` }}
                />
                <Points
                  inputRef={register()}
                  name={`questions[${q}].answers[${a}].points`}
                  defaultValue={0}
                  type='number'
                  inputProps={{ 'aria-label': `points ${a+1}` }}
                />
              </Answer>
            )}
          </Question>
        )}
        <Button variant="contained" color="primary" type="submit">
          Utwórz quiz
        </Button>
      </form>
      <Controls>
        <Button onClick={addQuestion}>Dodaj pytanie</Button>
        <Button onClick={removeQuestion}>Usuń pytanie</Button>
      </Controls>

    </div>
  )
}
