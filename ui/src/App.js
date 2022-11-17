import React from 'react';
import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import jarvis from './assets/jarvis.gif'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import toast, { Toaster } from 'react-hot-toast';
import CmdModal from './modals/CmdModal.js';
import KeyModal from './modals/KeyModal.js'
import Header from './components/Header.js'
import Logs from './components/Logs.js'

function App() {

  // ----------------------------------- States -----------------------------------
  const [log, setLog] = useState(false);
  const [active, setActive] = useState(false);
  const [addingKeyword, setAddingKeyword] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [keywordForm, setKeywordForm] = useState('');
  const [keywordCount, setKeywordCount] = useState(0);
  const [node, setNode] = useState('parameter');
  const [commandHistory, setCommandHistory] = useState([]);
  const [cmdModal, setCmdModal] = useState(false);
  const [parseModal, setParseModal] = useState(false);
  const [keyModal, setKeyModal] = useState(false);
  let words = useRef([]);

  // ----------------------------------- Commands -----------------------------------
  const commands = [
    {
      command: '*',
      callback: async (result) => {
        // wake jarvis up
        if (!active) {
          let translated = await translation(result, 'admin')
          if (translated === 'Jarvis') {
            setActive(true)
          }
        } else {
          // generic translation
          let translated = await translation(result, 'parameter')
          let funcWord = translated.split(' ')[0]
          let paramWords = translated.substring(funcWord.length)

          if (translated === 'show logs') {
            setLog(true);
            setActive(false);
            // setCommandHistory([...commandHistory, translated]);
          }

          else if (translated === 'reset logs') {
            resetTranscript()
            setActive(false)
            // setCommandHistory([...commandHistory, translated])
          }

          else if (translated === 'hide logs') {
            setLog(false)
            setActive(false)
            // setCommandHistory([...commandHistory, translated])
          }

          else if (funcWord === 'open') {
            window.open(`https://${paramWords.replace(/\s/g, '')}.com`, '_blank')
            setActive(false)
            // setCommandHistory([...commandHistory, translated])
          }

          else if (funcWord === 'Google') {
            window.open(`https://google.com/search?q=${result.replace(/\s/g, '+')}`)
            setActive(false)
            // setCommandHistory([...commandHistory, translated])
          }
        }
      }
    },
    {
      command: 'Jarvis shut down',
      callback: () => SpeechRecognition.stopListening(),
      description: 'Use this command to turn Jarvis off'
    },
    {
      command: 'Jarvis play shoot to thrill',
      callback: () => window.open('https://www.youtube.com/watch?v=AD6wqKo51MU&t=109s', '_blank'),
      description: 'Use this command to party~'
    },
    {
      command: 'Keyword *',
      callback: (result) => {
        if (addingKeyword) {
          setKeywordCount(keywordCount + 1)
          words.current = [...words.current, result]
          axios.post('http://localhost:1128/keywords', { word: result, func: node, keyword: keywordForm })
        }
        if (keywordCount === 2) {
          setAddingKeyword(false)
          setKeywords([...keywords, keywordForm])
          toast.success('Your keyword has been created!')
        }
      }
    }
  ]

  // ----------------------------------- Voice Recognition -----------------------------------
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ commands });


  // ----------------------------------- Use Effect -----------------------------------
  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true })
    let temp_arr = []
    let temp_arr1 = []
    axios.get('http://localhost:1128/keywords')
      .then(result => {
        for (let i of result.data[0]) {
          temp_arr.push(i.keyword)
        }
        for (let i of result.data[1]) {
          temp_arr1.push(i.word)
        }
        words.current = temp_arr1
        setKeywords(temp_arr)
      })
  }, [])


  // ----------------------------------- Translation Function -----------------------------------
  const translation = async (str, func = 'parameter') => {
    let temp_arr = []
    for (let i of words.current) {
      if (str.includes(i)) temp_arr.push(i)
    }
    const translator = await axios.get('http://localhost:1128/translator', { wordArray: temp_arr, func: func })
    let translated = str
    for (let i of translator.data) {
      translated = translated.replace(i.word, i.keyword)
    }
    return translated
  }

  const test = () => {
    console.log('we hit the test')
    console.log('This is the state of active:', active)
    setActive(prevState => !prevState)
    console.log('This is the state of active:', active)
  }

  useEffect(() => {

  }, [test])
  // ----------------------------------- Return Div -----------------------------------
  return (
    <Container>
      <CmdModal cmdModal={cmdModal} setCmdModal={setCmdModal} commands={commands} />
      <KeyModal keyModal={keyModal} setKeyModal={setKeyModal} keywords={keywords} addingKeyword={addingKeyword} setAddingKeyword={setAddingKeyword} keywordCount={keywordCount} setKeywordCount={setKeywordCount} keywordForm={keywordForm} setKeywordForm={setKeywordForm} node={node} setNode={setNode} />
      <Header start={SpeechRecognition.startListening} stop={SpeechRecognition.stopListening} listening={listening} setCmdModal={setCmdModal} setParseModal={setParseModal} setKeyModal={setKeyModal} log={log} setLog={setLog} active={active} />
      {!log && <Background>
        <JarvisGif src={jarvis} alt='jarvis gif' />
        <p>Status: {listening ? 'Awake' : 'Asleep'}</p>
        {log && <div>
          <h2>Transcript</h2>
          <hr></hr>
          <p>{transcript}</p>
        </div>
        }
      </Background>}
      {log && <Logs transcript={transcript} words={words} />}
      <Toaster />
    </Container>
  );

}

// ----------------------------------- Styled Components -----------------------------------
const Container = styled.div`
height: 100vh;
width: 100%;
display: grid;
grid-template-rows: 0.5fr 9.5fr
`
const Background = styled.div`
  background-color: #121a23;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: white;
`

const JarvisGif = styled.img`
margin: 0.5rem 0 0.5rem 0
`
export default App;
