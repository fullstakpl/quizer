import React from 'react';
import { db } from "../../services/firebase";
import styled from "styled-components";

import Button from '@material-ui/core/Button';

const QuizItem = styled.div`
  border: 1px solid #333;
  padding: 12px;
  margin: 6px;
  display: flex;
  justify-content: space-between;
`;

const Controls = styled.div`
  width: 200px;
`

const Title = styled.div`
  width: 200px;
`

export default () => {
  const [quizes, setQuizes] = React.useState([])

  const handleRemove = async id => {
    await db.collection("quizes").doc(id).delete();
    setQuizes(quizes.filter(quiz => quiz.id !== id))
  }


  // Fetch items without listening
  // React.useEffect(() => {
  //   const fetchQuizes = async () => {
  //     const results = await db.collection("quizes").get();
  //     const temp = []
  //     results.docs.map(doc =>  {
  //       temp.push({ id: doc.id, ...doc.data() });
  //     })
  //     setQuizes(temp)
  //   }

  //   fetchQuizes()
  // }, [])

  React.useEffect(() => {
    const unsubscribe = db.collection('quizes')
      .onSnapshot(snapshot => {
        console.log(snapshot)
        if (snapshot.size) {
          const temp = []
          snapshot.forEach(doc => temp.push({ id: doc.id, ...doc.data() }))
          setQuizes(temp)
        }
      })

    return () => {
      unsubscribe();
    }
  }, [])

  console.log(quizes)

  return(
    <div>
      <p>Lista quizów:</p>
      {quizes.length === 0 && <p>Brak...</p>}
      {quizes.map(quiz => {
        return (
          <QuizItem key={quiz.id}>
            <Title>
              {quiz.title}
            </Title>


            <Controls>
              <Button onClick={() => handleRemove(quiz.id)}>Usuń</Button>
            </Controls>
          </QuizItem>
        )
      })}
    </div>
  )
}
