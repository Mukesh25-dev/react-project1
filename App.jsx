import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Products from "./components/Products";
import CartModal from "./components/CartModal";
import "./index.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const addToCart = (product) => {
    if (cart.find((item) => item.id === product.id)) {
      alert("Item already added to the cart");
    } else {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  return (
    <div className="App">
      <NavBar
        cartCount={cart.length}
        onCartClick={() => setIsModalOpen(true)}
      />
      <Products products={products} addToCart={addToCart} />
      {isModalOpen && (
        <CartModal
          cart={cart}
          removeFromCart={removeFromCart}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
