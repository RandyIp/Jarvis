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
    },
  };

  // ----------------------------------- Return Div -----------------------------------
  return (<Modal isOpen={cmdModal} onRequestClose={() => setCmdModal(false)}>
    <Container>
      <h1>Commands (* is your arguments)</h1>
      <h1>Description</h1>
    </Container>
    {commands.map(entry => (
      <Container>
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
export default CmdModal