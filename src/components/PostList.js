import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, Typography, Button, Box, Divider, Card, CardContent } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const PostList = () => {
    const { category } = useParams(); // Get category from URL
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://www.reddit.com/r/${category ? category : 'all'}/top.json?limit=20`);
                setPosts(response.data.data.children);
            } catch (error) {
                setError("Error fetching posts: " + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [category]);

    if (loading) return <Typography color="textSecondary">Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>; // Display error message

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
                        <Card sx={{ width: '70%', padding: '16px' }}>
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
                                        <Typography variant="h6" gutterBottom>
                                            <Link to={`/r/${post.data.subreddit}/comments/${post.data.id}/${post.data.title.replace(/[^a-z0-9]+/g, '-').toLowerCase()}`}>
                                                {post.data.title}
                                            </Link>
                                        </Typography>

                                        {/* User's name and timestamp above the image, aligned horizontally */}
                                        <Box display="flex" justifyContent="center" alignItems="center" marginBottom="8px">
                                            <Typography variant="subtitle1" style={{ marginRight: '16px' }}>
                                                Posted by:
                                                <Link to={`/user/${post.data.author}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                    {post.data.author}
                                                </Link>
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                            {formatRelativeTime(post.created)}
                                            </Typography>
                                        </Box>

                                        {/* Display image if available */}
                                        {post.data.url && (post.data.url.endsWith('.jpg') || post.data.url.endsWith('.png')) ? (
                                            <img
                                                src={post.data.url}
                                                alt={post.data.title}
                                                loading="lazy" // Lazy loading for performance
                                                style={{ width: 'auto', height: '500px', borderRadius: '8px', marginBottom: '16px', filter: 'brightness(1.1) contrast(1.1)' }}
                                            />
                                        ) : post.data.thumbnail && post.data.thumbnail.startsWith('http') ? (
                                            <img
                                                src={post.data.thumbnail}
                                                alt={post.data.title}
                                                loading="lazy" // Lazy loading for performance
                                                style={{ width: 'auto', height: '500px', borderRadius: '8px', marginBottom: '16px', filter: 'brightness(1.1) contrast(1.1)' }}
                                            />
                                        ) : (
                                            <Typography variant="body1" color="textSecondary">No image available for this post.</Typography>
                                        )}

                                        {/* Comments Count */}
                                        <Typography variant="body2" style={{ marginTop: '8px' }}>
                                            Comments: {post.data.num_comments}
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
