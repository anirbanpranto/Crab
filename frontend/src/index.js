import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import Register from './component/register/register';

ReactDOM.render(
  <BrowserRouter>
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Mobile Carwash</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/register" element={<Register/>}/>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
