# Restoping - Frontend

This is the frontend application for Restoping, built with React and Vite. It supports web and mobile (via Capacitor).

## Tech Stack

- **Framework**: React
- **Build Tool**: Vite
- **Mobile**: Capacitor (Android/iOS)
- **Backend Services**: Firebase
- **Styling**: (Add styling library if known, e.g., Tailwind, generic CSS modules)

## Prerequisites

- Node.js (v18 or higher recommended)

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file for your local environment variables.
   **Important**: Do not commit secrets to the repository.

## Running the Application

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## Mobile Development (Capacitor)

### Sync with Android
```bash
npx cap sync android
```

### Open Android Studio
```bash
npx cap open android
```
