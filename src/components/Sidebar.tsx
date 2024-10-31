// Sidebar.js
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Person, Notifications, Message, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const navigate = useNavigate();
    const menuItems = [
        { text: 'Home', icon: <Home />, path: "/home" },
        { text: 'Profile', icon: <Person />, path: "/profile"},
        { text: 'Settings', icon: <Settings />, path: "/settings" },
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
        }}
        >
        <List>
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

