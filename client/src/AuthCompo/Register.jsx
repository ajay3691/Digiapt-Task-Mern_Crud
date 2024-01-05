import axios from 'axios';
import React, { useState } from 'react';

const Register = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        confirmpassword: "",
    });

    const [error, setError] = useState(""); // State for error message
    const changeHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(data);

        // Client-side validation
        if (data.password !== data.confirmpassword) {
            setError("Passwords do not match");
            return;
        }

        setError(null);

        axios.post("digiapt-task-mern-crud-btz2ukwap-ajay3691.vercel.app/user/register", data)
            .then((resp) => {
                alert("User registered successfully");
            })
            .catch((error) => {
                console.error(error);
                setError("allredy registerd this mail.");
            });

      
    };

    return (
        <div>
            <center>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-5">
                            <form /* onSubmit={submitHandler} */>
                                <h3>Register Page</h3>
                                <div className="form-group">
                                    <input type="text" name="email" placeholder="Email" onChange={changeHandler} className='form-control' />
                                </div>
                                <div className="form-group">
                                    <input type="text" name="password" placeholder="Password" onChange={changeHandler} className='form-control' />
                                </div>
                                <div className="form-group">
                                    <input type="text" name="confirmpassword" placeholder="Confirm password" onChange={changeHandler} className='form-control' />
                                </div>
                                {error && <p className="text-danger">{error}</p>} 
                                <button className='btn btn-success' onClick={submitHandler}>Register</button>
                                {/* <div className="form-group">
                                    <input type="submit" className='btn btn-success' value="Register" />
                                </div> */}
                            </form>
                        </div>
                    </div>
                </div>
            </center>
        </div>
    );
};

export default Register;
