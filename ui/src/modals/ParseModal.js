import { useState, useEffect } from 'react'
import Modal from 'react-modal';
import styled from 'styled-components'
const qna = require('@tensorflow-models/qna');

const ParseModal = ({ parseModal, setParseModal }) => {

  const ParseAns = async () => {
    const model = await qna.load();
    const answers = await model.findAnswers(quesText, parseText);
    console.log(answers)
    setAns(answers)
  }

  // ----------------------------------- Set up Modal -----------------------------------
  Modal.setAppElement('#root');
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      position: 'relative'
    },
  };

  // ----------------------------------- States -----------------------------------
  const [parseText, setParseText] = useState('')
  const [quesText, setQuesText] = useState('')
  const [ans, setAns] = useState('')

  return (<Modal isOpen={parseModal} onRequestClose={() => setParseModal(false)}>
    <Container>
      <div>
        <h2>Text you want to parse</h2>
        <input value={parseText} onChange={(e) => setParseText(e.target.value)}></input>
      </div>
      <div>
        <h2>Question</h2>
        <input value={quesText} onChange={(e) => setQuesText(e.target.value)}></input>
        <button onClick={ParseAns}>Search</button>
      </div>
      <div>
        <h2>Answer</h2>
        <p>{ans}</p>
      </div>
    </Container>
  </Modal>)
}

const Container = styled.div`
display: grid;
grid-template-rows: 3fr 1fr 1fr;
`

export default ParseModal