# MetroPulse

## Overview
MetroPulse is a modern, dynamic online newspaper application built with the MERN stack. Designed with a clean and responsive interface, it enables users to seamlessly browse news articles by category or view the latest updates. This full-stack application is optimized for both desktop and mobile users, making it an excellent example of versatile web development. MetroPulse demonstrates advanced integration of third-party tools to fetch and parse data, showcasing a robust backend alongside an intuitive frontend.

## Features
- **Dynamic News Feed**: Browse news articles by category or view the latest updates in real time.
- **Responsive Design**: Fully optimized for both desktop and mobile devices.
- **Interactive Search**: Easily search for news based on categories or keywords.
- **Automated Content Updates**: Leveraging RSS feeds, news articles are automatically fetched and updated daily.
- **Data Parsing**: Uses Cheerio and xml2js for efficient data extraction and transformation from RSS feeds.

## Technologies Used
### Frontend:
- React.js
- React Router
- CSS for styling

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- Cheerio for web scraping
- xml2js for parsing XML feeds

### Additional Tools:
- Axios for API calls
- RSS feed integration for dynamic news updates

## Installation

### Prerequisites
Ensure you have the following installed on your system:
- Node.js
- MongoDB

### Steps
1. Clone the repository:
   ```bash
   https://github.com/nmonroe-dev/MetroPulse.git
   ```
   
2. Navigate to the project directory:
   ```bash
   cd metropulse
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the backend environment:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     MONGO_URI=your-mongodb-connection-string
     PORT=5000
     ```
5. Start the backend server:
   ```bash
   npm run server
   ```
6. Start the frontend development server:
   ```bash
   npm start
   ```
7. Access the application in your browser at `http://localhost:3000`.

## Directory Structure
```
project-folder/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── config/
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── App.js
└── README.md
```

## Pages
1. **HomePage**:
   - Displays the latest news feed and highlights trending categories.
2. **CategoryPage**:
   - Enables users to browse articles filtered by specific categories.
3. **ContactPage**:
   - Includes a fully functional form to send messages via email with a popup confirmation.

## Usage
- Navigate to different sections using the Navbar.
- Use the search and category filters to find articles of interest.
- Explore the latest news directly from the homepage.

## Future Enhancements
- **Authentication**: Add user login and registration for personalized experiences.
- **Classified Section**: Enable posting and browsing of local classified ads.
- **Premium Features**: Paid subscriptions for exclusive content.



## License
This project is licensed under the MIT License.

## Author
Nathan Monroe


