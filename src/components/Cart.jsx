import { useContext } from "react"
import { CartContext } from "../context/CartContext"

export default function Cart() {

  const { cartItems, updateItemQuantity } = useContext(CartContext)

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        {
          cartItems.map(({ id, name, quantity, price }) => (
            <li key={id} className="cart-item">
              <p>{name} - {quantity} x {price}</p>
              <div className="cart-item-actions">
                <button onClick={() => updateItemQuantity(id, false)}>-</button>
                <p>{quantity}</p>
                <button onClick={() => updateItemQuantity(id, true)}>+</button>
              </div>
            </li>
          ))
        }
      </ul>
      <div className="cart-total">{totalPrice !== 0 && totalPrice}</div>
    </div>
  )
}

