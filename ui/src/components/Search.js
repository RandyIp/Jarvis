import styled from 'styled-components'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fab)

const Search = ({ googleCmd, setGoogleCmd }) => {
  // set up states
  const [googleSearch, setGoogleSearch] = useState('')
  const [googleCards, setGoogleCards] = useState(false)
  const [youtubeSearch, setYoutubeSearch] = useState('')
  const [youtubeCards, setYoutubeCards] = useState(false)

  // if googleCmd sent by Jarvis, initiate the commands
  if (googleCmd.length > 0) {
    setGoogleCmd('')
  }
  return (<div>
    <ContainerFlex>
      <FontAwesomeIcon icon={['fab', 'google']} />
      <form>
        <input value={googleSearch} onChange={(e) => setGoogleSearch(e.target.value)}></input>
        <button>Search</button>
      </form>
    </ContainerFlex>
    <ContainerFlex>
      <FontAwesomeIcon icon={['fab', 'youtube']} />
      <form>
        <input value={youtubeSearch} onChange={(e) => setYoutubeSearch(e.target.value)}></input>
        <button>Search</button>
      </form>
    </ContainerFlex>
  </div>)
}

const ContainerFlex = styled.div`
display: flex;
`

export default Search