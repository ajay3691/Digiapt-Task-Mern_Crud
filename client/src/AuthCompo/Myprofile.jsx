import React, { useContext, useEffect, useState } from 'react';
import { store } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Myprofile = () => {
    const [token, setToken] = useContext(store);
    const [data, setData] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            axios.get('http://localhost:5000/user/myprofile', {
                headers: { 'x-token': token }
            })
                .then((resp) => {
                    setData(resp.data);


                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }/* , [token, navigate] */); 

    return (
        <div className='mt-4 justify-content-center'>
            <h1 className='display-5 text-center mb-3'> Welcome to Dashboard</h1>
            {data && (
                <center>
                    <div className='card' style={{ "width": "20rem" }}>
                        <div className='card-header bg-warning'>
                            <img src='https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg'
                                className='img-thumbnail'
                                width='100%'
                                height='100%' alt='user_image'
                            />
                        </div>
                        <div className='card-body bg-secondary'>
                            <h3 className='card-title text-white'> Hii {data.email}....</h3>
                            <button className='btn btn-primary btn-lg'
                                onClick={() => setToken(null)}>Logout
                            </button>
                        </div>
                    </div>
                </center>
            )}
        </div>
    );
};

export default Myprofile;
