import { Form, Button, Card, Row, Col, Alert, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import background from '../../public/bg.png'

function Profile() {
    const history = useNavigate();
    const [user, setUser] = useState({})
    const [name, setName] = useState(null)
    const [card, setCard] = useState(null)
    const [show, setShow] = useState(false)
    useEffect(() => {
        const u = JSON.parse(localStorage.getItem("user"))
        setUser(u)
        const loggedIn = localStorage.getItem("loggedIn")
        if (!loggedIn) {
            history('/home')
        }
    }, [])

    const make = () => {
        history('/washrequest')
    }

    const edit = () => {
        setShow(true)
    }

    const pay = () => {
        history('/pay')
    }

    const req = () => {
        axios.patch('http://localhost:1337/v1/users/'+user.user.id, {
            name : name ? name : user.user.name,
            card : card ? card : user.user.card
        }).then((res)=>{
            user.user = res.data
            //console.log(user)
            localStorage.setItem("user", JSON.stringify(user))
            window.location.reload()
        })
    }

    const handleClose = () => setShow(false)
    //window.location.reload(false)
    return (
        <div>
            <Row>
                <Col><img style={{ maxWidth: "100%" }} src={background}></img></Col>
                <Col>
                    <Card style={{ padding: 40, margin: "20%", marginTop: "30%" }}>
                        <Card.Title>Profile</Card.Title>
                        <Card.Body>
                            <Row style={{ margin: 10 }}>
                                <Col sm={3}><b>Name </b></Col>
                                <Col sm={9}>{user.user ? user.user.name : "-"}</Col>
                            </Row>
                            <Row style={{ margin: 10 }}>
                                <Col sm={3}><b>Email </b></Col>
                                <Col sm={9}>{user.user ? user.user.email : "-"}</Col>
                            </Row>
                            {user.user ? (user.user.role === "customer" || user.user.role === "washer") ? <Row style={{ margin: 10 }}>
                                <Col sm={3}><b>Card </b></Col>
                                <Col sm={9}>{user.user ? user.user.card : "-"}</Col>
                            </Row> : <></> : <></>}
                            {user.user ? (user.user.role === "washer") ? <Row style={{ margin: 10 }}>
                                <Col sm={3}><b>Profile Status </b></Col>
                                <Col sm={9}>{user.user ? user.user.status : "-"}</Col>
                            </Row> : <></> : <></>}
                            <Button style={{ backgroundColor: "purple" }} onClick={() => edit()}>Edit</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text" placeholder="Enter Name"
                                value={name ? name : user.user ? user.user.name : ""}
                                onChange={e => {
                                    //console.log("e.target.value", e.target.value);
                                    setName(e.target.value)
                                }}
                            />
                        </Form.Group>
                        {user.user ? (user.user.role === "customer" || user.user.role === "washer") ? <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Card</Form.Label>
                            <Form.Control
                                type="text" placeholder="Enter Name"
                                value={card ? card : user.user ? user.user.card : ""}
                                onChange={e => {
                                    //console.log("e.target.value", e.target.value);
                                    setName(e.target.value)
                                }}
                            />
                        </Form.Group> : <></> : <></>}
                        <Button style={{ backgroundColor: "purple" }} onClick={req}>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Profile;