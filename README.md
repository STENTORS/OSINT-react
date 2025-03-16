
# OSINT Research Tool

This project is a cybersecurity-themed OSINT (Open Source Intelligence) research tool built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Puppeteer for web scraping

## Setup Instructions

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-folder>
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to:
```
http://localhost:8080
```

### Backend Setup

This project uses Puppeteer for headless browser automation to scrape breach data. The "backend" functionality is built into the frontend code in `src/lib/osintService.ts`.

For local development:
- The app will use mock data by default in development mode
- If you want to test the actual scraping functionality:
  1. Make sure you have a good internet connection
  2. Enter a valid email in the search form
  3. The app will attempt to scrape breach data using Puppeteer

### Notes on Puppeteer

- Puppeteer is a Node.js library that provides a high-level API to control Chrome/Chromium
- It runs headless by default (no browser UI)
- For this project, it's bundled with the frontend code for simplicity
- In a production environment, this functionality should be moved to a proper backend service

## Features

- Email breach checking
- Animated terminal interface
- Cyberpunk/hacker aesthetic with multiple color themes
- Responsive design

## Disclaimer

This tool is for educational purposes only. Web scraping may violate terms of service of websites. Always ensure you have permission before scraping any website.

