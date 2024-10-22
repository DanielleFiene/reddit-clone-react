// src/App.js main component combining all components
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LeftSidebar from './components/LeftSideBar';
import RightSidebar from './components/RightSideBar';
import MainContent from './components/Maincontent';
import Header from './components/Header';
import { Box } from '@mui/material';
import './App.css';

const App = () => {
    return (
        <Router>
          <Header />
            <Box display="flex" flexDirection="row" height="100%">
                <LeftSidebar />
                <MainContent />
                <RightSidebar />
            </Box>
        </Router>
    );
};

export default App;
