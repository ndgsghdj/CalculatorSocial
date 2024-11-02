import React, { useEffect, useRef } from 'react';
import { Box, Button, Container, Grid, Typography, CircularProgress } from '@mui/material';
import { usePost } from '../providers/PostContext';
import { useNavigate, useParams } from 'react-router-dom';
import FeedPost from '../components/FeedPost';
import { create, all } from 'mathjs';
import { useAuth } from '../providers/AuthContext';

const ProfilePage: React.FC = () => {
    const { username } = useParams<{ username: string }>(); // Correctly typed username
    const { fetchUserPosts, userPosts, deleteUserPosts, loading, error } = usePost(); // Assuming loading and error are provided by usePost
    const { userDetails } = useAuth();
    const navigate = useNavigate();

    const isCurrentUser = userDetails.username === username; // Check if the profile is for the current user

    const user = {
        name: username,
        username: `@${username}`,
        bio: isCurrentUser ? userDetails.bio : "No bio available", // Provide default bio if none exists
    };

    const math = create(all);
    const isMounted = useRef(false); // Use a ref to track if the component has mounted

    useEffect(() => {
        if (!isMounted.current && username) { // Check if component is mounting
            isMounted.current = true; // Set to true after first run
            const fetchPosts = async () => {
                await fetchUserPosts(username);
            };
            fetchPosts().catch(error => console.error(error));
        }
    }, [username, fetchUserPosts]);

    const handleDelete = async (postId: string) => {
        try {
            await deleteUserPosts(postId);
            console.log(`Post ${postId} deleted successfully`);
        } catch (err) {
            console.error(`Failed to delete post ${postId}: `, err);
        }
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    borderRadius: 2,
                    p: 2,
                    boxShadow: 2,
                }}
            >
                <Typography variant="h4">{user.name}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {user.username}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2, textAlign: 'center', maxWidth: 600 }}>
                    {user.bio}
                </Typography>
                {isCurrentUser ? ( // Different button for current user
                    <Button variant="outlined" color="secondary" sx={{ mt: 2 }} onClick={() => navigate('/edit-profile')}>
                        Edit Profile
                    </Button>
                ) : (
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                        Follow
                    </Button>
                )}
            </Box>

            <Box sx={{ my: 4, width: '100%', borderBottom: '1px solid #e0e0e0' }} />

            <Typography variant="h5" gutterBottom>
                Posts
            </Typography>
            <Grid container spacing={2}>
                {loading ? ( // Show CircularProgress while loading
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <CircularProgress />
                    </Grid>
                ) : error ? ( // Display error message if there's an error
                    <Grid item xs={12}>
                        <Typography variant="body1" color="error" sx={{ mt: 2, textAlign: 'center' }}>
                            {error}
                        </Typography>
                    </Grid>
                ) : userPosts.length > 0 ? (
                    userPosts.map((post, index) => (
                        <Grid item xs={12} key={index}>
                            <FeedPost post={post} math={math} onDelete={() => handleDelete(post.id)} isCurrentUser={isCurrentUser}/>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                        No posts available.
                    </Typography>
                )}
            </Grid>
        </Container>
    );
};

export default ProfilePage;

