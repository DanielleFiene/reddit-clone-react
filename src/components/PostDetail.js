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
import { cleanAvatarUrl, isValidAvatarUrl, isValidImageUrl } from '../helperfunctions/utils'; // Import utility functions

const PostDetail = () => {
    const { subreddit, postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [authorAvatar, setAuthorAvatar] = useState(null);
    const [commentAvatars, setCommentAvatars] = useState({}); // Store avatars for comments

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await axios.get(`https://www.reddit.com/r/${subreddit}/comments/${postId}.json`);
                if (response.data && response.data.length > 0 && response.data[0].data.children.length > 0) {
                    setPost(response.data[0].data.children[0].data);
                    setComments(response.data[1].data.children);
                    await fetchAuthorAvatar(response.data[0].data.children[0].data.author);
                    await fetchCommentAvatars(response.data[1].data.children); // Fetch avatars for comments
                } else {
                    setError("Post not found.");
                }
            } catch (error) {
                setError("Error fetching post details: " + error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchAuthorAvatar = async (author) => {
            try {
                const userResponse = await axios.get(`https://www.reddit.com/user/${author}/about.json`);
                let userIcon = cleanAvatarUrl(userResponse.data.data.icon_img);
                let snoovatar = cleanAvatarUrl(userResponse.data.data.snoovatar_img);

                // Set the avatar to the first valid option
                setAuthorAvatar(isValidAvatarUrl(snoovatar) ? snoovatar : (isValidAvatarUrl(userIcon) ? userIcon : null));
            } catch (error) {
                console.log(`Failed to fetch avatar for user ${author}`, error);
                setAuthorAvatar(null); // Fallback to null if there's an error
            }
        };

        const fetchCommentAvatars = async (comments) => {
            const avatars = {};
            await Promise.all(comments.map(async (comment) => {
                try {
                    const userResponse = await axios.get(`https://www.reddit.com/user/${comment.data.author}/about.json`);
                    let userIcon = cleanAvatarUrl(userResponse.data.data.icon_img);
                    let snoovatar = cleanAvatarUrl(userResponse.data.data.snoovatar_img);
                    
                    // Store avatar only if it's valid
                    avatars[comment.data.author] = isValidAvatarUrl(snoovatar) ? snoovatar : (isValidAvatarUrl(userIcon) ? userIcon : null);
                } catch (error) {
                    console.log(`Failed to fetch avatar for comment user ${comment.data.author}`, error);
                    avatars[comment.data.author] = null; // Fallback if error
                }
            }));
            setCommentAvatars(avatars); // Set state with all comment avatars
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
                <CardContent>
                    {/* Title */}
                    <Typography variant="h4" gutterBottom style={{ fontWeight: '600', color: '#FF5700', textAlign: 'center' }}>{post.title}</Typography>

                    {/* User's name, avatar, and timestamp */}
                    <Box display="flex" justifyContent="center" alignItems="center" marginBottom="16px">
                        {authorAvatar ? (
                            <img
                                src={authorAvatar}
                                alt={`${post.author}'s avatar`}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    marginRight: '16px',
                                }}
                            />
                        ) : (
                            <img
                                src="./public/images/default-avatar.avif" // Fallback to default avatar
                                alt="default avatar"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    marginRight: '16px',
                                }}
                            />
                        )}
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
                        {isValidImageUrl(post.url) ? (
                            <img
                                src={post.url}
                                alt={post.title}
                                loading="lazy"
                                style={{ width: 'auto', height: '500px', borderRadius: '8px', marginBottom: '16px', filter: 'brightness(1.1) contrast(1.1)' }}
                            />
                        ) : post.thumbnail && post.thumbnail.startsWith('http') ? (
                            <img
                                src={post.thumbnail}
                                alt={post.title}
                                loading="lazy"
                                style={{ width: 'auto', height: '500px', borderRadius: '8px', marginBottom: '16px', filter: 'brightness(1.1) contrast(1.1)' }}
                            />
                        ) : (
                            <Typography variant="body1" color="#FFFFFF">No image available for this post.</Typography>
                        )}
                    </Box>

                    {/* Comments Section */}
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: '600' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <MessageIcon style={{ marginRight: '8px' }} />
                            {post.num_comments}
                        </div>
                    </Typography>
                    <List style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        {comments.map(comment => (
                            <div key={comment.data.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '8px', marginBottom: '8px', width: '100%' }}>
                                <ListItem style={{ justifyContent: 'flex-start', padding: '0' }}>
                                    {commentAvatars[comment.data.author] ? (
                                        <img
                                            src={commentAvatars[comment.data.author]}
                                            alt={`${comment.data.author}'s avatar`}
                                            style={{
                                                width: '30px',
                                                height: '30px',
                                                borderRadius: '50%',
                                                marginRight: '8px',
                                            }}
                                        />
                                    ) : (
                                        <img
                                            src="./public/images/default-avatar.avif" // Fallback to default avatar
                                            alt="default avatar"
                                            style={{
                                                width: '30px',
                                                height: '30px',
                                                borderRadius: '50%',
                                                marginRight: '8px',
                                            }}
                                        />
                                    )}
                                    <ListItemText
                                        primary={
                                            <Typography variant="body1" sx={{ color: '#FFFFFF', cursor: 'pointer', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} onClick={() => console.log(`Clicked on ${comment.data.author}`)}>
                                                {comment.data.body}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                                                {`By: `}
                                                <span onClick={() => console.log(`Clicked on ${comment.data.author}`)} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                                                    {comment.data.author}
                                                </span>
                                                {` | ${formatRelativeTime(comment.data.created)}`}
                                            </Typography>
                                        }
                                    />
                                    <Box display="flex" alignItems="center" style={{ minWidth: '60px' }}>
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
