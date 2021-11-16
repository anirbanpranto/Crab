import React, { useContext, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import Register from './component/register/register';
import Login from './component/login/login';
import { UserContext, UserProvider } from './contexts/User';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './component/home/home';
import Logout from './component/logout/logout';


function App() {
  let loggedIn = localStorage.getItem("loggedIn")
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Navbar bg="primary" variant="dark">
            <Container>
              <Navbar.Brand href="/home">Mobile Carwash</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                {loggedIn ? null : <Nav.Link href="/register">Register</Nav.Link>}
                {loggedIn ? null : <Nav.Link href="/login">Login</Nav.Link>}
                {loggedIn ? <Nav.Link href="/logout">Logout</Nav.Link> : null}
              </Nav>
            </Container>
          </Navbar>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/register" element={loggedIn ? <Home/> : <Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
            {/* <Route path="/logout"element={<Logout/>}/> */}
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
