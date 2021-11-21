import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/User';

function Pricing() {
    const [rate, setRate] = useState(0)
    //console.log(state)
    useEffect(()=>{
        const loggedIn = localStorage.getItem("loggedIn");
        const user = JSON.parse(localStorage.getItem("user"))
        axios.get("http://localhost:1337/v1/pricing").then(res => {
            if(res.data[0])
                setRate(res.data[0].rate)
        }).catch(err=>{
            //setShow(true);
        })
        if(!loggedIn){
            history('/home');
        }
        if(!user || user.user.role !== "admin"){
            history('/home');
        }
    }, [])
    const history = useNavigate();
    const reload = () => {
        window.location.reload(false)
    }
    const req = async () => {
        await axios.post("http://localhost:1337/v1/pricing", {
            rate : rate
        }).then(res => {
            reload();
        }).catch(err=>{
            //setShow(true);
        })
    }

    return (
        <div>
            <Row>
                <Col sm={3}></Col>
                <Col sm={6}>
                    <Card style={{ padding: 40, margin: "10%" }}>
                        <Card.Title>Pricing (Current Rate : {rate})</Card.Title>
                        <Form>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>New Rate</Form.Label>
                                <Form.Control
                                    type="text" placeholder="Rate"
                                    value={rate}
                                    onChange={e => {
                                        //console.log("e.target.value", e.target.value);
                                        setRate(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Button style={{backgroundColor:"purple"}} onClick={req}>
                                Set
                            </Button>
                        </Form>
                    </Card>
                </Col>
                <Col sm={3}></Col>
            </Row>
        </div>
    );
}

export default Pricing;