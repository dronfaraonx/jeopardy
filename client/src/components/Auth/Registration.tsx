import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../Context/auth'; 


export default function RegistrationPage() {
  const { setUser } = useUser();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = { username, email, password };

    try {
      const response = await fetch('http://localhost:8000/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user); 
        navigate('/');
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group mb-2">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="form-control"
          id="username"
          placeholder="Enter username"
          required
        />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="form-control"
          id="email"
          placeholder="Enter email"
          required
        />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="form-control"
          id="password"
          placeholder="Password"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary btn-block mt-2">
        Зарегистрироваться
      </button>
    </form>
  );
}