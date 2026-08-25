import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MovieDetails({ movie }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movie?.id) {
      setDetails(null);
      return;
    }

    const rawUrl = process.env.REACT_APP_MOVIE_API_URL || '';
    const baseUrl = rawUrl.replace(/\/$/, '');

    setLoading(true);
    axios
      .get(`${baseUrl}/movies/${movie.id}`)
      .then((response) => {
        setDetails(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movie details:', err);
        setLoading(false);
      });
  }, [movie]);

  if (!movie) return null;
  if (loading) return <p>Loading details...</p>;
  if (!details) return null;

  return (
    <div
      style={{
        marginTop: '20px',
        padding: '15px',
        border: '1px solid #4CAF50',
        borderRadius: '5px',
      }}
    >
      <h2>{details?.movie?.title}</h2>
      <p>{details?.movie?.description}</p>
    </div>
  );
}

export default MovieDetails;
