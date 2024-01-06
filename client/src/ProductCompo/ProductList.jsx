import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ page: 1, pageSize: 10, searchTerm: '' });
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [updateOption, setUpdateOption] = useState(null); // 'json' or 'form'

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://digiapt-task-mern-crud-re4s.vercel.app/api/products', { params: filters });
      setProducts(response.data);
      const total = parseInt(response.headers['x-total-pages'], 10) || 0;
      setTotalPages(total);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSearch = () => {
    setFilters((prevFilters) => ({ ...prevFilters, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prevFilters) => ({ ...prevFilters, page: newPage }));
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      try {
        await axios.delete(`https://digiapt-task-mern-crud-re4s.vercel.app/api/product/${productId}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleUpdate = async (productId) => {
    const chosenOption = window.prompt('Choose update option: JSON or Form');

    if (chosenOption && chosenOption.toLowerCase() === 'json') {
      const jsonInput = window.prompt('Enter updated data (JSON format):');

      try {
        const updatedData = JSON.parse(jsonInput);
        await axios.put(`https://digiapt-task-mern-crud-re4s.vercel.app/api/product/${productId}`, updatedData);
        fetchData();
      } catch (error) {
        console.error('Error updating product with JSON data:', error);
        alert('Invalid JSON input. Please try again with valid JSON data.');
      }
    } else if (chosenOption && chosenOption.toLowerCase() === 'form') {
      navigate(`/updateProduct/${productId}`);

    } else {
      alert('Invalid option. Please choose "JSON" or "Form".');
    }
  };


  const handleAddProducts = () => {
    navigate('/addProducts');
  };

  return (
    <div className="container mt-5">

      <h1 className="mb-4">Product List</h1>
      <div className="form-row mb-3">
        <div className="col-md-10">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Product Name, Category, ID, or Description"
            name="searchTerm"
            value={filters.searchTerm}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div className="form-row mb-3">
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Page"
            name="page"
            value={filters.page}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Page Size"
            name="pageSize"
            value={filters.pageSize}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      {/* Add Products button */}
      <div className="row mb-3">
        <div className="col-md-12 text-right">
          <button className="btn btn-primary" onClick={handleAddProducts}>
            Add Products
          </button>
        </div>
      </div>

      <div className="row">
        {products.map((product) => (
          <div key={product.p_id} className="col-md-3 mb-4">
            <div className="card h-100">
              {product.p_image && (
                <img src={product.p_image} className="card-img-top" alt={product.p_name} />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.p_name}</h5>
                <p className="card-text">Category: {product.p_category}</p>
                <p className="card-text">Description: {product.p_description}</p>
                <p className="card-text">ID: {product.p_id}</p>
                <button
                  className="btn btn-danger mr-2"
                  onClick={() => handleDelete(product.p_id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-warning mr-2"
                  onClick={() => handleUpdate(product.p_id)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className={`page-item ${filters.page === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(filters.page - 1)}
              disabled={filters.page === 1}
            >
              Previous
            </button>
          </li>

          {Array.from({ length: totalPages }).map((_, index) => (
            <li
              key={index + 1}
              className={`page-item ${filters.page === index + 1 ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${filters.page === totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(filters.page + 1)}
              disabled={filters.page === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      {/* Top pagination controls */}
      <div className="row mt-3">
        <div className="col-md-6">
          <p>Page {filters.page} of {totalPages}</p>
        </div>
        <div className="col-md-6 text-right">
          <button
            className={`btn btn-link ${filters.page === 1 ? 'disabled' : ''}`}
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page === 1}
          >
            Previous
          </button>
          <button
            className={`btn btn-link ${filters.page === totalPages ? 'disabled' : ''}`}
            onClick={() => handlePageChange(filters.page + 1)}
            disabled={filters.page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList