import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { failedNotify, successNotify } from '../Message/MeassageAlert';
function UpdateTodo({ todo: todoToUpdate,onUpdate}) {
    const [todo, setTodo] =useState(todoToUpdate);
    const [show, setShow] = useState(false);
    const handleClose = () =>setShow(false);
    const handleShow = () => setShow(true);
    const handleOnChange = (e) => {    
        const updateTodo = { ...todo };   
       if (e.target.type === "checkbox")
         updateTodo[e.target.name] = e.target.checked;
       else updateTodo[e.target.name] = e.target.value;
       setTodo(updateTodo);
       };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/todos/${todo.id}`,
            todo
          );
          handleClose();
          onUpdate(response.data);
          successNotify("Todo has been updated successfully");
        } catch (error) {
          failedNotify(error.message);
        }
      };
    return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
      <i className="bi bi-pencil-square"></i>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                autoFocus
                name='title'
                value={todo.title}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Check
            inline
            label="Completed"
            name="isCompleted"
            type="checkbox"
            id={`inline-checkbox-1`}
            defaultChecked={todoToUpdate.isCompleted}
            onChange={handleOnChange}/>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose} type='submit'>
            Save
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
    </>
    );
}

export default UpdateTodo;