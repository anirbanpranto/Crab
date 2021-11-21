import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import background from '../../public/bg.png'

function Success() {
    const history = useNavigate();
    const {payment_id} = useParams()
    const id = useParams()
    console.log(id)

    useEffect(()=>{
        axios.patch("http://localhost:1337/v1/payments/"+payment_id , {
            status: "Paid"
        })
    }, [])
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
                        <Card.Title>Your Payment Was Succesful!</Card.Title>
                        <Card.Body>
                            Please return back to your homepage now.
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Success;