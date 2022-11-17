import { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const KeywordCard = ({ entry }) => {
  const [exist, setExist] = useState(true)

  const deleteFunc = (e) => {
    e.preventDefault()
    setExist(false)
    axios.delete('http://localhost:1128/keywords', { data: { keyword: entry } })
  }

  if (exist) {
    return (
      <FlexContainer>
        <p key={entry}>{entry} --- </p>
        <button onClick={deleteFunc}>Delete</button>
      </FlexContainer>
    )
  } else {
    return (null)
  }
}

const FlexContainer = styled.div`
display: flex;
align-items: center;
`

export default KeywordCard