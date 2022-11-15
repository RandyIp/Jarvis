import styled from 'styled-components'

const Header = ({ listening, start, stop, setCmdModal }) => {

  const heyListen = () => {
    if (!listening) {
      start({ continuous: true })
    } else {
      stop()
    }
  }

  return (
    <Container>
      <Functions>
        <HeaderButtons onClick={() => setCmdModal(true)}>Commands</HeaderButtons>
        <HeaderButtons>Search</HeaderButtons>
        <HeaderButtons>Music</HeaderButtons>
        <HeaderButtons>Parse</HeaderButtons>
        <HeaderButtons>logs</HeaderButtons>
      </Functions>
      <Title>J.A.R.V.I.S</Title>
      <HeaderButtons onClick={heyListen}>{listening ? 'Stop Jarvis' : 'Start Jarvis'}</HeaderButtons>
    </Container>
  )
}

const Container = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
background-image: linear-gradient(to right, #6fe6e8 , #376279);
height: 7vh;
`

const Functions = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`
const HeaderButtons = styled.button`
background: transparent;
border: transparent;
cursor: pointer;
&:hover {
  background-color: white;
}
`
const Title = styled.h1`
margin:0;
text-align:center;
`
export default Header