import useCollapse from 'react-collapsed';
import styled from 'styled-components'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import toast from 'react-hot-toast';
import axios from 'axios'
library.add(fab)
library.add(fas)

const CommandHistoryCard = ({ entry, words }) => {
  const initialValues = {
    incorrectWords: '',
    correctWords: '',
    node: 'parameter'
  }
  const [isExpanded, setExpanded] = useState(false)
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  const [reportForm, setReportForm] = useState(initialValues)

  const reportFunc = (e) => {
    e.preventDefault()
    setExpanded((prevExpanded) => !prevExpanded)
    toast.success('Your words have been added!')
    words.current = [...words.current, reportForm.incorrectWords]
    axios.post('http://localhost:1128/keywords', {
      word: reportForm.incorrectWords,
      func: reportForm.node,
      keyword: reportForm.correctWords
    })
  }

  return (
    <div>
      <HeaderContainer {...getToggleProps({
        onClick: () => setExpanded((prevExpanded) => !prevExpanded),
      })}>
        {!isExpanded && <FontAwesomeIcon icon="fa-solid fa-caret-right" />}
        {isExpanded && <FontAwesomeIcon icon="fa-solid fa-caret-down" />}
        <Header>{entry}</Header>
      </HeaderContainer>
      <div {...getCollapseProps()}>
        <form>
          <p>Input which words were incorrect</p>
          <input value={reportForm.incorrectWords} onChange={(e) => setReportForm({ ...reportForm, incorrectWords: e.target.value })} placeholder='incorrect words'></input>
          <p>Input what the words should have been</p>
          <input value={reportForm.correctWords} onChange={(e) => setReportForm({ ...reportForm, correctWords: e.target.value })} placeholder='correct words'></input>
          <p>What type of word is it?</p>
          <select value={reportForm.node} onChange={(e) => setReportForm({ ...reportForm, node: e.target.value })}>
            <option value='parameter'>parameter</option>
            <option value='function'>function</option>
            <option value='admin'>admin</option>
          </select>
          <button onClick={reportFunc}>Report</button>
        </form>
      </div>
    </div >
  );
}

const HeaderContainer = styled.div`
display: flex;
align-items: center;
`

const Header = styled.p`
margin-left: 1rem;
`

export default CommandHistoryCard