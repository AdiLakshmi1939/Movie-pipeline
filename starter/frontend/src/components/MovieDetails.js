import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function MovieDetails({ movie }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movie?.id) {
      setDetails(null);
      return;
    }

    let rawUrl = process.env.REACT_APP_MOVIE_API_URL || '';

    // Fix: Ensure protocol is present
    if (rawUrl && !rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
      rawUrl = `http://${rawUrl}`;
    }

    const baseUrl = rawUrl.replace(/\/$/, '');
    const targetUrl = `${baseUrl}/movies/${movie.id}`;

    setLoading(true);
    setError(null);

    axios
      .get(targetUrl)
      .then((response) => {
        setDetails(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details');
        setLoading(false);
      });
  }, [movie]);

  if (!movie) return null;
  if (loading) return <p>Loading details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!details) return null;

  const movieData = details?.movie || details;

  return (
    <div
      style={{
        marginTop: '20px',
        padding: '15px',
        border: '1px solid #4CAF50',
        borderRadius: '5px',
      }}
    >
      <h2>{movieData?.title}</h2>
      <p>{movieData?.description || 'No description available.'}</p>
    </div>
  );
}

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
  }),
};

export default MovieDetails;
