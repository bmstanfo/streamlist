// src/utils/api.js
import axios from 'axios';

// Replace with your actual TMDB API key
const API_KEY = '5ec28f0d5c30da58c28a68bb36429163'; // Put your TMDB API key here
const API_URL = 'https://api.themoviedb.org/3'; // Base URL for the TMDB API

// Function to get movies from TMDB based on a search term
export const getMovies = async (searchTerm) => {
  try {
    // Make a GET request to the TMDB search endpoint
    const response = await axios.get(`${API_URL}/search/movie`, {
      params: {
        api_key: API_KEY,    // Your API key
        query: searchTerm,   // The search term (movie name)
        language: 'en-US',   // The language for results (optional)
        page: 1,             // The page number for pagination (default is 1)
      },
    });

    // Return the movie results from TMDB API
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return []; // Return an empty array in case of error
  }
};


