// src/components/Cart.js
import React from 'react';
import '../styles/Cart.css';  // Import Cart-specific CSS

function Cart() {
  const cartItems = []; // Example array of cart items (empty for now)

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="empty-message">Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      <div className="cart-footer">
        <button>Proceed to Checkout</button>
        <button>Clear Cart</button>
      </div>
    </div>
  );
}

export default Cart;

