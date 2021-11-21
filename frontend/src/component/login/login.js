import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/User';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [state, dispatch] = useContext(UserContext)
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    //console.log(state)
    useEffect(()=>{
        const loggedIn = localStorage.getItem("loggedIn");
        if(loggedIn){
            history('/home');
        }
    }, [])
    const history = useNavigate();
    const reload = () => {
        window.location.reload(false)
    }
    const req = async () => {
        await axios.post("http://localhost:1337/v1/auth/login", {
            email: email,
            password: password
        }).then(res => {
            localStorage.setItem("loggedIn", true)
            localStorage.setItem("user", JSON.stringify(res.data));
            setSuccess(true);
            history('/home');
            reload();
        }).catch(err=>{
            setShow(true);
        })
    }

    return (
        <div>
            <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
                Login Failed
            </Alert>
            <Alert variant="success" show={success} onClose={() => setSuccess(false)} dismissible>
                Login Successful
            </Alert>
            <Row>
                <Col sm={3}></Col>
                <Col sm={6}>
                    <Card style={{ padding: 40, margin: "10%" }}>
                        <Card.Title>Login</Card.Title>
                        <Form>
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
                            <Button style={{backgroundColor:"purple"}} onClick={req}>
                                Login
                            </Button>
                        </Form>
                    </Card>
                </Col>
                <Col sm={3}></Col>
            </Row>
        </div>
    );
}

export default Login;