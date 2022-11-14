import './App.css';
import { useState } from 'react'
import styled from 'styled-components'
import jarvis from './assets/jarvis.gif'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

function App() {
  const [background, setBackground] = useState('white')
  const [log, setLog] = useState(false)

  // insert commands
  const commands = [
    {
      command: 'Jarvis reset logs',
      callback: ({ resetTranscript }) => { resetTranscript() }
    },
    {
      command: 'Jarvis show logs',
      callback: () => setLog(true)
    },
    {
      command: 'Jarvis hide logs',
      callback: () => setLog(false)
    },
    {
      command: 'Jarvis shut down',
      callback: () => SpeechRecognition.stopListening()
    },
    {
      command: 'Jarvis open *',
      callback: (result) => window.open(`https://${result.replace(/\s/g, '')}.com`, '_blank')
    },
    {
      command: 'Jarvis Google *',
      callback: (result) => window.open(`https://google.com/search?q=${result.replace(/\s/g, '+')}`)
    },
    {
      command: 'Jarvis play shoot to thrill',
      callback: () => window.open('https://www.youtube.com/watch?v=AD6wqKo51MU&t=109s', '_blank')
    },
    {
      command: 'set background *',
      callback: (result) => setBackground(result)
    }
  ]

  // set up voice recognition
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ commands });

  const heyListen = () => {
    SpeechRecognition.startListening({ continuous: true })
  }

  // return error or content
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  } else {
    return (
      <Background color={background}>
        <h1>Jarvis in Progress</h1>
        <img src={jarvis} alt='jarvis gif' />
        <p>At your service sir</p>
        <p>Status: {listening ? 'Awake' : 'Asleep'}</p>
        {!listening && <button onClick={heyListen}>Start</button>}
        {log && <div>
          <h2>Transcript</h2>
          <hr></hr>
          <p>{transcript}</p>
        </div>
        }
      </Background>
    );
  }
}

const Background = styled.div`
  background-color: ${props => props.color};
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`
export default App;
