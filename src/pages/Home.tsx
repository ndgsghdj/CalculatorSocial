import React, { useState } from 'react';
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
  InputBase,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { create, all } from 'mathjs';

import { usePost } from '../providers/PostContext';
import FeedPost from '../components/FeedPost';

const math = create(all);

const HomePage: React.FC = () => {
  const { feedPosts, loading } = usePost();
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchClick = () => {
    setShowSearch((prev) => !prev);
  };

  return (
    <Container maxWidth="md" sx={{ padding: { xs: 1, md: 2 } }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit">
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            For You
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: showSearch ? '200px' : '0px',
                opacity: showSearch ? 1 : 0,
                display: showSearch ? 'block' : 'none',
                transition: 'width 0.4s ease, opacity 0.4s ease',
                overflow: 'hidden',
              }}
            >
              <InputBase
                placeholder="Search..."
                sx={{
                  color: 'inherit',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  paddingLeft: 2,
                  paddingRight: 2,
                  paddingY: 0.5,
                  borderRadius: '20px',
                  width: '100%',
                  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  },
                  '&:focus': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                  },
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </Box>
            <IconButton color="inherit" onClick={handleSearchClick}>
              <SearchIcon />
            </IconButton>
          </Box>
          <IconButton color="inherit">
            <ExploreIcon />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {/* Main Feed */}
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
              feedPosts.map((post, index) => (
                <Grid item xs={12} key={index}>
                  <FeedPost post={post} math={math} />
                </Grid>
              ))
            )}
          </Grid>
        </Grid>

        {/* Trends Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2, display: { xs: 'none', md: 'block' } }}>
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

