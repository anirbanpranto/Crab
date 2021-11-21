import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/User';

function Warning() {
    const [show, setShow] = useState(true)
    return (
        <div>
            <Row>

            </Row>
            <Row>
                <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Oh snap! Cannot Login to Inactive Account! :(</Alert.Heading>
                    <p>
                        Cannot Login to Banned/Inactive account. If you are not sure why this is happening, please contact your local admin.
                    </p>
                </Alert>
            </Row>
        </div>
    );
}

export default Warning;