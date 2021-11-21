import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

function Logout() {
    const history = useNavigate();
    useEffect(() => {
        // Update the document title using the browser API
        localStorage.clear();
        //setLogin(false) 
        history('/home');
    }, []);
    return (
        <>
        </>
    );
}

export default Logout;