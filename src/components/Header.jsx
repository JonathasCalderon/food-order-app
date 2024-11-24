import { useContext, useRef } from 'react';

import { CartContext } from '../context/CartContext';
import Modal from './Modal';
import Cart from './Cart';

import logo from '../assets/logo.jpg';
import Checkout from './Checkout';
import { postOrder } from '../http';

export default function Header() {

  const { cartItems } = useContext(CartContext);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const totalItemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const cartModalRef = useRef();
  const checkoutModalRef = useRef();
  const formRef = useRef();

  function handleOpenCartClick() {
    cartModalRef.current.open();
  }

  function handleOpenCheckoutClick() {
    checkoutModalRef.current.open();
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    const formData = formRef.current.getElements()

    const postData = {
      items: cartItems,
      customer: {
        email: formData["emailAddress"],
        name: formData["fullName"],
        street: formData["street"],
        ["postal-code"]: formData["postalCode"],
        city: formData["city"]
      }
    }

    const response = await postOrder(postData);

    if (response) {
      alert("Data submitted correctly");
    }

  }

  const cartModalActions =
    <div className="modal-actions">
      <button className="text-button">Close</button>
      <button className="button" onClick={handleOpenCheckoutClick}>Go to Checkout</button>
    </div>

  const checkoutModalActions =
    <div className="modal-actions">
      <button className="text-button">Close</button>
      <button className="button" onClick={handleFormSubmit}>Submit Order</button>
    </div>

  return (
    <>
      <Modal actions={checkoutModalActions} ref={checkoutModalRef}>
        <Checkout totalPrice={totalItemsPrice} ref={formRef} handleSubmit={handleFormSubmit} />
      </Modal>
      <Modal actions={cartModalActions} ref={cartModalRef}>
        <Cart />
      </Modal>
      <div id="main-header">
        <div id="title">
          <img src={logo} alt="logo" />
          <h1>REACTFOOD</h1>
        </div>
        <button className="text-button" onClick={handleOpenCartClick}>Cart({totalItems})</button>
      </div>
    </>
  )
}
