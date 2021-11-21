import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'

function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("customer")
  const [name, setName] = useState("")
  const [show, setShow] = useState(false);
  const [card, setCard] = useState("");
  const [success, setSuccess] = useState(false);
  const history = useNavigate();
  const reload = () => {
    window.location.reload(false)
  }
  const req = async () => {
    axios.post("http://localhost:1337/v1/auth/register", {
      email: email,
      password: password,
      name: name,
      role: role,
      card: card,
      status: "Inactive"
    }).then((res) => {
      setSuccess(true);
      // localStorage.setItem("user", res.data);
      // localStorage.setItem("loggedIn", true);
      history('/home');
      reload();
    }).catch(err => {
      setShow(true);
    })
  }

  return (
    <div>
      <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
        Registration Failed. Please fill in all fields correctly or check if the email is already associated with any other account.
      </Alert>
      <Alert variant="success" show={success} onClose={() => setSuccess(false)} dismissible>
        Registration Complete, Please log in now
      </Alert>
      <Row>
        <Col sm={3}></Col>
        <Col sm={6}>
          <Card style={{ padding: 40, margin: "10%" }}>
            <Card.Title>Register</Card.Title>
            <Form>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text" placeholder="Enter Name"
                  value={name}
                  onChange={e => {
                    //console.log("e.target.value", e.target.value);
                    setName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email" placeholder="Enter email"
                  value={email}
                  onChange={e => {
                    //console.log("e.target.value", e.target.value);
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => {
                    //console.log("e.target.value", e.target.value);
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="card">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text" placeholder="Enter Card Number"
                  value={card}
                  onChange={e => {
                    //console.log("e.target.value", e.target.value);
                    setCard(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="userType">
                <Form.Label>Register As</Form.Label>
                <Form.Control
                  as="select"
                  value={role}
                  onChange={e => {
                    //console.log("e.target.value", e.target.value);
                    setRole(e.target.value);
                  }}
                >
                  <option value="washer">Washer</option>
                  <option value="customer">Customer</option>
                </Form.Control>
              </Form.Group>
              <Button style={{backgroundColor:"purple"}} onClick={req}>
                Submit
              </Button>
            </Form>
          </Card>
        </Col>
        <Col sm={3}></Col>
      </Row>
    </div>
  );
}

export default Register;
