import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Home from './components/Home';
import './App.css';

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevCartItems) => [...prevCartItems, product]);
  };
  const removeFromCart = (productToRemove) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== productToRemove.id)
    );
  };

  return (
    <>
        <div className='nav'>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/productlist">Product List</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Routes>
        <Route
            path="/"
            element={<Home addToCart={addToCart} />} 
          />
          <Route
            path="/productlist"
            element={<ProductList addToCart={addToCart} />}
          />
         <Route
          path="/cart"
          element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />}
        />
        </Routes>
    </>
  );
}
