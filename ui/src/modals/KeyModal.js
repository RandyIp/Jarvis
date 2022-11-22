import Modal from 'react-modal';
import styled from 'styled-components'
import toast from 'react-hot-toast';
import axios from 'axios'
import KeywordCard from '../components/KeywordCard.js'

const KeyModal = ({ keyModal, setKeyModal, keywords, addingKeyword, setAddingKeyword, keywordCount, setKeywordCount, keywordForm, setKeywordForm, node, setNode }) => {
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

  // ----------------------------------- Functions -----------------------------------
  const addFunc = (e) => {
    e.preventDefault()
    if (keywords.includes(keywordForm)) {
      setKeywordForm('')
      toast.error('Keyword already exists')
      return
    }
    if (keywordForm.length === 0) {
      toast.error('Please enter a keyword')
      return
    }
    setAddingKeyword(true)
  }

  const cancelFunc = (e) => {
    e.preventDefault()
    axios.delete('http://localhost:1128/keywords', { data: { keyword: keywordForm } })
    setKeywordCount(0)
    setAddingKeyword(false)
  }

  return (<Modal isOpen={keyModal} onRequestClose={() => setKeyModal(false)}>
    <Container>
      <div>
        <h2>Add a Keyword</h2>
        <form>
          <input value={keywordForm} onChange={(e) => { setKeywordForm(e.target.value) }}></input>
          <button onClick={addFunc}>Add Keyword</button>
          <select value={node} onChange={(e) => setNode(e.target.value)}>
            <option value='parameter'>parameter</option>
            <option value='function'>function</option>
            <option value='admin'>admin</option>
          </select>
        </form>
        {addingKeyword && <div>
          <h2>Say keyword "your keyword" - 5 times</h2>
          <h3>{keywordCount}</h3>
          <p>Please say your keyword {5 - keywordCount} more times</p>
          <button onClick={cancelFunc}>cancel</button>
        </div>}
      </div>
      <KeywordContainer>
        <h2>Keywords</h2>
        <hr></hr>
        {keywords.map(entry => (
          <KeywordCard entry={entry} key={entry} />
        ))}
      </KeywordContainer>
    </Container>
  </Modal>)
}

const Container = styled.div`
display: grid;
grid-template-rows: 1 fr 9fr
`

const KeywordContainer = styled.div`
overflow: auto
`
export default KeyModal