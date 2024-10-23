import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, CircularProgress, ListItemAvatar, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LeftSidebar = () => {
    const navigate = useNavigate();
    const [dailyThreads, setDailyThreads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDailyThreads = async () => {
            setLoading(true);
            try {
                // Fetch daily discussion threads from multiple subreddits
                const response = await Promise.all([
                    axios.get('https://www.reddit.com/r/AskReddit/top.json?limit=5'),
                    axios.get('https://www.reddit.com/r/news/top.json?limit=5'),
                    axios.get('https://www.reddit.com/r/movies/top.json?limit=5')
                ]);

                // Extract data from the responses
                const threads = response.flatMap(res => res.data.data.children);
                setDailyThreads(threads);
            } catch (error) {
                console.error("Error fetching daily discussion threads:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDailyThreads();
    }, []);

    return (
        <div style={{ 
            width: '200px', 
            padding: '16px', 
            borderRight: '1px solid #ccc', 
            boxShadow: '10px 0 20px rgba(0, 0, 0, 0.5)',
            zIndex: 1
        }}>
            <h3 style={{ borderBottom: '1px solid #ccc', textAlign: 'center' }}>Daily Discussion Threads</h3>
            {loading ? (
                <CircularProgress />
            ) : (
                <List>
                    {dailyThreads.map((thread) => {
                        const threadData = thread.data;

                        return (
                            threadData && (
                                <ListItem 
                                    style={{ cursor: 'pointer' }}
                                    button 
                                    key={threadData.id} 
                                    onClick={() => navigate(`/r/${threadData.subreddit}/comments/${threadData.id}/${threadData.title.replace(/[^a-z0-9]+/g, '-').toLowerCase()}`)}
                                >
                                    <ListItemAvatar>
                                        <Avatar 
                                            src="./images/daily-discussion-icon.webp"
                                            alt="Discussion Icon"
                                        />
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary={
                                            <span style={{
                                                fontSize: '0.875rem', // Smaller font size (14px)
                                                whiteSpace: 'normal', // Allow wrapping at whitespace
                                                overflowWrap: 'break-word', // Allow long words to break
                                                maxWidth: '140px', // Set a maximum width for the text
                                            }}>
                                                {threadData.title}
                                            </span>
                                        } 
                                    />
                                </ListItem>
                            )
                        );
                    })}
                </List>
            )}
        </div>
    );
};

export default LeftSidebar;
