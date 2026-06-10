import styled from "styled-components";
import TypesBox from "../../ui/TypesBox";
import { useState } from "react";
import Button from "../../ui/Button";
import { useAddAdvert } from "./useAddAdvert";
import Modal from "../../ui/Modal";
import AdvertAdmin from "./AdvertAdmin";

const StyledAddAdvert = styled.div`
  padding: 1rem 1.6rem;
  max-width: 120rem;
  margin: 8rem auto;
`;

const Label = styled.label`
  color: #fff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 1.4rem;
  color: #fff;
  border-radius: 8px;
  background-color: var(--color-shadow);
  border: none;
  margin: 1.2rem 0 2.2rem 0;
`;

const Textarea = styled.textarea`
  padding: 1.4rem;
  color: #fff;
  border-radius: 8px;
  background-color: var(--color-shadow);
  border: none;
  margin: 1.2rem 0 2.2rem 0;
`;

function AddAdvert() {
  const { addAdvert, isAdding } = useAddAdvert();

  const [advert, setAdvert] = useState({
    title: "",
    description: "",
    link: "",
    file: null,
    start: "",
    end: "",
    btnDescription: "",
  });

  const onFileChange = (event) => {
    const file = event.target.files[0];
    setAdvert({
      ...advert,
      file,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdvert({
      ...advert,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", advert.title);
    formData.append("description", advert.description);
    formData.append("link", advert.link);
    formData.append("file", advert.file); // Make sure this file exists
    formData.append("start", advert.start);
    formData.append("end", advert.end);
    formData.append("btnDescription", advert.btnDescription);

    addAdvert({ formData });
  }

  return (
    <StyledAddAdvert>
      <TypesBox>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="avatar">Wybierz zdjęcie</Label>
          <Input
            type="file"
            id="avatar"
            name="file"
            accept="image/png, image/jpeg"
            onChange={onFileChange}
            required
          />

          <Label htmlFor="title">Tytuł</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={advert.title}
            onChange={handleInputChange}
            required
          />

          <Label htmlFor="text">Tekst</Label>
          <Textarea
            id="text"
            name="description"
            rows="4"
            cols="60"
            value={advert.description}
            onChange={handleInputChange}
            required
          />

          <Label htmlFor="button-link">Link do przycisku</Label>
          <Input
            type="text"
            id="button-link"
            name="link"
            value={advert.link}
            onChange={handleInputChange}
            required
          />

          <Label htmlFor="button-start">Start wyświetlania</Label>
          <Input
            type="datetime-local"
            id="button-start"
            name="start"
            value={advert.start}
            onChange={handleInputChange}
            required
          />

          <Label htmlFor="button-end">Koniec wyświetlania</Label>
          <Input
            type="datetime-local"
            id="button-end"
            name="end"
            value={advert.end}
            onChange={handleInputChange}
            required
          />

          <Label htmlFor="button-description">Tekst w przycisku</Label>
          <Input
            type="text"
            id="button-description"
            name="btnDescription"
            value={advert.btnDescription}
            onChange={handleInputChange}
            required
          />

          <Button type="submit" disabled={isAdding}>
            Zatwierdź
          </Button>
        </Form>

        <Modal>
          <Modal.Open opens="admin-advert">
            <Button>Podgląd przed zatwierdzeniem</Button>
          </Modal.Open>
          <Modal.Window name="admin-advert" bgColor="#700042">
            <AdvertAdmin advert={advert} />
          </Modal.Window>
        </Modal>
      </TypesBox>
    </StyledAddAdvert>
  );
}

export default AddAdvert;
