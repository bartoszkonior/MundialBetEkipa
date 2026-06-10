import { Link } from "react-router-dom";
import styled from "styled-components";

const ModalAdvert = styled.div`
  width: 100rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3.8rem;

  @media (max-width: 34em) {
    width: 100%;
    flex-direction: column;
    justify-content: center;
  }
`;

const AdvertImg = styled.img`
  width: 50%;
  border-radius: 16px;

  @media (max-width: 34em) {
    width: 100%;
  }
`;

const ModalBox = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
  padding-bottom: 1.8rem;
`;

const ModalHeader = styled.h2`
  font-size: 2.6rem;
  color: #fff;
  font-weight: 700;
  letter-spacing: -0.5px;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 1.6rem;
`;

const ModalText = styled.p`
  color: #fff;
  margin-bottom: 3.2rem;
  font-size: 1.8rem;
  text-align: center;

  width: 100%;
  word-wrap: break-word;
  white-space: normal;
`;

const Button = styled.button`
  display: inline-block;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 0 1.8rem 1rem rgba(0, 0, 0, 0.1);

  @media (max-width: 34em) {
    font-size: 1.4rem;
    padding: 0.8rem 1rem;
  }

  color: #fff;
  background-color: #e10103;

  &:hover {
    background-color: #b40102;
  }
`;

function AdvertAdmin({ advert }) {
  const { file, title, description, link, btnDescription } = advert;

  return (
    <ModalAdvert>
      {file && <AdvertImg src={URL.createObjectURL(file)} alt="Preview" />}
      <ModalBox>
        <ModalHeader>{title}</ModalHeader>
        <ModalText>{description}</ModalText>

        <Button as={Link} to={link} target="_blank">
          {btnDescription}
        </Button>
      </ModalBox>
    </ModalAdvert>
  );
}

export default AdvertAdmin;
