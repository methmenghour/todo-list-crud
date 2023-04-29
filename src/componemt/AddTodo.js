import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment/moment';
import { failedNotify, successNotify } from '../Message/MeassageAlert';
import axios from 'axios';
function AddTodo({onAdd}) {
    const [show, setShow] = useState(false);
    const handleClose = () => {
      setShow(false)
      setTodo({ ...todo, title:""});
    };
    const handleShow = () => setShow(true);
    const [todo, setTodo] = useState({
        title:"",
        isCompleted:false,
        createdAt:moment().format('MMMM Do YYYY, h:mm a')
      });
      const handleOnChange = (e) => {
        const newTodo = { ...todo };
        newTodo[e.target.name] = e.target.value;
        setTodo(newTodo);
      };
      const handleSubmit= async (e)=>{
        e.preventDefault();
       if(todo.title!=""){
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/todos`,
            todo
          );
          handleClose();
          onAdd(response.data);
          successNotify("Todo has been added successfully");    
          setTodo({ ...todo, title:""});
        } catch (error) 
        {
          failedNotify(error.message);
        }      
       }else{
        failedNotify("Please Input Text");

       }
    }
    return (
        <>
      <Button variant="outline-primary" onClick={handleShow} className=''>
         Add<i className="bi bi-plus-lg"></i>
      </Button>
      <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        required 
                        type="text"
                        placeholder="Title"
                        autoFocus
                        name='title'
                        onChange={handleOnChange} 
                    />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="warning" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit">
                    Save
                </Button>
                </Modal.Footer>
            </form>
      </Modal>
    </>
    );
}
export default AddTodo;