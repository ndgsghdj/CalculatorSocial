// Sidebar.js
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Home, Person, Notifications, Message, Settings, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const navigate = useNavigate();
    const menuItems = [
        { text: 'Home', icon: <Home />, path: "/" },
        { text: 'Profile', icon: <Person />, path: "/profile"},
        { text: 'Settings', icon: <Settings />, path: "/settings" },
        { text: 'New Post', icon: <Add/>, path: "/new-post"}
    ];

    return (
        <Box
            sx={{
                width: 250,
                bgcolor: 'background.default',
                height: '100vh',
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Center items horizontally
                justifyContent: 'flex-start', // Start at the top
                paddingTop: 2 // Add some padding at the top
            }}
        >
            <Typography 
                variant="h5" // Use a larger variant for better visibility
                sx={{ 
                    fontWeight: 'bold', // Make the text bold
                    marginBottom: 2, // Add space below the title
                    textAlign: 'center', // Center the text
                    color: 'primary.main' // Change color to primary theme color
                }}
            >
                CalcSocial
            </Typography>
            <List sx={{ width: '100%' }}> {/* Ensure list takes full width */}
                {menuItems.map((item) => (
                    <ListItemButton onClick={() => navigate(item.path)} key={item.text}>
                        <ListItemIcon sx={{ color: 'primary.main' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
};

export default Sidebar;

