import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserProviderProps {
  children:React.ReactNode
}

const UserContext = createContext();

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('http://localhost:8000/check-session', {
        method: 'GET',
        credentials: 'include', 
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};