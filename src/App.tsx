// src/App.jsx
import Layout from './pages/Layout';
import Notepad from './pages/Notepad'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/new-post" element={<Notepad/>}/>
                </Route>
            </Routes>
        </Router>
    );
};

export default App;

