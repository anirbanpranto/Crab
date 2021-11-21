import React, { useContext, useEffect, useState } from 'react';
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
import Sound from './component/sound/sound';
import Washer from './component/washer/washer'
import Admin from './component/admin/admin'
import Customer from './component/customer/customer'
import Warning from './component/contact/warning'
import Request from './component/washreq/washreq';
import View from './component/viewwashreq/viewwashreq'
import Offers from './component/offers/offers'
import ViewRating from './component/rating/viewrating';
import ViewWRating from './component/rating washer/viewrating'
import Payment from './component/payment/payment'
import Profile from './component/profile/profile';
import Jobs from './component/jobs/jobs'
import MyPay from './component/mypayment/payment';
import Success from './component/success/success'

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    let loggedIn = localStorage.getItem("loggedIn")
    let user = JSON.parse(localStorage.getItem("user"))
    setUser(user);
    setLoggedIn(loggedIn);
  }, [])
  console.log(user)
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Navbar style={{backgroundColor:"purple"}} variant="dark">
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
            <Route path="/" element={<Home />} />
            <Route path="/home" element={(loggedIn && user.user) ? (user.user.role === "customer" ? <Customer /> : user.user.role === "washer" && user.user.status === "Active" ? <Washer /> : user.user.role === "washer" && !(user.user.status === "Active") ? <Warning /> : user.user.role === "admin" ? <Admin /> : <Home />) : <Home />} />
            <Route path="/register" element={loggedIn ? <Home /> : <Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/washrequest" element={<Request />} />
            <Route path="/viewrequest" element={<View />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/sound" element={<Sound />} />
            <Route path="/rating" element={<ViewRating />} />
            <Route path="/myrating" element={<ViewWRating />} />
            <Route path="/pay" element={<Payment />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/mypay" element={<MyPay />} />
            <Route path="/successful/:appointment_id" element={<Success />} />
            {/* <Route path="/logout"element={<Logout/>}/> */}
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
