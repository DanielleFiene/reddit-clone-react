// src/components/PostList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, Typography, Button, Box, Card, CardContent } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MessageIcon from '@mui/icons-material/Message';
import { isValidImageUrl, cleanUrl, cleanAvatarUrl, isValidAvatarUrl } from '../helperfunctions/utils'; // Import the helper functions

const PostList = () => {
    const { category } = useParams(); // Get category from URL
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://www.reddit.com/r/${category ? category : 'all'}/top.json?limit=20`
                );
                
                // Map through the posts and include the author's avatar
                const postData = await Promise.all(
                    response.data.data.children.map(async (post) => {
                        const author = post.data.author;
                        let authorAvatar = null;

                        try {
                            // Fetch user info for the author, if avatar data is available
                            const userResponse = await axios.get(
                                `https://www.reddit.com/user/${author}/about.json`
                            );
                            let userIcon = userResponse.data.data.icon_img;
                            let snoovatar = userResponse.data.data.snoovatar_img;

                            // Clean the URLs and handle special characters
                            userIcon = cleanAvatarUrl(userIcon);
                            snoovatar = cleanAvatarUrl(snoovatar);

                            // Use snoovatar if available, otherwise fall back to icon_img
                            authorAvatar = isValidAvatarUrl(snoovatar) ? snoovatar : userIcon;
                        } catch (e) {
                            console.log(`Failed to fetch avatar for user ${author}`, e);
                        }

                        return {
                            ...post,
                            authorAvatar,
                        };
                    })
                );

                setPosts(postData); // Store post data including avatars
            } catch (error) {
                setError("Error fetching posts: " + error.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchPosts();
    }, [category]);
    
    if (loading) return <Typography color="textSecondary">Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>; 

    // Function to format timestamp to relative time
    const formatRelativeTime = (timestamp) => {
        const now = Date.now();
        const seconds = Math.floor((now - timestamp * 1000) / 1000);
        let interval = Math.floor(seconds / 31536000); // Years
        if (interval > 1) return `${interval} years ago`;
        interval = Math.floor(seconds / 2592000); // Months
        if (interval > 1) return `${interval} months ago`;
        interval = Math.floor(seconds / 86400); // Days
        if (interval > 1) return `${interval} days ago`;
        interval = Math.floor(seconds / 3600); // Hours
        if (interval > 1) return `${interval} hours ago`;
        interval = Math.floor(seconds / 60); // Minutes
        if (interval > 1) return `${interval} minutes ago`;
        return 'just now';
    };

    return (
        <List>
            {posts.map((post) => (
                <ListItem key={post.data.id} style={{ display: 'block', margin: '16px 0', height: 'auto' }}>
                    <Box display="flex" alignItems="center" justifyContent="center" width="100%">
                        {/* Card for each post */}
                        <Card sx={{ width: '70%', padding: '16px', backgroundColor: '#333', borderRadius: '8px', color: '#FFFFFF', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)' }}>
                            <CardContent>
                                <Box display="flex" alignItems="center" justifyContent="center" marginBottom="16px">
                                    {/* Upvote and downvote buttons */}
                                    <Box display="flex" flexDirection="column" alignItems="center" style={{ marginRight: '16px' }}>
                                        <Button size="small" onClick={() => console.log('Upvote post')}>
                                            <ArrowUpwardIcon />
                                        </Button>
                                        <Typography variant="body1">{post.data.ups}</Typography>
                                        <Button size="small" onClick={() => console.log('Downvote post')}>
                                            <ArrowDownwardIcon />
                                        </Button>
                                    </Box>

                                    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
                                        {/* Title */}
                                        <Typography variant="h6" gutterBottom style={{ fontWeight: '600', color: '#FF5700' }}>
                                            <Link
                                                to={`/r/${post.data.subreddit}/comments/${post.data.id}/${post.data.title.replace(/[^a-z0-9]+/g, '-').toLowerCase()}`}
                                                style={{
                                                    textDecoration: 'none',
                                                    color: '#FF5700',
                                                }}
                                                onMouseOver={(e) => (e.currentTarget.style.color = '#FF8000')}
                                                onMouseOut={(e) => (e.currentTarget.style.color = '#FF5700')}
                                            >
                                                {post.data.title}
                                            </Link>
                                        </Typography>

                                        {/* User's name, avatar and timestamp */}
                                        <Box display="flex" justifyContent="center" alignItems="center" marginBottom="8px">
                                            {/* Display avatar if available */}
                                            {post.authorAvatar ? (
                                                <img
                                                    src={post.authorAvatar}
                                                    alt={`${post.data.author}'s avatar`}
                                                    style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        borderRadius: '50%',
                                                        marginRight: '16px',
                                                    }}
                                                />
                                            ) : (
                                                <img
                                                    src="./public/images/default-avatar.avif"  // Fallback to default avatar
                                                    alt="default avatar"
                                                    style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        borderRadius: '50%',
                                                        marginRight: '16px',
                                                    }}
                                                />
                                            )}

                                            <Typography variant="subtitle1" style={{ marginRight: '40px', fontWeight: '600' }}>
                                                Posted by:
                                                <Link to={`/user/${post.data.author}`} style={{ textDecoration: 'none', color: '#FFFFFF' }}>
                                                    {post.data.author}
                                                </Link>
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" style={{ color: '#FFFFFF', fontWeight: '600' }}>
                                                {formatRelativeTime(post.data.created_utc)} {/* Changed to created_utc */}
                                            </Typography>
                                        </Box>

                                        {/* Display image if available */}
                                        {isValidImageUrl(post.data.url) ? (
                                            <img
                                                src={cleanUrl(post.data.url)}
                                                alt={post.data.title}
                                                loading="lazy"
                                                style={{ 
                                                    width: 'auto', 
                                                    height: '500px', 
                                                    borderRadius: '8px', 
                                                    marginBottom: '16px', 
                                                    filter: 'brightness(1.1) contrast(1.1)' 
                                                }}
                                            />
                                        ) : post.data.thumbnail && post.data.thumbnail.startsWith('http') ? (
                                            <img
                                                src={cleanUrl(post.data.thumbnail)}
                                                alt={post.data.title}
                                                loading="lazy"
                                                style={{ width: 'auto', height: '500px', borderRadius: '8px', marginBottom: '16px', filter: 'brightness(1.1) contrast(1.1)' }}
                                            />
                                        ) : (
                                            <Typography variant="body1" color="#FFFFFF">No image available for this post.</Typography>
                                        )}

                                        {/* Comments Count */}
                                        <Typography variant="body2" style={{ marginTop: '8px', fontWeight: '600' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <MessageIcon style={{ marginRight: '4px' }} />
                                                {post.data.num_comments}
                                            </div>
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </ListItem>
            ))}
        </List>
    );
};

export default PostList;
