import { useState, useEffect } from "react"

export default function useFetch(url) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(
        () => {
            setLoading(true)
            setError(null)

            const fetchData = async() => {
                try {
                    const response = await fetch(url);
                if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
                    const json = await response.json();
                    setData(json)
                } catch (error) {
                    setError(error.message)
                } finally {
                    setLoading(false)
                }
            }
            fetchData();
        }, [url]
    )

    return { data, loading, error }
}