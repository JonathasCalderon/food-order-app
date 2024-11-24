import { API_URL } from "./constants";

async function getAvailableMeals() {
  const response = await fetch(`${API_URL}/meals`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch meals.");
  }

  return resData;
}

async function postOrder(order) {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });

  if (!response.ok) {
    throw new Error("Failed to post the order...");
  }

  return true;
}

export { getAvailableMeals, postOrder }
