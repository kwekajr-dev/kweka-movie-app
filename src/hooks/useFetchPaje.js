import { useState, useEffect} from 'react';

export const useFetchPaje = (pathToApi, loading, setLoading, looking = "") => {
  const [norm, setNorm] = useState([]);

  // Use the correct environment variable name for Create React App
  const apiKey = process.env.REACT_APP_KEY;
  
  console.log("API Key:", apiKey); // Debug: check if API key is loaded
  const url = `https://api.themoviedb.org/3/${pathToApi}${looking}api_key=${apiKey}&language=en-US&page=1`;
  console.log("Fetching from URL:", url); // Debug: check the URL

  useEffect(() => {
    async function fetchMovieList() {
      setLoading(true);
      try {
        const response = await fetch(url);
        console.log("Response status:", response.status); // Debug: check response status
        const data = await response.json();
        console.log("API Response:", data); // Debug: check the full response
        setNorm(data.results || []); // Ensure we always set an array
      } catch (error) {
        console.error('Error fetching data:', error);
        setNorm([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    }

    fetchMovieList();
  }, [url, setLoading]);

  return { norm };
};