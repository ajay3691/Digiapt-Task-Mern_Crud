import React, { useState } from 'react';
import axios from 'axios';

const YourComponent = () => {
    const [formData, setFormData] = useState({
        p_id: '',
        p_name: '',
        p_category: '',
        p_image: '',
        p_description: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setFormData({ ...formData, p_image: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://digiapt-task-mern-crud.vercel.app/api/product', formData);
            console.log('Product created successfully:', response.data);
            alert("Product created succesfully")
        } catch (error) {
            if (error.response && error.response.status === 400) {
                if (error.response.data.error && error.response.data.error.includes('duplicate key error')) {
                    console.error('Duplicate key error:', error.response.data);
                } else {
                    console.error('Bad Request:', error.response.data);
                    alert("this id allredy existed")

                }
            } else {
                console.error('Error creating product:', error);
                alert("internal server err")

            }
        }
    };



    return (
        <div className="container mt-5">
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Product ID:</label>
                            <input
                                type="text"
                                name="p_id"
                                value={formData.p_id}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Product Name:</label>
                            <input
                                type="text"
                                name="p_name"
                                value={formData.p_name}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Product Category:</label>
                            <input
                                type="text"
                                name="p_category"
                                value={formData.p_category}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        {/*  <div className="form-group">
                            <label>Product Image:</label>
                            <input
                                type="text"
                                name="p_image"
                                placeholder=' "copy image adrees url " in googl paste here'
                                value={formData.p_image}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div> */}
                        <div className="form-group">
                            <label>Product Image:</label>
                            <input
                                type="text"
                                name="p_image"
                                placeholder='copy image adrees url " in googl paste here'
                                value={formData.p_image}
                                onChange={handleChange}
                                className="form-control"
                            />
                            <br />
                            <label className='text-primary'>OR</label>
                            <br />
                            <label>Upload Image:</label>
                            <input
                                type="file"
                                accept="image/jpeg, image/png"
                                onChange={handleImageUpload}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label>Product Description:</label>
                            <textarea
                                name="p_description"
                                value={formData.p_description}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Create Product
                        </button>
                    </div>
                </div>

            </form>
        </div>

    );
};

export default YourComponent;
