// ProfilePage.tsx
import React, { useEffect } from 'react';
import { Avatar, Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { usePost } from '../providers/PostContext';
import { useParams } from 'react-router-dom';
import FeedPost from '../components/FeedPost';

import { create, all } from 'mathjs'

const ProfilePage: React.FC = () => {
    const { username } = useParams<{ username: string }>(); // Correctly typed username

    const { fetchUserPosts, userPosts } = usePost();

    const user = {
        name: username,
        username: `@${username}`,
        bio: "Software developer, tech enthusiast, and coffee lover.",
    };

    const math = create(all)

    useEffect(() => {
        if (username) {
            fetchUserPosts(username).catch(error => console.error(error));
        }
    }, [username, fetchUserPosts]); // Added fetchUserPosts to dependency array

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4">{user.name}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {user.username}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2, textAlign: 'center', maxWidth: 600 }}>
                    {user.bio}
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    Follow
                </Button>
            </Box>

            <Box sx={{ my: 4, width: '100%', borderBottom: '1px solid #e0e0e0' }} />

            <Typography variant="h5" gutterBottom>
                Posts
            </Typography>
            <Grid container spacing={2}>
                {userPosts.length > 0 ? (
                    userPosts.map((post, index) => (
                        <FeedPost post={post} math={math}/>
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

