# BidSync

BidSync is an auction app built with React for the frontend and Express for the backend. Firebase is used for authentication.

**Server repository:** [https://github.com/jamshed-uddin/bidSync-server](https://github.com/jamshed-uddin/bidSync-server)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine (v14 or higher)
- npm or yarn package manager
- Firebase account and project set up

## Getting Started

Follow these steps to get the app running locally:

### 1. Clone the repository

```sh
git clone https://github.com/jamshed-uddin/bidSync-client.git
```

### 2.Go to the directory

```sh
cd bidSync-client
```

### 2.Install the dependencies

```sh
npm install
```

or

```sh
yarn install
```

### 3. Set up firebase

- Create a new project on the Firebase Console.
- Enable Authentication: Go to the Authentication section and enable the **Email/Password** and **Google** sign-in methods
- Create a new Web App in your Firebase project to get your Firebase configuration.

**Configure firebase**
Create a `.env.local` file in the root directory with the following Firebase configuration:

```env
VITE_apiKey=apiKey 
VITE_authDomain=authDomain
VITE_projectId=projectId
VITE_storageBucket=storageBucket
VITE_messagingSenderId=messagingSenderId
VITE_appId=appId
```

### 4. Start the app

```sh
npm run dev
```
