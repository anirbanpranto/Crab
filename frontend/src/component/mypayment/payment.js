import { Badge, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import moment from 'moment'

function ViewRating() {
  const [data, setData] = useState({})
  const [user, setUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  const [show, setShow] = useState(false)
  const history = useNavigate();
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
      name: 'Amount',
      cell: (row, index) => {
        return row.payment ? row.payment.amount : "-"
      }
    },
    {
      name: 'Payment',
      cell: (row, index) => {
        return row.payment ? row.payment.status === "Paid" ? <Badge style={{backgroundColor:"green"}}>Paid</Badge> : <Badge style={{backgroundColor:"red"}}>Due</Badge> : <Badge style={{backgroundColor:"red"}}>Due</Badge>
      }
    }
  ];

  return (
    <div style={{ margin: "5%" }}>
      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  );
}

export default ViewRating;