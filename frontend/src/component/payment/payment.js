import { Form, Button, Card, Row, Col, Alert, Modal, Badge, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import moment from 'moment'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from './checkout'

const stripePromise = loadStripe('pk_test_51Jy1u2G8YdbT9VosMH23brdXtaNdWufU0CZW7381Nq9TilwNN5XTwwKAYLDXji8MEO28bVC366N7xWuLDYuQADBv00rKVteZgZ');

function ViewRating() {
  const [data, setData] = useState({})
  const [user, setUser] = useState({})
  const [secret, setSecret] = useState("")
  const [curredit, setCurrEdit] = useState({})
  const [address, setAddress] = useState(null)
  const [date, setDate] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [rating, setRating] = useState(0)
  const [carType, setCarType] = useState(null)
  const [serviceType, setServiceType] = useState(null)
  const [show, setShow] = useState(false)
  const [elem, setElem] = useState(null)
  const history = useNavigate();
  const [id, setId] = useState("")
  const [loader, setLoader]= useState(false)
  useEffect(() => {
    // Update the document title using the browser API
    loadData()
    //setLogin(false) 
  }, []);



  const loadData = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const loggedIn = localStorage.getItem("loggedIn")
    setLoggedIn(loggedIn)
    setUser(user)
    axios.get("http://localhost:1337/v1/appointments?customer=" + user.user.id).then((res) => {
      setData(res.data)
    }).catch(err => {
      // setShow(true);
    })
    if (user.user.role !== "customer") {
      history('/home');
    }
    if (!loggedIn) {
      history('/home');
    }
  }

  const handleClose = () => setShow(false);

  const columns = [
    {
      name: 'Address',
      selector: row => row.address,
      sortable: true,
    },
    {
      name: 'Cartype',
      selector: row => row.cartype,
      sortable: true,
    },
    {
      name: 'Service Type',
      selector: row => row.serviceType,
      sortable: true,
    },
    {
      name: 'Schedule',
      selector: row => moment(row.schedule).format("DD/MM/YY"),
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
    },
    {
      name: 'Amount',
      cell: (row, index) => {
        return row.payment ? row.payment.amount : "-"
      }
    },
    {
      name: 'Payment',
      cell: (row, index) => {
        if(row.status === "Accepted" || row.status === "Archived"){
          return row.payment ? row.payment.status === "Paid" ? "Paid" : <Button style={{ backgroundColor: "purple" }} onClick={() => pay(index)}>Pay</Button> : <Button style={{ backgroundColor: "purple" }} onClick={() => pay(index)}>Pay</Button>
        }
        else{
          return "N/A"
        }
      }
    }
  ];

  const pay = async (index) => {
    await axios.get('http://localhost:1337/v1/payments/session?id='+data[index].payment.id).then((res) => {
      setSecret(res.data.client_secret);
      setElem({
        clientSecret: secret
      })
      setElem({
        clientSecret: secret
      })
      setId(data[index].payment.id)
    })
    setLoader(true)
    setTimeout(()=>{
      setLoader(false)
      setShow(true)
    }, 2000)
  }

  return (
    <div style={{ margin: "5%" }}>
      <DataTable
        columns={columns}
        data={data}
      />
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Pay</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Elements stripe={stripePromise} options={elem}>
            <Checkout payment_id={id} />
          </Elements>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={loader} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Processing Your Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please wait a few seconds..
        </Modal.Body>
        <Spinner animation="border" style={{margin:"auto"}} role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <br></br>
      </Modal>
    </div>
  );
}

export default ViewRating;
