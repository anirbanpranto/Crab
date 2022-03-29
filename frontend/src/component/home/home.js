import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import background from '../../public/bg.png'

function Home() {
    const history = useNavigate();

    const register = () => {
        history('/register')
    }

    const login = () => {
        history('/login')
    }
    //window.location.reload(false)
    return (
        <div>
            <Row>
                <Col><img style={{ maxWidth: "100%" }} src={background}></img></Col>
                <Col>
                    <Card style={{ padding: 40, margin: "20%", marginTop: "30%" }}>
                        <Card.Title>Crab is at your service!</Card.Title>
                        <Card.Body>
                            <Row style={{margin:10}}>
                                <Button onClick={()=>login()} style={{ backgroundColor: "purple" }}>
                                    Login
                                </Button>
                            </Row>
                            <Row style={{margin:10}}>
                                <Button onClick={()=>register()} style={{ backgroundColor: "purple" }}>
                                    Registration
                                </Button>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Home;