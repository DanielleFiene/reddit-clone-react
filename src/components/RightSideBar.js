// src/components/RightSidebar.js
import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, CircularProgress, ListItemAvatar, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { cleanAvatarUrl, cleanUrl } from '../helperfunctions/utils';

const RightSidebar = () => {
    const navigate = useNavigate();
    const categories = ['All', 'Technology', 'Worldnews', 'Funny', 'Sports'];
    const [popularCommunities, setPopularCommunities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPopularCommunities = async () => {
            try {
                const response = await axios.get('https://www.reddit.com/subreddits/popular.json?limit=20');
                setPopularCommunities(response.data.data.children);
            } catch (error) {
                console.error('Error fetching popular communities:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPopularCommunities();
    }, []);

    // Function to get the icon for a community
    const getCommunityIcon = (community) => {
        // Attempt to get the icon from different fields
        const iconUrl =
            cleanAvatarUrl(community.icon_img) || // Clean the icon image URL
            (community.community_icon && community.community_icon.includes('http') 
                ? cleanUrl(community.community_icon.split('?')[0]) // Clean community icon if it's a valid URL
                : '/default-avatar.png') || // Fallback to a default image
            '/default-avatar.png'; // Additional fallback to ensure a default image is used

        return iconUrl;
    };

    return (
        <div style={{ 
            width: '200px', 
            padding: '16px', 
            borderLeft: '1px solid #ccc',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
            zIndex: 1,
        }}>
            <h3 style={{ borderBottom: '1px solid #ccc', textAlign: 'center' }}>Categories</h3>
            <List>
                {categories.map((category) => (
                    <ListItem style={{ cursor: 'pointer' }} button key={category} onClick={() => navigate(`/r/${category.toLowerCase()}`)}>
                        <ListItemText primary={category} />
                    </ListItem>
                ))}
            </List>

            <h3 style={{ borderBottom: '1px solid #ccc', textAlign: 'center' }}>Popular Communities</h3>
            {loading ? (
                <CircularProgress />
            ) : (
                <List>
                    {popularCommunities.map((community) => (
                        <ListItem
                            style={{ cursor: 'pointer' }}
                            button
                            key={community.data.id}
                            onClick={() => navigate(`/r/${community.data.display_name.toLowerCase()}`)}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    src={getCommunityIcon(community.data)} // Use the cleaned icon URL
                                    alt={community.data.display_name}
                                />
                            </ListItemAvatar>
                            <ListItemText primary={community.data.display_name_prefixed} />
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
};

export default RightSidebar;
