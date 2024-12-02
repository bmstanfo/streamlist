import React, { useState, useEffect } from 'react';
import { getMovies } from '../utils/api';  // Import the getMovies function from the API
import '../styles/Movies.css';  // Import the CSS styles for Movies page

function Movies() {
  const [movies, setMovies] = useState([]);  // State to store movie results
  const [searchTerm, setSearchTerm] = useState('');  // State to store the search term
  const [loading, setLoading] = useState(false);  // Loading state for the API call

  // Effect hook to fetch movies when the search term changes
  useEffect(() => {
    if (searchTerm) {  // Only fetch movies if there's a search term
      setLoading(true);  // Set loading to true before making the request
      getMovies(searchTerm).then((moviesData) => {
        setMovies(moviesData);  // Set the fetched movies to the state
        setLoading(false);  // Set loading to false once the request is complete
      });
    } else {
      setMovies([]);  // Clear the movie list if the search term is empty
    }
  }, [searchTerm]);  // This hook runs every time the search term changes

  // Handle input change in the search bar
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);  // Update the search term state
  };

  return (
    <div className="movies-container">
      <h1>Movies</h1>
      <input
        type="text"
        placeholder="Search for movies"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      {loading ? (
        <p>Loading...</p>  // Show loading text while fetching data
      ) : (
        <div className="movie-list">
          {movies.length === 0 ? (
            <p>No movies found. Try a different search.</p>  // Show this if no movies found
          ) : (
            movies.map((movie) => (
              <div key={movie.id} className="movie-item">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}  // Movie poster image
                  alt={movie.title}  // Movie title as alt text
                  className="movie-poster"
                />
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>  // Movie overview
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Movies;
