import { Form, Button, Card, Row, Col, Alert, Modal, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import moment from 'moment'

function ViewWRating() {
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
    setLoggedIn(loggedIn)
    setUser(user)
    axios.get("http://localhost:1337/v1/appointments?washer=" + user.user.id).then((res) => {
      setData(res.data)
    }).catch(err => {
      // setShow(true);
    })
    if (user.user.role !== "washer") {
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
      name: 'Rating',
      cell:(row, index)=>{
        return  row.rating ? <Badge bg="secondary">{row.rating.rate}</Badge> : <Badge style={{backgroundColor:"red"}}>Not Rated</Badge> 
      }
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

export default ViewWRating;