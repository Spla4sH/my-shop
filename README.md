# myshop-app

This is a Shop Application for "Hochschule Furtwangen" for the Course "Webprogrammierung mit React".

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the Development Server](#running-the-development-server)
4. [Folder Structure](#folder-structure)
5. [Preview](#preview)

---

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v20.16.0 or later): [Download Node.js](https://nodejs.org/)

To verify, run the following commands in your terminal:

```bash
node -v
npm -v
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Spla4sH/my-shop.git
   ```

2. Navigate to the project directory:

   ```bash
   cd web-shop-main
   ```

3. Install dependencies:

   Using npm:

   ```bash
   npm install
   ```

## Running the Development Server and Backend Server

To start the development server:

Using npm:

```bash
npm run dev
```

This will launch the app in your default web browser. By default, it runs on `http://localhost:5173`.

## Folder Structure

Here is a basic overview of the project structure:

```
project-root/
├── src/                  # Source code
│   ├── api/              # API endpoints
│   ├── assets/           # static assets
│   ├── components/       # Reusable React components
│   ├── i18n/             # Internationalization Framework
│   ├── locales/          # Translations for de/en/fr
│   ├── pages/            # Pages which are displayed on the website
│   ├── store/            # Redux store for global State Management
│   ├── theme/            # Theme used for App.jsx
│   ├── App.css           # Global style
│   ├── App.jsx           # Main application component
│   ├── index.css         # Global style
│   └── main.jsx          # Entry point for Vite
├── .gitignore            # Files to ignore in Git
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML template
├── package-lock.json     # Project configuration and dependencies (Automatically generated by npm)
├── package.json          # Project configuration and dependencies
├── README.md             # Project documentation
└── vite.config.js        # Vite configuration file
```

## Preview

![image](https://github.com/user-attachments/assets/8086872a-5317-4203-9b05-52efb5aa89c2)
![image](https://github.com/user-attachments/assets/5a778fc0-397e-4101-81cb-b72e883cd62b)
![image](https://github.com/user-attachments/assets/ba0a1066-a5d1-4a73-8a09-8dc1260770b8)
