// src/components/RightSidebar.js
import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, CircularProgress, ListItemAvatar, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
            community.icon_img ||
            (community.community_icon && community.community_icon.includes('http') ? community.community_icon.split('?')[0] : '/default-avatar.png') ||
            '/default-avatar.png'; // Fallback to a default image

        return iconUrl;
    };

    return (
        <div style={{ width: '200px', padding: '16px', borderLeft: '1px solid #ccc' }}>
            <h3>Categories</h3>
            <List>
                {categories.map((category) => (
                    <ListItem button key={category} onClick={() => navigate(`/r/${category.toLowerCase()}`)}>
                        <ListItemText primary={category} />
                    </ListItem>
                ))}
            </List>

            <h3>Popular Communities</h3>
            {loading ? (
                <CircularProgress />
            ) : (
                <List>
                    {popularCommunities.map((community) => (
                        <ListItem
                            button
                            key={community.data.id}
                            onClick={() => navigate(`/r/${community.data.display_name.toLowerCase()}`)}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    src={getCommunityIcon(community.data)} // Use the icon fetching function
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
