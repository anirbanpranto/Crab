import { Form, Button, Card, Row, Col, Alert, Modal, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import moment from 'moment'

function ViewRating() {
  const [data, setData] = useState({})
  const [user, setUser] = useState({})
  const [curredit, setCurrEdit] = useState({})
  const [address, setAddress] = useState(null)
  const [date, setDate] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [rating, setRating] = useState(0)
  const [carType, setCarType] = useState(null)
  const [serviceType, setServiceType] = useState(null)
  const [show, setShow]= useState(false)
  const history = useNavigate();
  useEffect(() => {
    // Update the document title using the browser API
    loadData()
    //setLogin(false) 
  }, []);

  const loadData = async ()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const loggedIn = localStorage.getItem("loggedIn")
    if (!loggedIn) {
      history('/home');
    }
    setLoggedIn(loggedIn)
    setUser(user)
    axios.get("http://localhost:1337/v1/users?role=washer&limit=1000").then((res) => {
      setData(res.data.results)
    }).catch(err => {
      // setShow(true);
    })
    if (!user || user.user.role !== "admin") {
      history('/home');
    }
  }

  const activate = (index) => {
    axios.patch('http://localhost:1337/v1/users/'+data[index].id, {
            status : "Active"
        }).then((res)=>{
            //user.user = res.data
            //console.log(user)
            localStorage.setItem("user", JSON.stringify(user))
            window.location.reload()
        })
  }

  const ban = (index) => {
    axios.patch('http://localhost:1337/v1/users/'+data[index].id, {
            status: "Banned"
        }).then((res)=>{
            //user.user = res.data
            //console.log(user)
            localStorage.setItem("user", JSON.stringify(user))
            window.location.reload()
        })
  }

  const handleClose = () => setShow(false);

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Status',
      cell:(row, index)=>{
        return  row.status ? <Badge bg="secondary">{row.status}</Badge> : "-"
      }
    },
    {
      name: 'Status',
      cell:(row, index)=>{
        return  row.status ? row.status === "Active"? <Button onClick={()=>ban(index)} style={{backgroundColor:"purple"}}>Ban</Button> : (row.status === "Inactive" || row.status === "Banned") ? <Button onClick={()=>activate(index)} style={{backgroundColor:"purple"}}>Activate</Button> : <Button onClick={()=>ban(index)} style={{backgroundColor:"purple"}}>Ban</Button> : <Button onClick={()=>activate(index)} style={{backgroundColor:"purple"}}>Activate</Button>
      }
    },
    {
      name: 'Registered At',
      selector: row => moment(row.createdAt).format("DD/MM/YY"),
      sortable: true,
    }
  ];

  const archive = (index) => {
    setCurrEdit(data[index])
    axios.patch("http://localhost:1337/v1/appointments/"+data[index].id, {
      status: "Archived"
    }).then((res) => {
      // localStorage.setItem("user", res.data);
      // localStorage.setItem("loggedIn", true);
      loadData()
    })
  }

  const req = async () => {
    axios.post("http://localhost:1337/v1/appointments/rating?rate=" + rating + "&id="+curredit.id, {
      cartype: carType? carType : curredit.cartype,
      serviceType: serviceType? serviceType : curredit.serviceType,
      address: address? address : curredit.address,
      schedule: date ? date : curredit.schedule
    }).then((res) => {
      // localStorage.setItem("user", res.data);
      // localStorage.setItem("loggedIn", true);
      setShow(false);
      loadData()
    })
  }

  const edit = (index) => {
    setCurrEdit(data[index])
    setCarType(null)
    setServiceType(null)
    setDate(null)
    setAddress(null)
    showModal()
  }

  const showModal = () => {
    setShow(true)
  }

  return (
    <div style={{margin:"5%"}}>
      <DataTable
            columns={columns}
            data={data}
        />
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Rate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <h3>{rating}</h3>
            <Form.Range max={5} min={0} onChange={e => {
                    //console.log("e.target.value", e.target.value);
                    setRating(e.target.value)
            }}/>
            <Button style={{backgroundColor:"purple"}} onClick={req}>
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

export default ViewRating;
