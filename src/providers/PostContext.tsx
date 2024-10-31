import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where, orderBy, Timestamp, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from './AuthContext';

export interface Post {
    title: string;
    content: string;
    userId: string;
    username: string;
    createdAt: Timestamp;
    scope: null;
}

export interface UserPost extends Post {
    id: string;
}

export interface PostContextType {
    addPost: (title: string, content: string, scope) => Promise<void>;
    fetchUserPosts: (username: string) => Promise<void>;
    fetchFeedPosts: (lastVisiblePost?: UserPost) => Promise<void>;
    userPosts: UserPost[];
    feedPosts: UserPost[];
    loading: boolean;
    error: string | null;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

interface PostProviderProps {
    children: ReactNode;
}

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [userPosts, setUserPosts] = useState<UserPost[]>([]);
    const [feedPosts, setFeedPosts] = useState<UserPost[]>([]);

    const { user } = useAuth();
    const userId = user ? user.uid : null;

    const addPost = async (title: string, content: string, scope): Promise<void> => {
        if (!userId) {
            setError('User not authenticated');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const userDocRef = doc(db, 'users', userId)
            const userDoc = await getDoc(userDocRef)

            if (!userDoc.exists()) {
                setError("User not found")
                return;
            }

            const { username } = userDoc.data() as { username: string }

            await addDoc(collection(db, 'posts'), {
                title,
                content,
                userId,
                username,
                scope,
                createdAt: Timestamp.fromDate(new Date()),
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error adding post');
        } finally {
            setLoading(false);
        }
    };

    const fetchUserPosts = async (username: string): Promise<void> => {

        setLoading(true);
        setError(null);

        try {
            const q = query(
                collection(db, 'posts'),
                where('username', '==', username),
            );
            const querySnapshot = await getDocs(q);
            const posts = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Post),
            }));
            setUserPosts(posts);
            console.log(posts)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error fetching posts');
        } finally {
            setLoading(false);
        }
    };

    const fetchFeedPosts = async (): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const querySnapshot = await getDocs(collection(db, 'posts'));
            const posts = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Post),
            }));

            setFeedPosts(posts); // Set all fetched posts
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error fetching feed posts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedPosts();
    }, []);

    const value: PostContextType = {
        addPost,
        fetchUserPosts,
        fetchFeedPosts,
        userPosts,
        feedPosts,
        loading,
        error,
    };

    return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePost = (): PostContextType => {
    const context = useContext(PostContext);
    if (context === undefined) {
        throw new Error('usePost must be used within a PostProvider');
    }
    return context;
};

