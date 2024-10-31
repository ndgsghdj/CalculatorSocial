// src/App.jsx
import Layout from './pages/Layout';
import Notepad from './pages/Notepad';
import SignIn from './pages/SignIn';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';
import { useAuth } from './providers/AuthContext';
import SignUp from './pages/SignUp';

const PrivateRoute = () => {
    const { user } = useAuth();

    return (
        user ? <Outlet/> : <Navigate to="/login"/>
    )
}

const App = () => {
    return (
        <Router>
            <Main />
        </Router>
    );
};

const Main = () => {
    const location = useLocation();

    return (
        <TransitionGroup>
            <CSSTransition
                key={location.key}
                classNames="fade"
                timeout={300}
            >
                <Routes location={location}>
                    <Route path="/login" element={<SignIn/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route element={<PrivateRoute/>}>
                        <Route element={<Layout />}>
                            <Route path="/" element={<div/>}/> // Change when implemented
                            <Route path="/new-post" element={<Notepad />} />
                        </Route>
                    </Route>
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
};

export default App;

