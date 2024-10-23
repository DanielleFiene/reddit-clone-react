import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, TextField, Button, Box } from '@mui/material';
import RedditIcon from '@mui/icons-material/Reddit';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    
    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/r/${searchTerm}`);
        setSearchTerm(''); // Clear the search input
    };

    // State to manage hover effect for the main buttons
    const [hoveredButton, setHoveredButton] = useState(null);

    return (
        <AppBar position="static" style={{ backgroundColor: '#333' }}>
            <Toolbar>
                
                <Box 
                    display="flex" 
                    justifyContent="space-between" 
                    alignItems="center" 
                    width="100%"
                >
                    {/* Left Section - HOME Button */}
                    <Button
                        color="inherit"
                        onClick={() => navigate('/')}
                        onMouseOver={() => setHoveredButton('home')} 
                        onMouseOut={() => setHoveredButton(null)} 
                        style={{
                            fontWeight: '600',
                            color: '#FFFFFF',
                            backgroundColor: hoveredButton === 'home' ? '#FF4500' : '#FF5700',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            textTransform: 'uppercase',
                        }}
                    >
                        HOME
                    </Button>

                    {/* Quick Navigation Buttons */}
                    <Box display="flex" gap="16px">
                        <Button
                            color="inherit"
                            onClick={() => navigate('/hot')}
                            onMouseOver={() => setHoveredButton('hot')} 
                            onMouseOut={() => setHoveredButton(null)}
                            style={{
                                fontWeight: '600',
                                color: '#FFFFFF',
                                backgroundColor: hoveredButton === 'hot' ? '#FF4500' : '#FF5700',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                textTransform: 'uppercase',
                            }}
                        >
                            Hot Topics
                        </Button>

                        <Button
                            color="inherit"
                            onClick={() => navigate('/new')}
                            onMouseOver={() => setHoveredButton('new')} 
                            onMouseOut={() => setHoveredButton(null)}
                            style={{
                                fontWeight: '600',
                                color: '#FFFFFF',
                                backgroundColor: hoveredButton === 'new' ? '#FF4500' : '#FF5700',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                textTransform: 'uppercase',
                            }}
                        >
                            New Posts
                        </Button>

                        <Button
                            color="inherit"
                            onClick={() => navigate('/top')}
                            onMouseOver={() => setHoveredButton('top')} 
                            onMouseOut={() => setHoveredButton(null)}
                            style={{
                                fontWeight: '600',
                                color: '#FFFFFF',
                                backgroundColor: hoveredButton === 'top' ? '#FF4500' : '#FF5700',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                textTransform: 'uppercase',
                            }}
                        >
                            Top Posts
                        </Button>
                    </Box>

                    {/* Middle Section - Title */}
                    <Typography 
                        variant="h6" 
                        style={{ color: '#FF5700', fontWeight: 'bold', display: 'flex', alignItems: 'center' }} 
                    >
                        <RedditIcon style={{ color: '#FFFFFF', marginRight: '8px' }} />
                        REDDIT MINI
                    </Typography>

                    {/* Right Section - Search Form */}
                    <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
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
                                    fontWeight: '600',
                                },
                            }}
                        />
                        <Button 
                            type="submit" 
                            color="inherit" 
                            onMouseOver={() => setHoveredButton('search')}
                            onMouseOut={() => setHoveredButton(null)}
                            style={{
                                fontWeight: '600',
                                color: '#FFFFFF',
                                backgroundColor: hoveredButton === 'search' ? '#FF4500' : '#FF5700',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                textTransform: 'uppercase',
                            }}
                        >
                            SEARCH
                        </Button>
                    </form>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
