// src/components/MainContent.js wraps PostList and PostDetail components
import React from 'react';
import PostList from './PostList';
import PostDetail from './PostDetail';
import { Routes, Route } from 'react-router-dom';

const MainContent = () => {
    return (
        <div style={{ flex: 1, padding: '16px', backgroundColor: '#d3d3d3' }}>
            <Routes>
                <Route path="/r/:category" element={<PostList />} />
                <Route path="/r/:subreddit/comments/:postId/:postTitle" element={<PostDetail />} />
                <Route path="/" element={<PostList />} /> {/* Default route to show the post list */}
            </Routes>
        </div>
    );
};

export default MainContent;
