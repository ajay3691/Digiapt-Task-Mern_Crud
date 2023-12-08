import React, { createContext, useState } from 'react';
import Navbar from './Navabr/Navbar';
import Admin from './ProductCompo/ProductList'
import UpdateProd from './ProductCompo/UpdateProd';
import AddProducts from './ProductCompo/AddProducts';
import Login from './AuthCompo/Login'
import Register from './AuthCompo/Register'
import Myfrofile from './AuthCompo/Myprofile'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export const store = createContext();

const App = () => {
  const [token, setToken] = useState(null);


  return (
    <div>
      <store.Provider value={[token, setToken]}>

        <Router>
          <Navbar />
          <Routes>
            <Route path='/admin' element={<Admin />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/myfrofile' element={<Myfrofile />} />
            <Route path='/addProducts' element={<AddProducts />} />
            <Route path="/updateProduct/:productId" element={<UpdateProd />} />
          </Routes>
        </Router>
      </store.Provider>

    </div>
  );
};

export default App;
