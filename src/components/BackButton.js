import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate(); // Get navigation functionality

  const handleClick = () => {
    navigate('/welcome'); // Navigate back to the Welcome Page
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: '10px 20px',
        marginBottom: '20px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      Back to Welcome Page
    </button>
  );
};

export default BackButton;
