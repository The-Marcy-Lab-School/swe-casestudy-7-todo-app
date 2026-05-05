# Todo App — Full-Stack Case Study

A full-stack Todo app built with React, Express, and Postgres. Demonstrates session-based authentication, session rehydration, auth-dependent data fetching, and conditional rendering — the same patterns students use in their full-stack projects.

## Application Structure

```
swe-casestudy-7-todo-app/
├── frontend/               # React app (Vite)
│   ├── src/
│   │   ├── App.jsx         # Root component: all state, session rehydration, auth handlers
│   │   ├── adapters/
│   │   │   ├── auth-adapters.js  # Fetch helpers for /api/auth/* endpoints
│   │   │   └── todo-adapters.js  # Fetch helpers for /api/todos/* endpoints
│   │   └── components/
│   │       ├── AuthForm.jsx    # Login + Register forms (shown when logged out)
│   │       ├── TodoApp.jsx     # Main app container (shown when logged in)
│   │       ├── AddTodoForm.jsx # Form to create a new todo
│   │       ├── TodoList.jsx    # Renders a list of TodoItems
│   │       └── TodoItem.jsx    # Single todo: checkbox, title, delete button
│   └── vite.config.js      # Proxies /api requests to Express in development
└── server/                 # Express + Postgres API
    ├── index.js            # App entry point, route definitions
    ├── controllers/
    │   ├── authControllers.js  # register, login, logout, getMe
    │   └── todoControllers.js  # list, create, update, delete todos
    ├── models/
    │   ├── userModel.js    # SQL queries for the users table
    │   └── todoModel.js    # SQL queries for the todos table
    ├── middleware/
    │   ├── checkAuthentication.js  # Blocks unauthenticated requests
    │   └── logRoutes.js            # Logs each incoming request
    └── db/
        ├── pool.js         # Postgres connection pool
        └── seed.js         # Creates tables and inserts sample data
```

## Setup

### 1. Database

Create a local Postgres database:

```sh
createdb todo_app
```

### 2. Server

```sh
cd server
npm install
cp .env.template .env
```

Open `.env` and fill in your Postgres credentials and a session secret. Then seed the database:

```sh
npm run db:seed
```

Start the server:

```sh
npm run dev
```

The server runs on `http://localhost:8080`.

### 3. Frontend

In a second terminal:

```sh
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`. The Vite dev proxy forwards all `/api` requests to the Express server so session cookies work correctly.

## Seed Users

After running `npm run db:seed`, these accounts are available:

| Username | Password    |
| -------- | ----------- |
| alice    | password123 |
| bob      | password123 |

## Key Patterns

| Pattern                       | Where                                                                               |
| ----------------------------- | ----------------------------------------------------------------------------------- |
| Session rehydration           | `App.jsx` — `useEffect([], rehydrate)` calls `GET /api/auth/me` on mount            |
| Auth-dependent fetch          | `App.jsx` — `useEffect([currentUser], loadTodos)` refetches when user changes       |
| `isLoading` / `error` state   | `App.jsx` + `TodoApp.jsx` — every fetch is tracked in state                         |
| Props drilling                | `currentUser` and `onRefresh` passed from App → TodoApp → TodoList → TodoItem       |
| Ternary conditional rendering | `App.jsx` — `currentUser ? <TodoApp> : <AuthForm>`                                  |
| Short-circuit `&&`            | `TodoItem.jsx` — `currentUser && <button>Delete</button>`                           |
| Adapter pattern               | `adapters/auth-adapters.js` / `adapters/todo-adapters.js` — one file per API domain |
