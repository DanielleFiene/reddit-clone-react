// src/components/Header.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, TextField, Button } from '@mui/material';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    
    const handleSearch = (event) => {
        event.preventDefault(); // Prevent form submission
        // Navigate to the search results page or subreddit based on the search term
        navigate(`/r/${searchTerm}`);
        setSearchTerm(''); // Clear the search input
    };

    // State to manage button hover
    const [isHovered, setIsHovered] = useState(false);

    return (
        <AppBar position="static" style={{ backgroundColor: '#333' }}>
            <Toolbar>
                <Button
                    color="inherit"
                    onClick={() => navigate('/')}
                    onMouseOver={() => setIsHovered(true)} // Change hover state
                    onMouseOut={() => setIsHovered(false)} // Reset hover state
                    style={{
                        fontWeight: '600',
                        color: isHovered ? '#FF8000' : '#FF5700', // Change color on hover
                    }}
                >
                    HOME
                </Button>
                <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'left', color: '#FF5700', marginLeft: '45%' }}>
                    REDDIT MINI
                </Typography>
                <form onSubmit={handleSearch} style={{ display: 'flex' }}>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search Subreddit..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            backgroundColor: 'white',
                            color: 'black',
                            marginRight: '8px',
                            borderRadius: '8px',
                        }}
                        InputProps={{
                            style: {
                                color: 'black',
                                fontWeight: 600 // Input text color
                            },
                        }}
                        InputLabelProps={{
                            style: {
                                color: 'black',
                            },
                        }}
                    />
                    <Button type="submit" color="inherit" onMouseOver={() => setIsHovered(true)} // Change hover state
                    onMouseOut={() => setIsHovered(false)} // Reset hover state
                    style={{
                        fontWeight: '600',
                        color: isHovered ? '#FF8000' : '#FF5700', // Change color on hover
                    }}>
                        SEARCH
                    </Button>
                </form>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
