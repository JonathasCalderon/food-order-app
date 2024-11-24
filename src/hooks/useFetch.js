import { useEffect } from "react";
import { useState } from "react";

function useFetch(initialValue, fetchFn) {
	const [fetchData, setFetchData] = useState(initialValue)
	const [error, setError] = useState()
	const [isFetching, setIsFetching] = useState()

	useEffect(() => {
		async function fetchData() {
			setIsFetching(true);
			try {
				const data = await fetchFn();
				setFetchData(data);
			} catch (error) {
				setError({ message: error.message || "Failed to fetch data." });
			}

			setIsFetching(false);
		}

		fetchData();
	}, [])

	return {
		fetchData,
		setFetchData,
		error,
		isFetching,
	}
}

export default useFetch
