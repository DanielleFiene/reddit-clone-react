// src/App.js main component combining all components
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LeftSidebar from './components/LeftSideBar';
import RightSidebar from './components/RightSideBar';
import MainContent from './components/Maincontent';
import { Box } from '@mui/material';

const App = () => {
    return (
        <Router>
            <Box display="flex" flexDirection="row" height="100vh">
                <LeftSidebar />
                <MainContent />
                <RightSidebar />
            </Box>
        </Router>
    );
};

export default App;
