Digital Water Monitoring Network

Overview

The Digital Water Monitoring Network is a web application designed to track water resources in real-time, helping utilities and communities monitor water quality, usage, and detect leaks to prevent waste. Built with a modern, professional interface, it provides an interactive dashboard with dynamic charts, real-time data updates, and alerts for critical events (e.g., high turbidity or leaks). The application uses IoT-inspired data stored in a MySQL database, served via PHP APIs, and rendered with HTML, CSS, and JavaScript on a XAMPP server.

Features

Real-Time Dashboard: Displays water quality (pH, dissolved oxygen, turbidity), usage, and leak detection data.
Dynamic Charts: Visualizes pH and water usage with Chart.js, supporting line and bar modes.
Time-Range Filtering: View data from the last hour, day, or week.
Alerts: Notifies users of high turbidity (>1.9 NTU) or detected leaks with dismissible notifications.
Professional Design: Centered layout, water-themed background graphic, sticky navigation, and scroll animations (AOS).
Responsive UI: Optimized for desktop, tablet, and mobile devices.
Real-Time Updates: Data refreshes every 5 seconds via JavaScript polling.
Tech Stack
Front-End:

HTML5: Structure
CSS3: Styling with a centered layout, wave-pattern background, and responsive design
JavaScript: Interactivity with Chart.js for charts and AOS for animations
External Libraries:
Chart.js (v4.x) for data visualization
AOS (v2.3.4) for scroll animations

Font Awesome (v6.4.2) for icons
Poppins font (Google Fonts) for typography
Back-End:
PHP: API endpoints to fetch data from MySQL
MySQL: Database for storing sensor data
Server.

XAMPP: Local development environment with Apache and MySQL
Deployment:

Runs locally at http://localhost/water-monitoring/

Project Structure

water-monitoring/
├── index.html          # Main front-end file with centered layout
├── styles.css          # CSS for styling, centering, and background graphic
├── scripts.js          # JavaScript for dynamic features and chart rendering
├── api/
│   ├── connect.php     # MySQL database connection
│   ├── fetch_data.php  # API to fetch sensor data
└── setup.sql           # MySQL schema and sample data

Prerequisites

XAMPP: Install from https://www.apachefriends.org/ (tested with XAMPP 8.x).
Browser: Modern browser (e.g., Chrome, Firefox) for testing.
Internet Access: Required for CDN assets (Chart.js, AOS, Font Awesome, Google Fonts) and background images.
Optional: Text editor (e.g., VS Code) for code modifications.
Usage
Dashboard:
View real-time data for water quality (pH, dissolved oxygen, turbidity), usage, and leaks.
Use the Time Range dropdown to filter data (Last Hour, Last Day, Last Week).
Toggle between Line and Bar charts using the Chart Type dropdown.
Click the Refresh button to manually update data.
Dismiss alerts for high turbidity or leaks by clicking the × button.
Navigation:
Use the sticky header to jump to Home, Dashboard, About, or Contact sections.
The Contact button triggers a placeholder alert (form implementation pending).
Responsive Design:
The site is optimized for desktop, tablet, and mobile, with a centered layout and stacked cards on smaller screens.
Background Graphic:
A faint wave pattern enhances the water theme, overlaid with a light gray to ensure readability.
The hero section features a darker water-themed image for contrast.
