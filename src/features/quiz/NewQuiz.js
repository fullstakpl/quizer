import React from 'react';
import Input from '@material-ui/core/Input';
import styled from 'styled-components';

import { useForm } from 'react-hook-form';

const Question = styled.div`
  max-width: 400px;
  border: 1px solid #999;
  padding: 12px;
  margin-top: 12px;
`;

const Answer = styled.div`
  margin: 12px;
`

const Points = styled(Input)`
  margin-left: 12px;
  width: 50px;
`

export default () => {

  const { register, handleSubmit, errors } = useForm();
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


  const onSubmit = values => {
    console.log(values);
  };

  return(
    <div>
      <p>Utwórz nowy quiz</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="title"
          inputRef={register()}
          placeholder="Nazwa"
          inputProps={{ 'aria-label': 'nazwa' }}
        />
        {questions.map((question, q) =>
          <Question key={`question${q}`}>
            <Input
              fullWidth
              inputRef={register()}
              name={`question[${q}].content`}
              placeholder={`Pytanie ${q+1}`}
              inputProps={{ 'aria-label': `pytanie ${q+1}` }}
            />
            {question.answers.map((answer, a) =>
              <Answer key={`answer${a}`}>
                <Input
                  name={`question[${q}].answers[${a}].content`}
                  inputRef={register()}
                  placeholder={`Odp ${a+1}`}
                  inputProps={{ 'aria-label': `odp ${a+1}` }}
                />
                <Points
                  name={`question[${q}].answers[${a}].points`}
                  inputRef={register()}
                  defaultValue={0}
                  type='number'
                  inputProps={{ 'aria-label': `points ${a+1}` }}
                />
              </Answer>
            )}
          </Question>
        )}
        <button onClick={addQuestion}>Dodaj pytanie</button>
        <button onClick={removeQuestion}>Usuń pytanie</button>
        <button type="submit">Utwórz quiz</button>
      </form>
    </div>
  )
}
