# Mundial Typer App

Frontend application for predicting World Cup matches, following other users' picks, and tracking rankings in real time.

<span align="center">
  <a href="https://turniej.betekipa.pl" target="_blank">
    <img src="https://img.shields.io/badge/🔗-LINK-blue?style=for-the-badge" alt="Link">
  </a>
</span>

## Overview

This project is a React-based frontend for a tournament prediction platform. Users can answer match-related questions, follow other typers, compare predictions during and after matches, and track leaderboard points.

The application communicates with an external backend API. This repository contains only the frontend part of the project.

## Features

### User features
- User registration and login
- Answering match-related prediction questions
- Following other typers
- Viewing other users' predictions during and after matches
- Ranking table with points

### Admin features
- Verifying users
- Settling matches by marking correct answers
- Adding custom questions for matches
- Supporting different question types, such as exact score, player-related questions, and standard questions
- Assigning points to questions
- Exporting data of users who did not submit any predictions

## Tech Stack

- React
- JavaScript
- React Query
- styled-components
- API integration

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Notes

This repository contains only the frontend application. The backend was developed separately and is not included here.

## Status

Project completed and deployed for tournament usage.
