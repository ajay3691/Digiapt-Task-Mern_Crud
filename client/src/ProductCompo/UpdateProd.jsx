import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    p_id: '',
    p_name: '',
    p_category: '',
    p_image: '',
    p_description: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/${productId}`);
        setProductData(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, [productId]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/api/product/${productId}`, productData);
      console.log('Updated product:', response.data);
      alert('Product updated successfully');
      navigate('/admin');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Update Product</h1>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Product ID:</label>
              <input
                type="text"
                name="p_id"
                value={productData.p_id}
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
                value={productData.p_name}
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
                value={productData.p_category}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Product Image:</label>
              <input
                type="text"
                name="p_image"
                value={productData.p_image}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Product Description:</label>
              <textarea
                name="p_description"
                value={productData.p_description}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductPage;
