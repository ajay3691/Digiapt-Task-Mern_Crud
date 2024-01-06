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
            axios.get('https://digiapt-task-mern-crud-re4s.vercel.app/user/myprofile', {
                headers: { 'x-token': token }
            })
                .then((resp) => {
                    setData(resp.data);
                    navigate('/admin');
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }/* , [token, navigate] */);

    return (
        <div>

        </div>
    );
};

export default Myprofile;
