import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { useLinkClickHandler, useNavigate } from 'react-router-dom'
import DataTable, {memoize} from 'react-data-table-component';
import moment from 'moment'

function Offer() {
  const [data, setData] = useState({})
  const [user, setUser] = useState({})
  const history = useNavigate();

  useEffect(() => {
    // Update the document title using the browser API
    const user = JSON.parse(localStorage.getItem('user'));
    const loggedIn = localStorage.getItem('loggedIn');
    axios.get("http://localhost:1337/v1/appointments?status=Waiting").then((res) => {
      setData(res.data)
    }).catch(err => {
      // setShow(true);
    })
    setUser(user);
    if (user.user.role !== "washer") {
      history('/home');
    }
    if (!loggedIn) {
      history('/home');
    }
    //setLogin(false) 
  }, []);

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
      name: 'Action',
      cell:(row, index)=>{
        return <Button style={{backgroundColor:"purple"}} onClick={() => accept(index)} id={index}> Accept</Button>
      }
    },
  ]

  const accept = (index) => {
    const appointment = data[index];
    console.log(appointment)
    console.log("http://localhost:1337/v1/appointments/accept?id="+appointment.id+"&washer="+user.user.id)
    axios.post("http://localhost:1337/v1/appointments/accept?id="+appointment.id+"&washer="+user.user.id);
  }

  return (
    <div style={{margin:"5%"}}>
      <DataTable
            columns={columns}
            data={data}
        />
    </div>
  );
}

export default Offer;
