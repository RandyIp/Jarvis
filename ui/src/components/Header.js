import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fab)
library.add(fas)

const Header = ({ listening, start, stop, setCmdModal, setParseModal, setKeyModal, active, log, setLog }) => {

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
        <HeaderButtons onClick={() => setKeyModal(true)}>Keywords</HeaderButtons>
        <HeaderButtons onClick={() => setLog(!log)}>{log ? 'Home' : 'Logs'}</HeaderButtons>
        <HeaderButtons>Music</HeaderButtons>
        <HeaderButtons onClick={() => setParseModal(true)}>Parse</HeaderButtons>
      </Functions>
      {!active && <Title>Say Jarvis to Begin</Title>}
      {active && <Title>At your service sir</Title>}
      <PowerButton onClick={heyListen}>
        {!listening && <FontAwesomeIcon icon="fa-play" />}
        {listening && <FontAwesomeIcon icon="fa-solid fa-stop" />}
        {listening ? 'Stop Jarvis' : 'Start Jarvis'}
      </PowerButton>
    </Container>
  )
}

const Container = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
background-image: linear-gradient(to right, #6fe6e8 , #376279);
height: 100%;
position: relative;
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
const Title = styled.h2`
margin:0;
text-align:center;
`

const PowerButton = styled.button`
background: transparent;
border: transparent;
position: absolute;
right: 0;
cursor: pointer;
width:15%;
height: 100%;
&:hover {
  background-color: white;
}
`
export default Header