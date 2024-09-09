
# Login App

![React](https://img.shields.io/badge/React-v18.2.0-blue) 
![Firebase](https://img.shields.io/badge/Firebase-Authentication-orange) 
![Firestore](https://img.shields.io/badge/Firestore-NoSQL-yellow) 
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-brightgreen)
![Firebase Hosting](https://img.shields.io/badge/Firebase%20Hosting-Live-brightgreen)

This project is a login application built using **React** for the frontend, **Firebase** for authentication and Firestore as the database, and **GitHub Actions** for continuous integration and deployment. The app supports user registration, login with email/password, Google login, and logout functionality. It also stores user data securely in Firestore and has deployment on Firebase Hosting.

## Features

- ✅ User registration with email and password.
- ✅ Login with email and password.
- ✅ Login with Google account.
- ✅ Firebase Authentication for secure user management.
- ✅ Firestore database for storing user profiles.
- ✅ Logout functionality.
- ✅ Continuous integration using GitHub Actions.
- ✅ Firebase Hosting deployment.

## Tech Stack

- **Frontend**: ![React](https://img.shields.io/badge/React-v18.2.0-blue)
- **Authentication**: ![Firebase](https://img.shields.io/badge/Firebase-Authentication-orange)
- **Database**: ![Firestore](https://img.shields.io/badge/Firestore-NoSQL-yellow)
- **Deployment**: ![Firebase Hosting](https://img.shields.io/badge/Firebase%20Hosting-Live-brightgreen)
- **CI/CD**: ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-brightgreen)

## Prerequisites

- Node.js (v16+)
- Firebase account (for Authentication and Firestore setup)
- Firebase CLI installed globally: `npm install -g firebase-tools`
- Git

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### 1. Clone the repository

```bash
git clone https://github.com/Git-abby/login-app.git
cd login-app
```

### 2. Install Dependencies

Before running the project, install the required npm packages.

```bash
npm install
```

### 3. Firebase Setup

You need to configure Firebase for authentication and Firestore in your project. Follow these steps:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Add Firebase Authentication (enable Email/Password and Google sign-in methods).
4. Create a Firestore database (choose "Start in Test mode" for ease of development).
5. Create a new web app in Firebase and get the configuration keys.

```plaintext
REACT_APP_API_KEY=your-firebase-api-key
REACT_APP_AUTH_DOMAIN=your-firebase-auth-domain
REACT_APP_PROJECT_ID=your-firebase-project-id
REACT_APP_STORAGE_BUCKET=your-firebase-storage-bucket
REACT_APP_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
REACT_APP_APP_ID=your-firebase-app-id
```

### 4. Running the Application Locally

Once the Firebase configuration is set up, you can run the application locally.

```bash
npm start
```

This will start the development server at `http://localhost:3000`.

### 5. Deploying to Firebase

Once you're ready to deploy, follow these steps:

1. Log in to Firebase CLI:

```bash
firebase login
```

2. Initialize Firebase in your project:

```bash
firebase init
```

Select **Hosting** and configure the public directory as `build`. After that, build the app:

```bash
npm run build
```

3. Deploy the application:

```bash
firebase deploy
```

Your app will now be live on Firebase Hosting!

### 6. Continuous Integration with GitHub Actions

This repository includes GitHub Actions for automatic deployment to Firebase Hosting when code is pushed to the `main` branch.

To set up the CI/CD pipeline, you need to add your Firebase `FIREBASE_TOKEN` to the GitHub repository secrets:

1. Run the following command to get your Firebase token:

```bash
firebase login:ci
```

2. Go to your GitHub repository and navigate to **Settings > Secrets and Variables > Actions**.
3. Add a new secret with the name `FIREBASE_TOKEN` and paste the token value.

Once set, your app will automatically be deployed to Firebase Hosting upon every push to the `main` branch.

## Project Structure

```plaintext
login-app/
├── public/                  # Public assets and index.html
├── src/                     # Application source code
│   ├── components/          # Reusable components like Login, Register, Profile
│   ├── firebase.js          # Firebase configuration and initialization
│   ├── App.js               # Main app component
│   ├── index.js             # Entry point of the React app
│   └── styles/              # CSS styles for the app
├── .github/                 # GitHub Actions workflow configuration
│   └── workflows/
│       └── firebase-hosting-merge.yml
│       └── firebase-hosting-pull-request.yml
├── .gitignore               # Files and folders to be ignored by Git
├── package.json             # Dependencies and scripts
├── README.md                # Project documentation
└── firebase.json            # Firebase configuration for hosting
```

## Available Scripts

In the project directory, you can run the following scripts:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for best performance.

## Firestore Security Rules

You can modify your Firestore security rules by editing the Firestore rules in the Firebase Console or in the `firestore.rules` file. Ensure that only authenticated users can access the data.

```plaintext
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
