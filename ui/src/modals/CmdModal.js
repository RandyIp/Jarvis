import Modal from 'react-modal';
import styled from 'styled-components'

const CmdModal = ({ cmdModal, setCmdModal, commands }) => {

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

  // ----------------------------------- Return Div -----------------------------------
  return (<Modal isOpen={cmdModal} onRequestClose={() => setCmdModal(false)}>
    <CloseButton onClick={() => setCmdModal(false)}>X</CloseButton>
    <Container>
      <h1>Commands (* is your arguments)</h1>
      <h1>Description</h1>
    </Container>
    {commands.map(entry => (
      <Container key={entry.command}>
        <p>{entry.command}</p>
        <p>{entry.description}</p>
      </Container>
    ))}
  </Modal>)
}

const Container = styled.div`
display: grid;
grid-template-columns: 1fr 1fr
`

const CloseButton = styled.h2`
position: absolute;
top: 1%;
right: 1%;
margin: 0;
cursor: pointer;
`
export default CmdModal