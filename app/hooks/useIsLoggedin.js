import React, {useEffect, useState} from 'react';

const useIsLoggedIn = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    return () => {};
  }, [isLogged]);

  const setLogged = () => {
    setIsLogged(!isLogged);
  };

  const logout = () => {
    setIsLogged(false);
  };

  const login = () => {
    setIsLogged(true);
  };

  return {isLogged, login, logout, setLogged};
};

export default useIsLoggedIn;
