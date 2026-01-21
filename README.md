# JobTrack 🚀

JobTrack is a full-stack application designed to help users manage and track their job applications. It features a mobile-responsive frontend built with React Native (Expo) and a robust backend built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Secure login and registration using JWT and bcrypt.
- **Application Management**: Create, view, edit, and delete job applications.
- **Status Tracking**: Track the progress of each application with status badges.
- **Dashboard**: A clean overview of your job application activity.
- **Responsive Design**: Elegant UI with smooth transitions and gradients.

## Tech Stack

### Frontend
- **Framework**: React Native (Expo)
- **Navigation**: React Navigation (Stack & Bottom Tabs)
- **Styling**: Expo Linear Gradient, React Native StyleSheet
- **Storage**: AsyncStorage for local data persistence

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **Logging**: Morgan
- **Security**: Bcryptjs for password hashing

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo Go app (for mobile testing)
- MongoDB account (for database connection)

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add your configuration:
   ```env
   PORT=5001
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the root directory:
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo development server:
   ```bash
   npx expo start
   ```

## Folder Structure

- `backend/`: Node.js server, models, controllers, and routes.
- `src/`: React Native codebase including components, screens, and navigation.
- `assets/`: App icons, splash screens, and images.

---
Built with ❤️ by [Satyam Yadav](https://github.com/satyamyadav979)
