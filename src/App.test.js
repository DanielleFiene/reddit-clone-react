// src/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the child components to isolate the App component
jest.mock('./components/LeftSideBar', () => () => <div>Left Sidebar</div>);
jest.mock('./components/RightSideBar', () => () => <div>Right Sidebar</div>);
jest.mock('./components/MainContent', () => () => <div>Main Content</div>);
jest.mock('./components/Header', () => () => <div>Header</div>);

test('renders the App component with child components', () => {
    render(<App />);

    // Assert that child components are rendered
    expect(screen.getByText(/header/i)).toBeInTheDocument();
    expect(screen.getByText(/left sidebar/i)).toBeInTheDocument();
    expect(screen.getByText(/main content/i)).toBeInTheDocument();
    expect(screen.getByText(/right sidebar/i)).toBeInTheDocument();
});
