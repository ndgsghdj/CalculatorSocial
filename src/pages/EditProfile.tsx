import React, { useState, useEffect, useRef } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  CircularProgress,
  Box,
  Snackbar,
  Alert,
  Backdrop,
} from '@mui/material';
import { UserProfileType, useUser } from '../providers/UserContext';
import { useAuth } from '../providers/AuthContext';

const EditProfile: React.FC = () => {
  const { getUser, updateUser, loading } = useUser();
  const { userDetails } = useAuth();

  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [success, setSuccess] = useState(false);

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current && userDetails) {
      isMounted.current = true;
      const fetchUserProfile = async () => {
        const profile = await getUser(userDetails.username);
        setUserProfile(profile);
      };
      fetchUserProfile();
    }
  }, [getUser, userDetails.username]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) =>
      prevProfile ? { ...prevProfile, [name]: value } : prevProfile
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userProfile) {
      try {
        await updateUser(userProfile.uid, userProfile);
        setSuccess(true);
      } catch (error) {
        console.error('Failed to update profile:', error);
      }
    }
  };

  if (!userProfile) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Edit Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ marginTop: '10px' }}>
            <TextField
              label="Username"
              name="name"
              fullWidth
              value={userProfile.username}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              value={userProfile.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Bio"
              name="bio"
              type="bio"
              fullWidth
              value={userProfile.bio}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Loading Overlay */}
      {loading && (
          <Backdrop open={loading} sx={{ color: '#fff', zIndex: 1301 }}>
          <CircularProgress color="inherit" />
          </Backdrop>
      )}

      {/* Success Alert Overlay */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccess(false)} severity="success" variant="filled">
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditProfile;

