import styled from 'styled-components'
import CommandHistoryCard from './CommandHistoryCard.js'

const Logs = ({ transcript, commandHistory, words }) => {
  return (
    <Container>
      <TranscriptContainer>
        <h1>Transcript</h1>
        {transcript}
      </TranscriptContainer>
      <CommandContainer>
        <h1>Command History</h1>
        {commandHistory.map(entry => (
          <CommandHistoryCard entry={entry} words={words} />
        ))}
      </CommandContainer>
    </Container>
  )
}

const Container = styled.div`
background-color: #121a23;
display: grid;
grid-template-columns: 1fr 1fr
`

const TranscriptContainer = styled.div`
display: flex;
flex-direction: column;
border-right: 1px solid;
color:white;
padding: 2rem;
`

const CommandContainer = styled.div`
color:white;
padding:2rem;
`
export default Logs