import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Home, Person, Add, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext';

const Sidebar = () => {
    const navigate = useNavigate();
    const { userDetails, logout } = useAuth();

    // Define menu items
    const menuItems = [
        { text: 'Home', icon: <Home />, path: "/" },
        { text: 'Profile', icon: <Person />, path: userDetails ? `/users/${userDetails.username}` : '/login' },
        { text: 'New Post', icon: <Add />, path: "/new-post" }
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <Box
            sx={{
                width: 250,
                bgcolor: 'background.default',
                height: '100vh',
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingTop: 2
            }}
        >
            <Typography 
                variant="h5"
                sx={{ 
                    fontWeight: 'bold',
                    marginBottom: 2,
                    textAlign: 'center',
                    color: 'primary.main'
                }}
            >
                CalcSocial
            </Typography>
            <List sx={{ width: '100%' }}>
                {menuItems.map((item) => (
                    <ListItemButton 
                        onClick={() => navigate(item.path)} 
                        key={item.text}
                        disabled={item.path === '/login' && !userDetails} // Disable if not logged in and trying to access profile
                    >
                        <ListItemIcon sx={{ color: 'primary.main' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                ))}
                <ListItemButton onClick={handleLogout}>
                    <ListItemIcon sx={{ color: 'primary.main' }}>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText primary="Log Out" />
                </ListItemButton>
            </List>
        </Box>
    );
};

export default Sidebar;

