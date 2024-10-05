import React from 'react';
import { useUser } from '../Context/auth';

const LogoutButton = () => {
  const { setUser } = useUser();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/logout', {
        method: 'POST',
        credentials: 'include', 
      });

      if (response.ok) {
        setUser(null); 
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-link nav-link">
      Logout
    </button>
  );
};

export default LogoutButton;
