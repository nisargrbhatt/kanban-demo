import { AUTH_COOKIE, MOCK_USERS } from '#/lib/common';
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import Cookies from 'js-cookie';

export type AuthContext = {
  status: 'loggedOut' | 'loggedIn';
  currentUser: (typeof MOCK_USERS)[number] | null;
  setCurrentUser: (id: string) => void;
};

export const AuthContext = createContext<AuthContext | null>(null);

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuthContext must be used within AuthContext');
  }

  return ctx;
};

type Props = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: Props) {
  const [authUser, setAuthUser] = useState<(typeof MOCK_USERS)[number] | null>(
    null,
  );

  const setCurrentUser = (id: string) => {
    const user = MOCK_USERS.find((x) => x.id === id);
    if (!user) {
      return;
    }
    Cookies.set(AUTH_COOKIE, id, { secure: true });
    setAuthUser(user);
  };

  // Check for the cookie and set the user
  useEffect(() => {
    const cookie = Cookies.get(AUTH_COOKIE);
    if (cookie) {
      const user = MOCK_USERS.find((x) => x.id === cookie);
      if (user) {
        setAuthUser(user);
      }
    }
    // For demo, auto login user if cookie doesn't exist
    else {
      const user = MOCK_USERS.at(0);
      if (user) {
        Cookies.set(AUTH_COOKIE, user.id, { secure: true });
        setAuthUser(user);
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser: authUser,
        setCurrentUser,
        status: authUser ? 'loggedIn' : 'loggedOut',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
