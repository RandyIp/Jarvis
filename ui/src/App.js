import React from 'react';
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import jarvis from './assets/jarvis.gif'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import Header from './components/Header.js'

function App() {
  // ----------------------------------- States -----------------------------------
  const [log, setLog] = useState(false)
  const [active, setActive] = useState(false)

  // ----------------------------------- Commands -----------------------------------
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
  ]

  // ----------------------------------- Voice Recognition -----------------------------------
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ commands });

  // starts awake by default
  useEffect(() => { SpeechRecognition.startListening({ continuous: true }) }, [])

  // ----------------------------------- Return Div -----------------------------------
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  } else {
    return (
      <Container>
        <Header start={SpeechRecognition.startListening} stop={SpeechRecognition.stopListening} listening={listening} />
        <Background>
          <JarvisGif src={jarvis} alt='jarvis gif' />
          {!active && <p>Say Jarvis to begin</p>}
          {active && <p>At your service sir</p>}
          <p>Status: {listening ? 'Awake' : 'Asleep'}</p>
          {log && <div>
            <h2>Transcript</h2>
            <hr></hr>
            <p>{transcript}</p>
          </div>
          }
        </Background>
      </Container>
    );
  }
}

// ----------------------------------- Styled Components -----------------------------------
const Container = styled.div`
height: 100vh;
width: 100%;
`
const Background = styled.div`
  background-color: #121a23;
  display:flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 94vh;
  color: white;
`

const JarvisGif = styled.img`
margin: 0.5rem 0 0.5rem 0
`
export default App;
