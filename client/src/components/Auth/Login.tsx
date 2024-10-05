import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../Context/auth'; 


export default function LoginPage() {
    const { setUser } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(event) {
    event.preventDefault();
    setError(''); 
    
    const requestBody = { email, password };
    try {
      
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
     const responseData = await response.json(); 
      setUser(responseData.user); 
     navigate('/')
      console.log(responseData);
        
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login. Please try again.');
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="form-control"
          id="email"
          placeholder="Enter email"
          required
        />
      </div>
      <div className="form-group mt-2">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="form-control"
          id="password"
          placeholder="Password"
          required
        />
      </div>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
      <button type="submit" className="btn btn-primary btn-block mt-2">Залогиниться</button>
    </form>
  );
}
