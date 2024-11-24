import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { API_URL } from "../constants"

export default function Product({ product }) {

  const { addItemToCart } = useContext(CartContext);

  const { name, price, description, image } = product;

  return (
    <li className="meal-item">
      <article>
        <img src={`${API_URL}/${image}`} alt="food image" />
        <h3>{name}</h3>
        <div>
          <div className="meal-item-price">{price}</div>
          <div className="meal-item-description">{description}</div>
          <button
            className="meal-item-actions button"
            onClick={() => addItemToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </article>
    </li>
  )
}
