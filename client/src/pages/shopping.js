import React, { useEffect, useState } from "react";
import axios from "axios";

const PAGE_PRODUCTS = "products";
const PAGE_CART = "cart";

const Shopping = (props) => {
  const { searchTerm } = props;

  const [filteredProduct, setFilteredProducts] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCTS);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(
      products.filter(product => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [products, searchTerm]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/products?search=${searchTerm}`)
      .then(res => {
        setProducts(res.data);
      })
      .catch(console.error);
  }, [searchTerm]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/ecommerce/cart")
      .then(res => {
        setCartList(res.data)
      });
  }, [])

  const addToCart = (product) => {
    axios.post(
      "http://localhost:3001/api/ecommerce/cart",
      {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        image_url: product.image
      })
      .then((res) => {
        setCartList([...cartList, product]);
      });
  };

  const removeFromCart = (productId) => {
    axios.delete(
      `http://localhost:3001/api/ecommerce/cart/${productId}`,
    )
      .then(res => {
        setCartList(cartList.filter(item => item.id !== productId));
      })
      .catch(console.error);
  }

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const renderProducts = () => (
    <>
      <header id="shopping-head">
        <button onClick={() => navigateTo(PAGE_CART)} id="goToCart">
          Go to Cart ({cartList.length})
        </button>
      </header>
      <div id="shopping">
        {products.map((product, idx) => (
          <div className="card" key={idx}>
            <div id="product">
              <img src={product.image} alt="" />
              <h2> {product.name} </h2>
              <h3> {product.description} </h3>
              <h3> {product.price} </h3>
              <button onClick={() => addToCart(product)}> Add to Cart </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const renderCart = () => (
    <>
      <div id="cart-container">
        <button onClick={() => navigateTo(PAGE_PRODUCTS)} id="products-btn">
          Back to Products
        </button>

        <h1 id="cart-title"> Cart </h1>

        {cartList.map((product, idx) => (
          <div className="card card-container" key={idx}>
            <div id="product">
              <img src={product.image} alt="" />
              <h2> {product.name} </h2>
              <h3> {product.description} </h3>
              <h3> {product.price} </h3>
              <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
            </div>
          </div>
        ))}
        <button id="checkout-btn">Checkout</button>
      </div>
    </>
  );

  return (
    <div className="main">
      {renderProducts()}
      {page === PAGE_CART && renderCart()}
    </div>
  );
};

export default Shopping;
