import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Grid,
  Paper,
  CircularProgress,
  Box,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { create, all } from 'mathjs';

import { usePost } from '../providers/PostContext';
import FeedPost from '../components/FeedPost'

const math = create(all);

const HomePage: React.FC = () => {
  const { feedPosts, loading } = usePost();

  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit">
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            For You
          </Typography>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <ExploreIcon />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {loading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: 200,
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              feedPosts.map((post) => (
                  <FeedPost post={post} math={math}/>
              ))
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Trends for you</Typography>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              #React
            </Typography>
            <Typography variant="body2">#MaterialUI</Typography>
            <Typography variant="body2">#TwitterClone</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;

