import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

function Request() {
  const [carType, setCarType] = useState("Sedan")
  const [serviceType, setServiceType] = useState("Normal")
  const [user, setUser] = useState({})
  const [address, setAddress] = useState("Some Address")
  const [schedule, setSchedule] = useState(Date.now())
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const history = useNavigate();
  useEffect(() => {
    // Update the document title using the browser API
    const user = JSON.parse(localStorage.getItem('user'));
    const loggedIn = localStorage.getItem('loggedIn');
    setUser(user);
    if(user.user.role !== "customer"){
      history('/home');
    }
    if(!loggedIn){
      history('/home');
    }
    //setLogin(false) 
}, []);
  const reload = () => {
    window.location.reload(false)
  }
  const req = async () => {
    axios.post("http://localhost:1337/v1/appointments/", {
      customer: user.user.id,
      cartype: carType,
      serviceType: serviceType,
      address: address,
      schedule: schedule,
      status: "Waiting"
    }).then((res) => {
      setSuccess(true);
      // localStorage.setItem("user", res.data);
      // localStorage.setItem("loggedIn", true);
    }).catch(err => {
      setShow(true);
    })
  }

  return (
    <div>
      <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
        Request failed, please fill in all the fields properly
      </Alert>
      <Alert variant="success" show={success} onClose={() => setSuccess(false)} dismissible>
      Request Created, You can now view them on the view requests page.
      </Alert>
      <Row>
        <Col sm={3}></Col>
        <Col sm={6}>
          <Card style={{ padding: 40, margin:"10%" }}>
            <Card.Title>Wash Request</Card.Title>
            <Form>
              <Form.Group className="mb-3" controlId="userType">
                <Form.Label>Car Type</Form.Label>
                <Form.Control
                  as="select"
                  value={carType}
                  onChange={e => {
                    //console.log("e.target.value", e.target.value);
                    setCarType(e.target.value);
                  }}
                >
                  <option value="SUV">Suv</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Truck">Truck</option>
                  <option value="Hatchback">Hatchback</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="userType">
                <Form.Label>Service Type</Form.Label>
                <Form.Control
                  as="select"
                  value={serviceType}
                  onChange={e => {
                    //console.log("e.target.value", e.target.value);
                    setServiceType(e.target.value);
                  }}
                >
                  <option value="Deep Clean">Deep Clean</option>
                  <option value="Normal">Normal</option>
                  <option value="Interior Vacuum">Interior Vacuum</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text" placeholder="Enter Name"
                  value={address}
                  onChange={e => {
                    //console.log("e.target.value", e.target.value);
                    setAddress(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Schedule</Form.Label>
                <Form.Control
                  type="date" placeholder="Schedule"
                  value={schedule}
                  onChange={e => {
                    //console.log("e.target.value", e.target.value);
                    setSchedule(e.target.value);
                  }}
                />
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

export default Request;
