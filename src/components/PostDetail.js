import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
    Typography,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    Box,
    Button,
    Divider,
    Card,
    CardContent,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MessageIcon from '@mui/icons-material/Message';

const PostDetail = () => {
    const { subreddit, postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await axios.get(`https://www.reddit.com/r/${subreddit}/comments/${postId}.json`);
                if (response.data && response.data.length > 0 && response.data[0].data.children.length > 0) {
                    setPost(response.data[0].data.children[0].data);
                    setComments(response.data[1].data.children);
                } else {
                    setError("Post not found.");
                }
            } catch (error) {
                setError("Error fetching post details: " + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPostDetails();
    }, [subreddit, postId]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;
    if (!post) return <Typography color="error">Post data is unavailable.</Typography>;

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
        <Box sx={{ padding: '16px', display: 'flex', justifyContent: 'center' }}>
            {/* Card Wrapper for Post Details */}
            <Card sx={{ width: '70%', padding: '16px', backgroundColor: '#333', borderRadius: '8px', color: '#FFFFFF', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)' }}>
                <CardContent >
                    {/* Title */}
                    <Typography variant="h4" gutterBottom style={{ fontWeight: '600', color: '#FF5700', textAlign: 'center' }}>{post.title}</Typography>

                    {/* User's name and timestamp above the image, aligned horizontally this time.. */}
                    <Box display="flex" justifyContent="center" alignItems="center" marginBottom="16px">
                        <Typography variant="subtitle1" sx={{ marginRight: '40px', fontWeight: '600' }}>
                            Posted by:  
                            <Link to={`/user/${post.author}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                {post.author}
                            </Link>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ color: '#FFFFFF', fontWeight: '600' }}>{formatRelativeTime(post.created)}</Typography>
                    </Box>

                    <Box display="flex" alignItems="center" justifyContent="center" marginBottom="16px">
                        {/* Upvote and downvote buttons */}
                        <Box display="flex" flexDirection="column" alignItems="center" style={{ marginRight: '16px' }}>
                            <Button size="small" onClick={() => console.log('Upvote post')}>
                                <ArrowUpwardIcon />
                            </Button>
                            <Typography variant="body1">{post.ups}</Typography>
                            <Button size="small" onClick={() => console.log('Downvote post')}>
                                <ArrowDownwardIcon />
                            </Button>
                        </Box>

                        {/* Display images if available */}
                        {post.url && (post.url.endsWith('.jpg') || post.url.endsWith('.png')) ? (
                            <img
                                src={post.url}
                                alt={post.title}
                                loading="lazy"
                                style={{ width: '100%', borderRadius: '8px', marginBottom: '16px', filter: 'brightness(1.1) contrast(1.1)' }}
                            />
                        ) : post.preview && post.preview.images.length > 0 ? (
                            <img
                                src={post.preview.images[0].source.url}
                                alt={post.title}
                                loading="lazy"
                                style={{ width: '100%', borderRadius: '8px', marginBottom: '16px', filter: 'brightness(1.1) contrast(1.1)' }}
                            />
                        ) : post.thumbnail && post.thumbnail.startsWith('http') ? (
                            <img
                                src={post.thumbnail}
                                alt={post.title}
                                loading="lazy"
                                style={{ width: '50%', height: 'auto', borderRadius: '8px', marginBottom: '16px', filter: 'brightness(1.1) contrast(1.1)' }}
                            />
                        ) : (
                            <Typography variant="body1" color="#FFFFFFF">No image available for this post.</Typography>
                        )}
                    </Box>

                    {/* Comments Section */}
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: '600' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <MessageIcon style={{ marginRight: '8px' }} />
                            {post.num_comments}
                        </div>
                    </Typography>
                    <List style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {comments.map(comment => (
        <div key={comment.data.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '8px', marginBottom: '8px', width: '100%' }}>
            <ListItem style={{ justifyContent: 'center' }}>
                <ListItemText
                    primary={
                        <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
                            {comment.data.body}
                        </Typography>
                    }
                    secondary={
                        <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                            {`By: ${comment.data.author} | ${formatRelativeTime(comment.data.created)}`}
                        </Typography>
                    }
                />
                <Box display="flex" alignItems="center">
                    <Button size="small" onClick={() => console.log('Upvote comment')} style={{ marginRight: '8px' }}>
                        <ArrowUpwardIcon />
                    </Button>
                    <Button size="small" onClick={() => console.log('Downvote comment')}>
                        <ArrowDownwardIcon />
                    </Button>
                </Box>
            </ListItem>
            <Divider />
        </div>
    ))}
</List>
                </CardContent>
            </Card>
        </Box>
    );
};

export default PostDetail;
