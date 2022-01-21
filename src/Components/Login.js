import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import alertContext from '../context/alerts/alertContext';

export default function Login() {

    const APIURL = "http://localhost:5000"

    const context = useContext(alertContext);
    const {showAlert} = context

    const [auth, setAuth] = useState({
        email: "",
        password: ""
    });

    const onChange = (e) => {
        setAuth({ ...auth, [e.target.name]: e.target.value })
    }

    let history = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        // console.log("In on Submit");
        const response = await fetch(`${APIURL}/api/auth/loginuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: auth.email, password: auth.password })
        });
        const json = await response.json();
        // console.log(json);
        if(json.success)
        {
            localStorage.setItem("token",json.authtoken);
            showAlert("success","Logged in Successfully");
            history('/');
        }
        else
            showAlert("danger",json.message);
    }

    return <div>
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" onChange={onChange} name="email" value={auth.email} aria-describedby="emailHelp" autoComplete="on" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={onChange} value={auth.password} name="password" autoComplete="on" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
}
