import { createContext, useState } from "react";

const CartContext = createContext();

function CartContextProvider({ children }) {

  const [cartItems, setCartItems] = useState([])

  function addItemToCart(item) {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id)
    const existingItem = cartItems[existingItemIndex]
    if (existingItem) {
      const addedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1
      }
      setCartItems(prev => [...prev, prev[existingItemIndex] = addedItem])
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

  function updateItemQuantity(itemId, willAdd) {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === itemId);

    const existingItem = {
      ...cartItems[existingItemIndex]
    };

    existingItem.quantity = willAdd ? existingItem.quantity + 1 : existingItem.quantity - 1;

    if (existingItem.quantity <= 0) {
      setCartItems(prev => prev.splice(existingItemIndex, 1))
    } else {
      setCartItems([...cartItems, cartItems[existingItemIndex] = existingItem])
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
