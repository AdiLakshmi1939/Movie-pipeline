import React, { useState } from 'react';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import './App.css';

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleClearSelection = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="container">
      <h1>Movie List</h1>

      <MovieList onMovieClick={handleMovieClick} />

      {selectedMovie && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
            <h1 style={{ margin: 0 }}>Movie Details</h1>
            <button
              onClick={handleClearSelection}
              style={{
                padding: '5px 10px',
                cursor: 'pointer',
                borderRadius: '4px',
                border: '1px solid #ccc',
                backgroundColor: '#fff',
              }}
            >
              Close
            </button>
          </div>

          <MovieDetails movie={selectedMovie} />
        </div>
      )}
    </div>
  );
}
