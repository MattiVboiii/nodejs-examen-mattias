# Node.js Examen Mattias

A Node.js project for managing code snippets.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Features](#features)
- [Endpoints](#endpoints)

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MattiVboiii/nodejs-examen-mattias.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- **src**: Source code directory
  - **controllers**: Controller functions for handling API requests
  - **models**: Mongoose models for interacting with the database
  - **routes**: API routes for handling requests
  - **utils**: Utility functions for various tasks
- **public**: Public directory for serving static files
  - **css**: CSS stylesheets
  - **js**: JavaScript scripts

## Features

### Code snippet management:

- **Table of snippets**: Get a list of the snippets in the database
- **Filter snippets**: By language, tags, and expiration date

### Endpoints

- `GET /snippets`: Retrieve a list of all code snippets
- `POST /snippets`: Create a new code snippet
- `GET /snippets/:id`: Retrieve a single code snippet by ID
- `PUT /snippets/:id`: Update a single code snippet by ID
- `DELETE /snippets/:id`: Delete a single code snippet by ID
