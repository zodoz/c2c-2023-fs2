import React, { useEffect, useState } from "react";
import productImg from '../images/productImg.png';
import axios from "axios";

const Featured = () => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/products")
      .then(res => {
        setProduct(res.data);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <div id="gallery-head">
        <h1> Gallery </h1>
      </div>
      <div id="card-container">
        {products.map((product, idx) => (
          <div class="featured-card">
            <img
              className="img"
              src={product.image}
              alt=""
            />
            <h3>{product.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Featured;
