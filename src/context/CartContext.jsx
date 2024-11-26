import { createContext, useState } from "react";

const CartContext = createContext();

function CartContextProvider({ children }) {

  const [cartItems, setCartItems] = useState([])

  function addItemToCart(item) {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id)
    const existingItem = cartItems[existingItemIndex]
    if (existingItem) {
      //  const addedItem = {
      //    ...existingItem,
      //    quantity: existingItem.quantity + 1
      //  }
      setCartItems(prev => prev.map(cartItem => {
        if (cartItem.id === item.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1
          }
        }
        return cartItem
      }))
    }
    else {
      const newItem = {
        ...item,
        quantity: 1
      }
      setCartItems(prev => (
        [...prev, newItem]
      ))
    }
  }

  function updateItemQuantity(item, willAdd) {
    if (item.quantity <= 1 && !willAdd) {
      setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id))
    } else {
      setCartItems(prev => prev.map(cartItem => {
        if (cartItem.id === item.id) {
          return {
            ...cartItem,
            quantity: willAdd ? cartItem.quantity + 1 : cartItem.quantity - 1
          }
        }
      }))
    }
  }

  const ctxValue = {
    cartItems,
    addItemToCart,
    updateItemQuantity,
  }

  return (
    <CartContext.Provider value={ctxValue}>
      {children}
    </CartContext.Provider>
  )
}

export { CartContext, CartContextProvider }
