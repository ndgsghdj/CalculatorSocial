import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where
} from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (email: string, username: string, password: string) => Promise<void>;
  userDetails: UserDetailsType | null;
}

interface UserDetailsType {
  uid: string;
  email: string;
  createdAt: Date;
  username: string;
  bio: string;
  // Add other fields as necessary
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const [userDetails, setUserDetails] = useState<UserDetailsType | null>(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
    return storedUserDetails ? JSON.parse(storedUserDetails) : null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getCurrentUser(user.uid);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        setUser(null);
        setUserDetails(null);
        localStorage.removeItem('user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getCurrentUser = async (userId: string) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'users'),
        where('uid', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const currentUser = querySnapshot.docs[0].data() as UserDetailsType;
        setUserDetails(currentUser);
        localStorage.setItem('userDetails', JSON.stringify(currentUser));
      } else {
        setUserDetails(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      localStorage.setItem('user', JSON.stringify(userCredential.user));
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    await signOut(auth);
    setUser(null);
    setUserDetails(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userDetails');
    setLoading(false);
  };

  const signUp = async (email: string, username: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create a user document in the "users" collection
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
        username: username,
        bio: ""
        // Add other fields as necessary
      });

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      throw new Error(`Error signing up: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signUp, userDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

