import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { CssBaseline, Box, useMediaQuery } from '@mui/material';

const Layout = () => {
    const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* Sidebar is shown only on medium and larger screens */}
            {isMediumScreen && <Sidebar />}
            
            {/* Main content area */}
            <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default Layout;

