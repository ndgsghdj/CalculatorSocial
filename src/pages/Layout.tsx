import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { CssBaseline, Box } from '@mui/material'

const Layout = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline/>
            <Sidebar/>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Outlet />
            </Box>
        </Box>
    )
}

export default Layout
