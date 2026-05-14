# Simple Express Server with TypeScript

A REST API built with Express.js and TypeScript, connected to a PostgreSQL database (Neon).

## Tech Stack

- **Node.js** + **Express 5**
- **TypeScript**
- **PostgreSQL** (via `pg`)
- **dotenv** for environment variables

## Getting Started

### Prerequisites

- Node.js installed
- A PostgreSQL database (e.g. [Neon](https://neon.tech))

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root of the project:

```
CONNECTION_STRING=your_postgresql_connection_string_here
```

### Run the server

```bash
npm run dev
```

The server starts at `http://localhost:5000`

## Database

On startup, the server automatically creates the following tables if they don't exist:

**users**
| Column | Type |
|---|---|
| id | SERIAL PRIMARY KEY |
| name | VARCHAR(255) NOT NULL |
| email | VARCHAR(255) NOT NULL UNIQUE |
| age | INTEGER |
| phone | VARCHAR(20) |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

**todos**
| Column | Type |
|---|---|
| id | SERIAL PRIMARY KEY |
| user_id | INT (FK → users.id) |
| title | VARCHAR(255) NOT NULL |
| description | TEXT |
| completed | BOOLEAN DEFAULT FALSE |
| due_date | DATE |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

## API Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/` | Health check |
| POST | `/` | Sample POST endpoint |
