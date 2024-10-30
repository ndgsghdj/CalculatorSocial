// src/App.jsx
import Notepad from './pages/Notepad'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
        <Routes>
            <Route path="/new-post" element={<Notepad/>}/>
            <Route path="/" element={<div/>}/>
        </Routes>
    </Router>
  );
};

export default App;

