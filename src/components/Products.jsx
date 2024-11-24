import Product from "./Product";
import { getAvailableMeals } from "../http";
import useFetch from "../hooks/useFetch";

export default function Products() {

  const {
    fetchData: availableMeals,
    error,
    isFetching
  } = useFetch([], getAvailableMeals)

  if (error) {
    return <h1 className="loading">There was an error Fetching the data</h1>
  }

  if (isFetching) {
    return <h1 className="loading">Loading Products...</h1>
  }

  return (
    <ul id="meals">
      {
        !isFetching && availableMeals.map((product) => (
          <Product
            key={product.id}
            product={product}
          />
        ))
      }
    </ul>
  )
}
