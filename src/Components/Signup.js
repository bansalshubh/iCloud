import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/alerts/alertContext';

const Signup = () => {

  const APIURL = "http://localhost:5000"

  const context = useContext(alertContext);
  const { alert, showAlert } = context

  const [auth, setAuth] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    cpassword: ""
  });

  const onChange = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  }

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.password !== auth.cpassword) {
      alert("Password and Confirm Password should be same");
      navigate('/signup');
      return;
    }
    const response = await fetch(`${APIURL}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: auth.name, email: auth.email, password: auth.password, contact: auth.contact })
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      showAlert("success", " Account Created Successfully");
      navigate('/')
    }
    else
    {
      showAlert("danger", json.message);
      navigate('/signup')
      return;
    }
  }

  return <div className='container my-3'>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Enter Your Name</label>
        <input type="text" onChange={onChange} className="form-control" name="name" id="name" autoComplete="on" aria-describedby="emailHelp" minLength={5} required />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
        <input type="email" onChange={onChange} className="form-control" name="email" id="email" autoComplete="on" aria-describedby="emailHelp" minLength={5} required />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Contact Number</label>
        <input type="text" onChange={onChange} className="form-control" name="contact" id="contact" autoComplete="on" aria-describedby="emailHelp" minLength={10} required />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" onChange={onChange} className="form-control" name='password' id="password" autoComplete="on" minLength={8} required />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
        <input type="password" onChange={onChange} className="form-control" name='cpassword' id="cpassword" autoComplete="on" minLength={8} required />
      </div>
      <button type="submit" className="btn btn-primary">SignUp</button>
    </form>
  </div>;
};

export default Signup;
