import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTodo from '../componemt/AddTodo';
import Card from 'react-bootstrap/Card';
import UpdateTodo from '../componemt/UpdateTodo';
import axios from 'axios';
import { failedNotify, successNotify } from '../Message/MeassageAlert';
function Todos() {
    const [todos, setTodos] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filter, setFilter] = useState("");
    let allTodos = todos;

   // search
    if (searchText) {
      allTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }
     // filter
     if (filter) {
      allTodos = allTodos.filter((todo) =>
          (filter === "completed" && todo.isCompleted) ||
          (filter === "pending" && !todo.isCompleted)
      );
    }
    const addTodo = (todo) => {
        setTodos([todo, ...todos]);
      };
    const deletedTodo = async (todo) => {
        try {
          const response = await axios.delete(
            `${process.env.REACT_APP_BACKEND_URL}/todos/${todo.id}`,
            todo
          );
          let newTodos = todos.filter((t) => t.id !== todo.id);
         setTodos(newTodos);
         successNotify("Todo has been deleted successfully");
        } catch (error) {
          failedNotify(error.message);
        }
      };
    const updateTodo = (todo) => {
        const allTodos = [...todos];
        const index = todos.findIndex((t) => t.id === todo.id);
        allTodos[index] = todo;
        setTodos(allTodos);
      
      };
    useEffect(() => {
        const fetchTodos = async () => {
         try {
           const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/todos`);
           setTodos(response.data);
         } catch (error) {}
       };
       fetchTodos();
     },[]);
    return (
        <Container fluid  className='mt-3'>
          <Row>
            <Col md={10}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Search Todo"
                         onChange={(e) => setSearchText(e.target.value)}
                         />
                    </Form.Group>
                </Form>
            </Col>
            <Col md={1}>
                <Form.Select
                  onChange={(e) => setFilter(e.target.value)}>
                        <option value="">All</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>            
                </Form.Select>
            </Col>
            <Col md={1}>
              <AddTodo onAdd={addTodo}></AddTodo>
            </Col>
          </Row>
          <Row>
             {
             allTodos.map(todo=>(
                <Card style={{ width: '20rem' ,backgroundColor:"#f0f8ff"}} className='ms-3 mt-3' key={todo.id}>
                <Card.Body>
                <Card.Text>Todo : <label htmlFor="Todo">{todo.title}</label></Card.Text>
                <Card.Text>Status : 
                    <label htmlFor="Status" style={{backgroundColor:todo.isCompleted ? "#00ff00" :"#ffd700"}}>
                            {todo.isCompleted?"Completed":"Pedding"}
                    </label></Card.Text>
                <Card.Text>CreatedAt : {todo.createdAt}</Card.Text>  
                </Card.Body>
                <Card.Footer className='d-flex justify-content-center'>
                    <UpdateTodo todo={todo} onUpdate={updateTodo}></UpdateTodo>
                    <Button variant="outline-danger" className='ms-4'
                     onClick={() => {
                        deletedTodo(todo);
                      }}>
                        <i className="bi bi-trash"></i>
                    </Button> 
                </Card.Footer>
                </Card>
             ))}
           </Row>
      </Container>
    );
}

export default Todos;