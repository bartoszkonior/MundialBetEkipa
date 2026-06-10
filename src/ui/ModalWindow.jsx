import { createPortal } from "react-dom";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: auto;
  max-width: 90%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.bgColor || "#700042"}; // Domyślny kolor
  border-radius: 16px;
  box-shadow: var(--shadow-lg);
  padding: 2.8rem;
  transition: all 0.5s;

  @media (max-width: 34em) {
    height: 70rem;
    width: 80%;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 22, 84, 0.3);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

function ModalWindow({ children, bgColor, onClose }) {
  return createPortal(
    <Overlay onClick={onClose}>
      <StyledModal
        bgColor={bgColor} // Przekazanie koloru tła do StyledModal
        onClick={(e) => e.stopPropagation()} // Zapobiega zamknięciu modala przy kliknięciu wewnątrz
      >
        {children}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

export { ModalWindow };
