import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {useNavigate} from 'react-router-dom'

function Logout() {
    const history = useNavigate();
    localStorage.clear();
    history('/home');
    return (
        <div>
        </div>
    );
}

export default Logout;