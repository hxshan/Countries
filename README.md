
# Country Explorer

[![Netlify Status](https://api.netlify.com/api/v1/badges/874ca4ce-46cb-480d-bf66-56fac50cacf0/deploy-status)](https://app.netlify.com/sites/af-assigment-2/deploys)

**Live Demo:** [https://af-assigment-2.netlify.app/](https://af-assigment-2.netlify.app/)

## Features

- Browse all countries
- Search countries by name an other filters
- Filter by region
- Dark/Light mode toggle
- Add/remove countries to favorites
- Detailed country information

## Tech Stack

- [React](https://reactjs.org/) - Frontend library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [REST Countries API](https://restcountries.com/) - Country data
- [Vitest](https://vitest.dev/) - Testing framework

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/af-assignment-2.git
   ```
2. Navigate to project directory:
    ```bash
    cd af-assignment-2
    ```
3. Install dependencies:
  ```bash
    Install dependencies:
  ```
4. Start development server:
```bash
npm run dev
```
5. Run tests:
```bash
npm run test
```
## 🌐 API Endpoints

### REST Countries API v3.1
Base URL: `https://restcountries.com/v3.1`

| Endpoint | Method | Description | Example |
|----------|--------|-------------|---------|
| `/all` | GET | Fetch all countries (used in Home page) | `https://restcountries.com/v3.1/all` |
| `/name/{name}` | GET | Search countries by name (used in Country Detail page) | `https://restcountries.com/v3.1/name/france` |
| `/alpha?codes={codes}` | GET | Get countries by country codes (used in Country Detail page) | `https://restcountries.com/v3.1/alpha?codes=col,no,ma` |
| `/region/{region}` | GET | Filter countries by region (used in Region page) | `https://restcountries.com/v3.1/region/europe` |
