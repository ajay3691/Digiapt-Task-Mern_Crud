import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { store } from '../App';

const Navbar = () => {
  const [token, setToken] = useContext(store);
  const navigate = useNavigate(); 

  const handleLogout = () => {
    setToken(null);
    navigate('/login');
  };

  return (
    <div>
      <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
        <Link to="/index" className='navbar-brand'>Authentication</Link>
        <div className='ml-auto'>
          <ul className='navbar-nav'>
            {
              !token > 0 ?
                (
                  <>
                    <li className='nav-list'><Link className="nav-link" to="/register">Register</Link> </li>
                    <li className='nav-list'><Link className="nav-link" to="/login">Login</Link></li>
                  </>
                ) :
                (
                  <>
                    <button className="nav-link btn btn-link" onClick={handleLogout}>
                      Logout
                    </button>
                    <li className='nav-list'><Link className="nav-link" to="/admin">Admin</Link></li>
                   {/*  <li className='nav-list'><Link className="nav-link" to="/createProd">CreateProd</Link></li>
                    <li className='nav-list'> <Link className="nav-link" to="/updateProd">UpdateProd</Link> </li> */}
                  </>
                )}
          </ul>
        </div>
      </nav >
    </div >
  );
};

export default Navbar;
