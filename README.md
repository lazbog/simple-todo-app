# Simple Todo App

A clean and simple todo application built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- Add new tasks
- Mark tasks as complete/incomplete
- Delete individual tasks
- Clear all completed tasks at once
- Persistent storage using localStorage
- Responsive design
- Real-time task counter

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **localStorage** - Client-side data persistence

## Project Structure

```
simple-todo-app/
├── app/
│   ├── api/
│   │   └── ping/
│   │       └── route.ts       # Health check endpoint
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main todo page
├── components/
│   └── ui/
│       └── button.tsx         # Reusable button component
├── lib/
│   └── todo.ts                # Todo logic and storage
├── .gitignore
├── README.md
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Usage

1. Type a task in the input field and click "Add Task" or press Enter
2. Click the checkbox to mark a task as complete
3. Click "Delete" to remove a specific task
4. Use "Clear Completed" to remove all finished tasks at once

Your tasks are automatically saved to browser localStorage and will persist between sessions.