import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ModalFormResponsible = ({ responsable, setResponsable, handleSubmit, buttonForm, resetForm, showModal, setShowModal }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponsable((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{buttonForm === 'Enviar' ? 'Agregar Responsable' : 'Actualizar Responsable'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del Responsable"
              name="Nom_Responsable"
              value={responsable.Nom_Responsable}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEstado">
            <Form.Label>Estado</Form.Label>
            <Form.Control
              as="select"
              name="estado"
              value={responsable.estado}
              onChange={handleChange}
              required
            >
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            {buttonForm}
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalFormResponsible;
