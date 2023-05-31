import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../config/firebase";

interface AuthContextType {
  createUser: (email: string, password: string) => Promise<UserCredential>;
  user: User | null;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<UserCredential>;
}

export const AuthContext = createContext<AuthContextType>({
  createUser: () => Promise.reject(new Error("AuthProvider not initialized")),
  user: null,
  logout: () => Promise.reject(new Error("AuthProvider not initialized")),
  login: () => Promise.reject(new Error("AuthProvider not initialized")),
});

export const useAuth = (): AuthContextType => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  const createUser = (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = (): Promise<void> => {
    return signOut(auth);
  };

  const login = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false); // Authentication process is complete
    });
    return () => {
      unsubscribe();
    };
  }, []);
  if (isLoading) {
    //  while authentication is in progress
    return <div></div>;
  }

  return (
    <AuthContext.Provider value={{ createUser, user, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};
