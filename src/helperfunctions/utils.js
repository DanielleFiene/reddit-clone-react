// src/helperfunctions/utils.js
// Cleaning the image URLs because fetching everything was becoming unreadable
export const isValidImageUrl = (url) => {
    const imageFormats = [
        '.jpg', '.jpeg', '.png', '.gif', '.eps', '.tiff', '.raw',
        '.pdf', '.psd', '.bmp', '.webp', '.svg', '.amp', '.xcf',
        '.jfif', '.pjpeg', '.pjp'
    ];
    return imageFormats.some(format => url.endsWith(format)) || url.includes('format=jpg') || url.includes('format=png');
};

// Clean general URLs by replacing &amp; with &
export const cleanUrl = (url) => url ? url.replace(/&amp;/g, '&') : '';

// Cleaning the avatar URLs because fetching everything was becoming unreadable
export const isValidAvatarUrl = (url) => {
    const avatarFormats = [
        '.jpg', '.jpeg', '.png', '.gif', '.eps', '.tiff', '.raw',
        '.pdf', '.psd', '.bmp', '.webp', '.svg', '.amp', '.xcf',
        '.jfif', '.pjpeg', '.pjp'
    ];
    return avatarFormats.some(format => url.endsWith(format)) || url.includes('format=jpg') || url.includes('format=png');
};

export const cleanAvatarUrl = (url) => url ? url.replace(/&amp;/g, '&') : ''; // Clean avatar URLs
