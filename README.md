# Reddit Mini

**Reddit Mini** is a simple web application that allows users to explore various Reddit subreddits. The application fetches data from the Reddit API to display posts, comments, and provide basic navigation between different subreddit topics.

Due to the API call limit if you click too many times it gets blocked for 5 minutes...

https://reddit-mini-react.vercel.app/

![Reddit mini](https://github.com/user-attachments/assets/76f0002c-824a-4760-b540-a1e812954d26)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Limitations](#limitations)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Features

- Browse top posts from multiple subreddits, including **AskReddit**, **gaming**, and **movies**.
- A header with quick navigation buttons to **Hot Topics**, **New Posts**, and **Top Posts**.
- A search functionality to navigate to specific subreddits.
- A left sidebar with the daily topics
- A right sidebar with categories and below that displayinh specific communities
- Displays comments for each post, with avatars sourced from user profiles.

## Technologies Used

- **Frontend**: React, React Router, Material-UI, Axios
- **API**: Reddit API for fetching posts, comments, images, avatars and community icons
- **State Management**: React Hooks for managing component state

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/reddit-mini.git
   ```

2. Navigate into the project directory:

   ```bash
   cd reddit-mini
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your browser and go to `http://localhost:3000`.

## Usage

Once the application is running, you can:

- Navigate between different subreddit topics using the buttons in the header.
- Search for specific subreddits using the search bar.
- Click on the posts in the left sidebar to view its details and comments
- Click on the categories in the right sidebar to see the posts from a specific catagory or community 
- Click on any post to view its comments and details.

## Limitations

- **Desktop Only**: This application is currently designed for desktop use. Due to the number of API calls being made, responsiveness is limited. Any small CSS change leads to reloading the application, which was resulting in temporary blocks by the Reddit API.
- **Testing**: Although testing has not been incorporated into this version, it is planned for future iterations to ensure the reliability of the application, next time, in a new project, I will start with making tests for each function.

## Future Enhancements

- Implement unit tests for components and features to improve code reliability, next time I will start with testing and then continue to build....
- Improve mobile responsiveness and user interface for smaller screens.

## Contributing

Contributions are welcome! If you have suggestions for improvements or features, feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

