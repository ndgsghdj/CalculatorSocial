import React, { createContext, useContext, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
    Timestamp, // Import Timestamp for conversion
    updateDoc
} from 'firebase/firestore';

export interface UserProfileType {
    username: string;
    email: string;
    createdAt: Date; // Assuming you want to handle this as a Date
    bio: string;
    uid: string;
}

interface UserContextType {
    loading: boolean; // Include loading state here
    getUser: (username: string) => Promise<UserProfileType | null>; // Return null if not found
    updateUser: (userId: string, userData: UserProfileType) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(true);

    const getUser = async (username: string): Promise<UserProfileType | null> => {
        setLoading(true);
        try {
            const q = query(
                collection(db, "users"),
                where("username", "==", username)
            );
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const user = querySnapshot.docs[0].data() as UserProfileType;
                // Convert Firestore Timestamp to Date if necessary
                if (user.createdAt instanceof Timestamp) {
                    user.createdAt = user.createdAt.toDate();
                }
                return user;
            }
            return null; // Return null if no user found
        } catch (err) {
            console.error(err);
            return null; // Handle error by returning null or throw
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (userId: string, userData: UserProfileType): Promise<void> => {
        setLoading(true)
        try {
            const userRef = doc(db, 'users', userId); // Adjust 'users' to your collection path
            await updateDoc(userRef, {...userData});
            console.log('User profile updated successfully');
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <UserContext.Provider value={{ loading, getUser, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

