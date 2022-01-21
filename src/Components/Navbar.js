import { React, useContext, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import alertContext from '../context/alerts/alertContext';
import logoiCloud from "../logoicloud.png"


export default function Navbar(props) {

    const context = useContext(alertContext);
    const { showAlert } = context
    const APIURL = "http://localhost:5000"
    const ref = useRef(null);
    const [User, setUser] = useState({});
    let navigate = useNavigate();

    const AccountInfo = async () => {
        const response = await fetch(`${APIURL}/api/auth/getuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        if (json.success) {
            // console.log(json);
            setUser(json.user);
            ref.current.click();
        }
        else {
            showAlert("danger", json.message);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    let location = useLocation();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={logoiCloud} alt="" width="30" height="24" className="d-inline-block align-text-top" />
                        &nbsp;iCloud</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About us</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex">
                            <Link className="btn btn-primary btn-sm mx-1" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary btn-sm mx-2" to="/signup" role="button">Signup</Link>
                        </form> :
                            <div>
                                <button onClick={AccountInfo} className='btn btn-primary btn-sm mx-2'>MyAccout</button>
                                <button onClick={handleLogout} className='btn btn-primary btn-sm mx-2'>Logout</button>
                            </div>}
                    </div>
                </div>
            </nav>
            <button type="button" ref={ref} hidden className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='d-flex justify-content-evenly' style={{"paddingLeft":"20","paddingRight":"20px"}}>
                                <label htmlFor="exampleInputEmail1" className="form-label">UserName </label>
                                <p>:</p>
                                <p>{User.name}</p>
                            </div>
                            <div className='d-flex justify-content-evenly' style={{"paddingLeft":"20","paddingRight":"20px"}}>
                                <label htmlFor="exampleInputEmail1" className="form-label">Email Address </label>
                                <p>:</p>
                                <p>{User.email}</p>
                            </div>
                            <div className='d-flex justify-content-evenly' style={{"paddingLeft":"20","paddingRight":"20px"}}>
                                <label htmlFor="exampleInputEmail1" className="form-label">Contact </label>
                                <p>:</p>
                                <p>{User.contact}</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" data-bs-dismiss="modal" className="btn btn-primary btn-sm">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
