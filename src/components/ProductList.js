import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css'; 

export default function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);

  
  const [cartStatus, setCartStatus] = useState({});

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const initialStatus = data.reduce((status, product) => {
          status[product.id] = false;
          return status;
        }, {});
        setCartStatus(initialStatus);
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setCartStatus((prevStatus) => ({
      ...prevStatus,
      [product.id]: true,
    }));
  };

  function renderProduct(product) {
    const isAddedToCart = cartStatus[product.id];
    return (
      <div className="product-box" key={product.id}>
        <h3>{product.title}</h3>
        <p>Price: ${product.price}</p>
        {isAddedToCart ? (
          <button disabled>Added to Cart</button>
        ) : (
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        )}
      </div>
    );
  }

  return (
    <div className='container'>
      <h1>Product List</h1>
      <div className="product-list">
        {products.map(renderProduct)}
      </div>
      <div className="center-screen">
        <Link to="/cart" className="centered-link">View Cart</Link>
      </div>
    </div>
  );
}
