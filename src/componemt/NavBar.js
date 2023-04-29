import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
function NavBar() {
    return (
        <>
        <Navbar bg="primary" variant="light">
          <Container fluid>
            <Navbar.Brand href="#home" className="text-white">Project Todo-List</Navbar.Brand>
          </Container>
        </Navbar>
      </>
    );
}

export default NavBar;