import { MdDescription } from "react-icons/md";
import styled from "styled-components";

const ModalTitle = styled.h1`
  font-size: 2.4rem;
  text-align: center;

  @media (max-width: 36em) {
    font-size: 2rem;
  }
`;

const ModalDescription = styled.div`
  font-size: 1.8rem;
  color: var(--color-primary);

  @media (max-width: 36em) {
    font-size: 1.6rem;
  }
`;

const Separator = styled.hr`
  border: 0;
  border-top: 1px solid #ccc; /* Możesz dostosować kolor i styl kreski */
  margin: 1.6rem 0; /* Odstęp od góry i dołu */
`;

function ModalContent({ desc = "", text = "", points }) {
  const removePrefix = (t) => t?.replace(/^[HGX]\s+(?=\p{L}+)/u, "").trim();

  return (
    <>
      <ModalTitle>
        {removePrefix(text)}&nbsp;
        {points && ` (${points} pkt)`}
      </ModalTitle>
      <Separator />
      <ModalDescription>{removePrefix(desc)}</ModalDescription>
    </>
  );
}

export default ModalContent;
