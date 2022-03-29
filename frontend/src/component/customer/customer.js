import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import background from '../../public/bg.png'
import { VscAccount, VscCallOutgoing, VscCreditCard, VscHistory, VscStarFull } from "react-icons/vsc";

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
                        <Card.Title>Crab! Choose a service.</Card.Title>
                        <Card.Body>
                            <Row style={{margin:10}}>
                                <Col>
                                    <Button onClick={()=>profile()} style={{ backgroundColor: "purple", width: 120 }}>
                                        <VscAccount/> Profile
                                    </Button>
                                </Col>
                                <Col>
                                    <Button onClick={()=>make()} style={{ backgroundColor: "purple", width: 120 }}>
                                        <VscCallOutgoing/> Request
                                    </Button>
                                </Col>
                            </Row>
                            <Row style={{margin:10}}>
                                <Col>
                                    <Button onClick={()=>view()} style={{ backgroundColor: "purple", width: 120 }}>
                                        <VscHistory></VscHistory> History
                                    </Button>
                                </Col>
                                <Col>
                                    <Button onClick={()=>rate()} style={{ backgroundColor: "purple", width: 120 }}>
                                        <VscStarFull/> Rate
                                    </Button>
                                </Col>
                            </Row>
                            <Row style={{margin:10}}>
                                <Col>
                                    <Button onClick={()=>pay()} style={{ backgroundColor: "purple", width: 120 }}>
                                        <VscCreditCard></VscCreditCard> Payment
                                    </Button>
                                </Col>
                                <Col></Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Customer;