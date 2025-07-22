# Task Manager API

A simple Task Management REST API using Node.js, Express, TypeScript, and MySQL.

## Features

- Create, read, update, delete tasks
- MySQL persistence
- Input validation with Zod
- UUID-based unique IDs

## Setup Instructions

1. Clone the repo
2. Set up `.env` file
3. Create MySQL DB and table
4. Run:

```bash
npm install
npm run dev
```

## API Endpoints

Create Task
POST /tasks
```bash
{
  "title": "New Task",
  "description": "Details here",
  "status": "PENDING"
}
```

Get All Tasks
GET /tasks

Get Task By ID
GET /tasks/:id

Update Task
PUT /tasks/:id

Delete Task
DELETE /tasks/:id
