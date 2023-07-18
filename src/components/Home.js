import React, { useState, useEffect } from 'react';
import './Home.css';

export default function Home({ addToCart }) {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [cartStatus, setCartStatus] = useState({});

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        const randomTrendingProducts = getRandomItems(data, 6);
        setTrendingProducts(randomTrendingProducts);
        const initialCartStatus = randomTrendingProducts.reduce((status, product) => {
          status[product.id] = false;
          return status;
        }, {});
        setCartStatus(initialCartStatus);
      });
  }, []);

  const getRandomItems = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setCartStatus((prevStatus) => ({
      ...prevStatus,
      [product.id]: true,
    }));
  };

  return (
    <div className='home-container'>
      <h1>Welcome to our Online Store!</h1>
      <h2>Trending Products</h2>
      <div className="trending-products">
        {trendingProducts.map((product) => (
          <div className="product-box" key={product.id}>
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            {cartStatus[product.id] ? (
              <button disabled>Added to Cart</button>
            ) : (
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
