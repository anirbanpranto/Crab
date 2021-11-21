import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import background from '../../public/bg.png'

function Customer() {
    const history = useNavigate();

    const make = () => {
        history('/washrequest')
    }

    const view = () => {
        history('/viewrequest')
    }

    const pay = () => {
        history('/pay')
    }

    const rate = () => {
        history('/rating')
    }

    const profile = () => {
        history('/profile')
    }
    //window.location.reload(false)
    return (
        <div>
            <Row>
                <Col><img style={{ maxWidth: "100%" }} src={background}></img></Col>
                <Col>
                    <Card style={{ padding: 40, margin: "20%", marginTop: "30%" }}>
                        <Card.Title>Welcome to Mobile Carwash</Card.Title>
                        <Card.Body>
                            <Row style={{margin:10}}>
                                <Button onClick={()=>profile()} style={{ backgroundColor: "purple" }}>
                                    View and Edit Profile
                                </Button>
                            </Row>
                            <Row style={{margin:10}}>
                                <Button onClick={()=>make()} style={{ backgroundColor: "purple" }}>
                                    Make a Wash Request
                                </Button>
                            </Row>
                            <Row style={{margin:10}}>
                                <Button onClick={()=>view()} style={{ backgroundColor: "purple" }}>
                                    View Wash Requests
                                </Button>
                            </Row>
                            <Row style={{margin:10}}>
                                <Button onClick={()=>rate()} style={{ backgroundColor: "purple" }}>
                                    Rate a Service
                                </Button>
                            </Row>
                            <Row style={{margin:10}}>
                                <Button onClick={()=>pay()} style={{ backgroundColor: "purple" }}>
                                    View and Make Payments
                                </Button>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Customer;