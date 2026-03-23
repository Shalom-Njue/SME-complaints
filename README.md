# SME Complaint Management System

## Overview

The SME Complaint Management System is a full-stack web application designed to streamline the process of handling customer complaints for small and medium enterprises (SMEs). The system provides a professional platform where customers can submit complaints online, track their status in real-time, and communicate directly with support staff through an integrated chat system.

The application features a modern, responsive design that works seamlessly across desktop and mobile devices, ensuring customers can access support whenever and wherever they need it. Administrators benefit from a comprehensive dashboard that enables efficient complaint management, real-time communication, and data-driven insights through analytics.

## Features

### Customer Portal
- **Easy Complaint Submission**: Submit complaints online with detailed categorization (Product Quality, Service Delay, Billing Issue, Staff Behavior, Other)
- **Real-Time Tracking**: Track complaint status using unique ticket IDs (e.g., C-1234)
- **Live Chat Support**: Communicate directly with administrators through real-time chat powered by Socket.io
- **Unread Message Indicators**: Visual badges show the number of unread messages from support staff
- **Email Notifications**: Receive automatic email updates when complaints are submitted or status changes occur
- **Toast Notifications**: Non-intrusive, modern notifications for all actions and updates
- **Mobile-Responsive Design**: Access the system from any device with a fully responsive interface

### Admin Dashboard
- **Centralized Complaint Management**: View and manage all customer complaints in one place
- **Status Updates**: Update complaint status (Pending, In Progress, Resolved) with admin responses
- **Real-Time Chat**: Engage with customers directly through the integrated chat system
- **Unread Message Badges**: See at a glance which complaints have unread customer messages
- **Analytics Dashboard**: Visualize complaint trends with interactive, responsive charts:
  - Category distribution (horizontal bar chart)
  - Status breakdown (doughnut chart)
  - Submission trends over time (line chart with category breakdown tooltips)
  - Resolution time analysis (bar chart showing < 24h, 1-3 days, 3-7 days, > 7 days)
  - Top 5 categories (horizontal bar chart)
- **Secure Authentication**: Protected admin area with email/password login
- **Toast Notifications**: Instant feedback for all administrative actions

### Technical Features
- **Real-Time Communication**: WebSocket-based chat using Socket.io for instant messaging
- **Unread Message Tracking**: Automatic tracking and display of unread messages for both customers and admins
- **RESTful API**: Well-structured API endpoints for all operations
- **Database Persistence**: MongoDB for reliable data storage with automatic timestamps
- **Email Integration**: Automated email notifications using Nodemailer
- **Modern UI**: Clean, professional interface with modular CSS architecture
- **Toast Notification System**: Smooth, animated notifications with auto-dismiss and manual close options
- **Responsive Charts**: All analytics charts adapt to screen size for optimal viewing on any device

## Technology Stack

### Frontend
- **HTML5**: Semantic markup for accessibility and SEO
- **CSS3**: Modular CSS architecture with custom properties
  - base.css: Variables, resets, typography
  - layout.css: Containers, grids, spacing utilities
  - components.css: Reusable UI components
  - pages.css: Page-specific styles
  - responsive.css: Mobile adaptations
- **JavaScript (ES6+)**: Vanilla JavaScript for client-side functionality
- **Socket.io Client (v4.8.3)**: Real-time communication
- **Chart.js**: Data visualization for analytics

### Backend
- **Node.js (v14+)**: JavaScript runtime
- **Express.js (v4.22.1)**: Web application framework
- **Socket.io (v4.8.3)**: Real-time bidirectional communication
- **Mongoose (v7.8.8)**: MongoDB object modeling
- **Nodemailer (v8.0.0)**: Email sending functionality
- **dotenv (v17.2.3)**: Environment variable management
- **cors (v2.8.6)**: Cross-origin resource sharing
- **body-parser (v2.2.2)**: Request body parsing

### Database
- **MongoDB (v4+)**: NoSQL database for flexible data storage

### Development Tools
- **nodemon (v2.0.20)**: Auto-restart server during development

## Installation

### Prerequisites

Before installing the SME Complaint Management System, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v4 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for cloning the repository)

### Step-by-Step Installation

#### 1. Clone or Download the Repository

```bash
# Using Git
git clone <repository-url>
cd sme-complaint-management

# Or download and extract the ZIP file
```

#### 2. Install Dependencies

The project has a root-level script to install all dependencies:

```bash
npm run install-all
```

This will install dependencies for:
- Root project
- Server (backend)
- Client (frontend)

Alternatively, install manually:

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies (if needed)
cd ../client
npm install
```

#### 3. Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cd server
```

Create `.env` file with the following content:

```env
# Server Configuration
PORT=5000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/sme_complaints

# CORS Configuration
CORS_ORIGIN=http://localhost:3005

# Email Configuration (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# For Gmail, you need to:
# 1. Enable 2-factor authentication
# 2. Generate an "App Password" from your Google Account settings
# 3. Use the app password in EMAIL_PASS
```

**Important Email Setup Notes:**
- For Gmail: Enable 2FA and create an App Password
- For other providers: Use appropriate SMTP settings
- Test email functionality after setup

#### 4. Start MongoDB

Ensure MongoDB is running on your system:

```bash
# On Windows (if installed as service)
net start MongoDB

# On macOS/Linux
mongod

# Or if installed via Homebrew (macOS)
brew services start mongodb-community
```

Verify MongoDB is running by connecting:

```bash
mongosh
# or
mongo
```

#### 5. Seed Admin Account (Optional)

To create an admin account for testing, you can manually insert one into MongoDB:

```bash
mongosh sme_complaints
```

Then run:

```javascript
db.admins.insertOne({
  email: "admin@example.com",
  password: "admin123"
})
```

**Note**: In production, passwords should be hashed using bcrypt or similar.

#### 6. Start the Application

From the root directory:

```bash
# Production mode
npm start

# Development mode (with auto-restart)
npm run dev
```

The server will start on `http://localhost:5000`

#### 7. Access the Application

Open your web browser and navigate to:

- **Customer Portal**: `http://localhost:5000`
- **Submit Complaint**: `http://localhost:5000/submit.html`
- **Track Complaint**: `http://localhost:5000/track.html`
- **Admin Login**: `http://localhost:5000/login.html`
- **Admin Dashboard**: `http://localhost:5000/admin.html` (after login)
- **Analytics**: `http://localhost:5000/analytics.html` (after login)

## Usage

### For Customers

#### Submitting a Complaint

1. Navigate to the **Submit Complaint** page (`/submit.html`)
2. Fill in the complaint form:
   - **Name**: Your full name (minimum 2 characters)
   - **Email**: Valid email address for notifications
   - **Phone**: Kenyan phone number format (+254 or 0)
   - **Category**: Select from dropdown (Product Quality, Service Delay, etc.)
   - **Description**: Detailed description of your complaint (minimum 10 characters)
3. Click **Submit Complaint**
4. You will receive:
   - A unique **Ticket ID** (e.g., C-1234)
   - A confirmation email with your ticket details
5. Save your Ticket ID for tracking

#### Tracking a Complaint

1. Navigate to the **Track Status** page (`/track.html`)
2. Enter your **Ticket ID** in the search field
3. Click **Track Complaint**
4. View your complaint details:
   - Current status (Pending, In Progress, Resolved)
   - Admin response (if available)
   - Submission date
5. Click **Open Chat** to communicate with support staff

#### Using Live Chat

1. From the tracking page, click **Open Chat**
2. Type your message in the chat input field
3. Press **Send** or hit Enter
4. Messages appear in real-time for both you and the administrator
5. Chat history is saved and can be accessed anytime

### For Administrators

#### Logging In

1. Navigate to the **Admin Login** page (`/login.html`)
2. Enter your admin credentials:
   - Email: `admin@example.com`
   - Password: `admin123`
3. Click **Login**
4. You will be redirected to the Admin Dashboard

#### Managing Complaints

1. From the **Admin Dashboard** (`/admin.html`):
   - View all complaints in a sortable table
   - See complaint details: ID, customer name, category, status, date
2. To update a complaint:
   - Click **Update** next to any complaint
   - Change the **Status** (Pending → In Progress → Resolved)
   - Add an **Admin Response** with your resolution notes
   - Click **Save**
3. Customer receives an automatic email notification of the update

#### Using Admin Chat

1. Click **Chat** next to any complaint in the dashboard
2. View the complete chat history with the customer
3. Type your response and click **Send**
4. Messages are delivered instantly to the customer if they're online

#### Viewing Analytics

1. Navigate to the **Analytics Dashboard** (`/analytics.html`)
2. View five interactive, responsive charts:
   - **Category Distribution**: Horizontal bar chart showing complaints by category
   - **Status Breakdown**: Doughnut chart showing pending vs. in progress vs. resolved complaints
   - **Submission Trends**: Line chart showing complaints over time with category breakdown tooltips
   - **Resolution Time**: Bar chart showing how quickly complaints are resolved (< 24h, 1-3 days, 3-7 days, > 7 days)
   - **Top 5 Categories**: Horizontal bar chart highlighting the most common complaint types
3. Hover over data points to see detailed breakdowns
4. Use insights to identify common issues and improve service

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Submit a Complaint

**POST** `/api/complaints`

Submit a new customer complaint.

**Request Body:**
```json
{
  "customerName": "John Doe",
  "email": "john@example.com",
  "phone": "+254712345678",
  "category": "Product Quality",
  "description": "The product I received was damaged during shipping."
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Complaint submitted",
  "id": "C-1234"
}
```

**Response (500 Error):**
```json
{
  "success": false,
  "error": "Error message"
}
```

#### 2. Track Complaint by ID

**GET** `/api/complaints/:id`

Retrieve complaint details by ticket ID.

**Parameters:**
- `id` (path): Complaint ticket ID (e.g., C-1234)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "complaintId": "C-1234",
    "customerName": "John Doe",
    "email": "john@example.com",
    "phone": "+254712345678",
    "category": "Product Quality",
    "description": "The product I received was damaged during shipping.",
    "status": "In Progress",
    "adminResponse": "We are processing your refund.",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T14:20:00.000Z",
    "resolvedAt": null,
    "messages": [],
    "unreadCount": {
      "customer": 2,
      "admin": 0
    }
  }
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Complaint not found"
}
```

#### 3. Admin Login

**POST** `/api/admin/login`

Authenticate an administrator.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful"
}
```

**Response (400 Bad Request):**
```json
{
  "message": "Invalid credentials"
}
```

#### 4. Get All Complaints (Admin)

**GET** `/api/admin/complaints`

Retrieve all complaints (admin only).

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "complaintId": "C-1234",
      "customerName": "John Doe",
      "email": "john@example.com",
      "phone": "+254712345678",
      "category": "Product Quality",
      "description": "The product I received was damaged.",
      "status": "In Progress",
      "adminResponse": "Processing refund.",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T14:20:00.000Z"
    }
  ]
}
```

#### 5. Update Complaint Status (Admin)

**PUT** `/api/admin/complaints/:id`

Update complaint status and admin response.

**Parameters:**
- `id` (path): Complaint ticket ID

**Request Body:**
```json
{
  "status": "Resolved",
  "adminResponse": "Your refund has been processed and will reflect in 3-5 business days."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "complaintId": "C-1234",
    "status": "Resolved",
    "adminResponse": "Your refund has been processed...",
    "updatedAt": "2024-01-15T16:00:00.000Z"
  }
}
```

#### 6. Get Analytics Data (Admin)

**GET** `/api/admin/analytics`

Retrieve aggregated analytics data for charts.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "categoryData": [
      { "_id": "Product Quality", "count": 15 },
      { "_id": "Service Delay", "count": 10 },
      { "_id": "Billing Issue", "count": 8 }
    ],
    "statusData": [
      { "_id": "Pending", "count": 12 },
      { "_id": "In Progress", "count": 8 },
      { "_id": "Resolved", "count": 13 }
    ],
    "dateData": [
      { "_id": "2024-01-10", "count": 5 },
      { "_id": "2024-01-11", "count": 3 },
      { "_id": "2024-01-12", "count": 7 }
    ],
    "categoryByDate": {
      "2024-01-10": { "Product Quality": 3, "Service Delay": 2 },
      "2024-01-11": { "Billing Issue": 2, "Product Quality": 1 },
      "2024-01-12": { "Service Delay": 4, "Product Quality": 3 }
    },
    "resolutionTimeData": {
      "lessThan24h": 8,
      "oneToThreeDays": 12,
      "threeToSevenDays": 5,
      "moreThanSevenDays": 2
    }
  }
}
```

#### 7. Get Chat Messages

**GET** `/api/complaints/:id/messages`

Retrieve chat message history for a complaint.

**Parameters:**
- `id` (path): Complaint ticket ID

**Response (200 OK):**
```json
{
  "success": true,
  "messages": [
    {
      "sender": "Customer",
      "text": "When will this be resolved?",
      "timestamp": "2024-01-15T11:00:00.000Z",
      "read": false
    },
    {
      "sender": "Admin",
      "text": "We are working on it and will update you soon.",
      "timestamp": "2024-01-15T11:05:00.000Z",
      "read": true
    }
  ],
  "unreadCount": {
    "customer": 1,
    "admin": 0
  }
}
```

### WebSocket Events (Socket.io)

#### Client → Server Events

**joinRoom**
```javascript
socket.emit('joinRoom', { complaintId: 'C-1234' });
```

**markAsRead**
```javascript
socket.emit('markAsRead', { 
  complaintId: 'C-1234', 
  userType: 'Customer' // or 'Admin'
});
```

**chatMessage**
```javascript
socket.emit('chatMessage', {
  complaintId: 'C-1234',
  sender: 'Customer', // or 'Admin'
  text: 'Hello, I need help with my complaint.'
});
```

#### Server → Client Events

**message**
```javascript
socket.on('message', (data) => {
  // data: { 
  //   sender: 'Admin', 
  //   text: 'How can I help?', 
  //   timestamp: Date,
  //   unreadCount: { customer: 1, admin: 0 }
  // }
});
```

**unreadCountUpdated**
```javascript
socket.on('unreadCountUpdated', (data) => {
  // data: { 
  //   unreadCount: { customer: 0, admin: 0 }
  // }
});
```

## New Features & Enhancements

### Unread Message Indicators
The system now tracks and displays unread messages for both customers and administrators:
- **Visual Badges**: Red circular badges appear on chat buttons showing the count of unread messages
- **Real-Time Updates**: Badges update instantly when new messages arrive via Socket.io
- **Automatic Reset**: Unread count resets to 0 when the chat is opened
- **Persistent Tracking**: Unread counts are stored in the database and persist across sessions

### Toast Notifications
Modern, non-intrusive notifications replace traditional alert dialogs:
- **Types**: Success (green), Error (red), Info (blue), Warning (orange)
- **Auto-Dismiss**: Notifications automatically disappear after 4 seconds (configurable)
- **Manual Close**: Users can close notifications manually with the × button
- **Smooth Animations**: Slide-in from right, slide-out on dismiss
- **Stacking**: Multiple notifications stack vertically
- **Mobile Responsive**: Adapts to mobile screens with full-width display

### Enhanced Analytics
The analytics dashboard now provides deeper insights:
- **Resolution Time Tracking**: Automatically calculates and displays how long it takes to resolve complaints
- **Category Breakdown Tooltips**: Hover over trend chart points to see which categories were submitted each day
- **Responsive Charts**: All charts adapt to screen size for optimal viewing on any device
- **Real-Time Data**: All charts display live data from the database, no mock data

## Project Structure

```
sme-complaint-management/
│
├── client/                          # Frontend application
│   ├── public/                      # Static files served to browser
│   │   ├── css/                     # Modular CSS architecture
│   │   │   ├── base.css            # Variables, resets, typography
│   │   │   ├── layout.css          # Containers, grids, spacing
│   │   │   ├── components.css      # Buttons, forms, cards, badges
│   │   │   ├── pages.css           # Page-specific styles
│   │   │   ├── responsive.css      # Mobile adaptations
│   │   │   └── styles.css          # Legacy styles (deprecated)
│   │   │
│   │   ├── js/                      # Client-side JavaScript
│   │   │   └── main.js             # Main application logic
│   │   │
│   │   ├── index.html              # Home page with hero and features
│   │   ├── submit.html             # Complaint submission form
│   │   ├── track.html              # Complaint tracking page
│   │   ├── login.html              # Admin login page
│   │   ├── admin.html              # Admin dashboard
│   │   └── analytics.html          # Analytics dashboard
│   │
│   └── package.json                # Client dependencies
│
├── server/                          # Backend application
│   ├── models/                      # Mongoose data models
│   │   ├── complaint.js            # Complaint schema
│   │   └── admin.js                # Admin schema
│   │
│   ├── node_modules/               # Server dependencies (gitignored)
│   ├── .env                        # Environment variables (gitignored)
│   ├── .gitignore                  # Git ignore rules
│   ├── server.js                   # Main server file (Express + Socket.io)
│   ├── helpers.js                  # Utility functions (email sending)
│   ├── package.json                # Server dependencies
│   └── package-lock.json           # Dependency lock file
│
├── .kiro/                           # Kiro IDE configuration
│   └── specs/                       # Feature specifications
│       └── sme-system-improvements/ # Current improvement spec
│
├── package.json                     # Root package.json with scripts
└── README.md                        # This file
```

### Key Files Explained

- **server/server.js**: Main Express server with API routes and Socket.io configuration
- **server/models/complaint.js**: MongoDB schema for complaints with embedded chat messages
- **server/models/admin.js**: MongoDB schema for admin authentication
- **server/helpers.js**: Email sending utility using Nodemailer
- **client/public/js/main.js**: Client-side JavaScript handling forms, API calls, and Socket.io
- **client/public/css/**: Modular CSS files for maintainable styling
- **client/public/*.html**: HTML pages for different application views

## Screenshots

### Customer Portal
- **Home Page**: Modern landing page with hero section, features grid, benefits, and statistics
- **Submit Complaint**: User-friendly form with validation and category selection
- **Track Status**: Real-time status tracking with chat integration

### Admin Dashboard
- **Complaint Management**: Table view of all complaints with update functionality
- **Analytics**: Interactive charts showing complaint trends and insights
- **Live Chat**: Real-time communication interface with customers

*Note: Screenshots will be added in future updates. For a live demo, please run the application locally.*

## Contributing

We welcome contributions to improve the SME Complaint Management System! Here's how you can help:

### Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/sme-complaint-management.git
   ```
3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Guidelines

- **Code Style**: Follow existing code formatting and naming conventions
- **Comments**: Add clear comments for complex logic
- **Testing**: Test your changes thoroughly before submitting
- **Commits**: Write clear, descriptive commit messages
- **Documentation**: Update README.md if you add new features

### Areas for Contribution

- **Security**: Implement password hashing (bcrypt) for admin accounts
- **Authentication**: Add JWT-based authentication for API endpoints
- **Testing**: Add unit tests and integration tests
- **UI/UX**: Improve design and user experience
- **Features**: Add new functionality (file uploads, complaint categories, etc.)
- **Performance**: Optimize database queries and frontend performance
- **Accessibility**: Improve WCAG compliance and screen reader support
- **Internationalization**: Add multi-language support

### Submitting Changes

1. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add: Brief description of your changes"
   ```
2. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
3. **Create a Pull Request** on GitHub with:
   - Clear description of changes
   - Screenshots (if UI changes)
   - Testing steps
   - Related issue numbers (if applicable)

### Code Review Process

- All submissions require review before merging
- Maintainers will provide feedback within 3-5 business days
- Address review comments and update your PR
- Once approved, your changes will be merged

### Reporting Issues

Found a bug or have a feature request?

1. Check existing issues to avoid duplicates
2. Create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce (for bugs)
   - Expected vs. actual behavior
   - Screenshots or error messages
   - Environment details (OS, Node version, etc.)

## License

This project is licensed under the **ISC License**.

### ISC License

Copyright (c) 2024 SME Complaint Management System Contributors

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

---

## Support

For questions, issues, or support:

- **Email**: support@sme-complaints.example.com
- **GitHub Issues**: [Create an issue](https://github.com/your-org/sme-complaint-management/issues)
- **Documentation**: Refer to this README and inline code comments

## Acknowledgments

- Built with modern web technologies for reliability and performance
- Inspired by the need for efficient SME customer support solutions
- Thanks to all contributors who help improve this system

---

**Version**: 2.0.0  
**Last Updated**: March 2026  
**Maintained By**: SME Complaint Management Team
