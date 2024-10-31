// PostContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from './AuthContext';

export interface Post {
    title: string;
    content: string;
    userId: string;
    createdAt: Timestamp;
}

export interface UserPost extends Post {
    id: string;
}

export interface PostContextType {
    addPost: (title: string, content: string) => Promise<void>;
    fetchUserPosts: () => Promise<void>;
    userPosts: UserPost[];
    loading: boolean;
    error: string | null;
}

// Create the context with a default value of undefined
const PostContext = createContext<PostContextType | undefined>(undefined);

interface PostProviderProps {
    children: ReactNode;
}

// Provider component
export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [userPosts, setUserPosts] = useState<UserPost[]>([]);

    const { user } = useAuth();
    const userId = user.uid

    // Function to add a new post to Firebase
    const addPost = async (title: string, content: string): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            await addDoc(collection(db, 'posts'), {
                title,
                content,
                userId,
                createdAt: Timestamp.fromDate(new Date()),
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error adding post');
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch posts for a specific user
    const fetchUserPosts = async (): Promise<void> => {
        setLoading(true);
        setError(null);


        try {
            const q = query(collection(db, 'posts'), where('userId', '==', userId));
            const querySnapshot = await getDocs(q);
            const posts = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Post),
            }));
            setUserPosts(posts);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error fetching posts');
        } finally {
            setLoading(false);
        }
    };

    const value: PostContextType = { addPost, fetchUserPosts, userPosts, loading, error };

    return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

// Hook to use the Post context
export const usePost = (): PostContextType => {
    const context = useContext(PostContext);
    if (context === undefined) {
        throw new Error('usePost must be used within a PostProvider');
    }
    return context;
};

