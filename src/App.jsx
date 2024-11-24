import { useRef } from "react";
import { CartContextProvider } from "./context/CartContext";
import Header from "./components/Header";
import Products from "./components/Products";
import Modal from "./components/Modal";
import Cart from "./components/Cart";

function App() {


  return (
    <>
      <CartContextProvider>
        <Header />
        <Products />
      </CartContextProvider>
    </>
  );
}

export default App;
