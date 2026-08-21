# Task Manager App

A responsive task management board built with React and Chakra UI. It allows users to create, edit, delete, and move tasks across different workflow stages such as Pending, In Progress, and Completed. The app includes dark mode, task filtering, and local persistence using browser storage.

## Features

- Create new tasks with title and description
- Edit task details and update status
- Delete tasks from the board
- Mark tasks as completed
- Drag and drop tasks between status columns
- Filter tasks by current status
- Light and dark theme support
- Persistent task storage using localStorage
- Responsive layout for desktop and smaller screens

## Tech Stack

- React
- Chakra UI
- @dnd-kit/core for drag and drop interactions
- React Toastify for notifications
- CSS custom theme styling

## Project Structure

```bash
src/
├── App.js
├── App.css
├── index.js
├── common/
│   ├── context/
│   │   └── TaskContext.jsx
│   ├── hooks/
│   │   ├── useColor.js
│   │   └── useLocalStorage.js
│   ├── images/
│   └── theme/
│       ├── globalStyle.css
│       ├── styles.js
│       ├── theme.js
│       └── foundations/
│           └── breakpoints.js
├── components/
│   ├── CreateTaskModal.js
│   ├── DraggableItem.js
│   ├── DroppableContainer.js
│   ├── Header.js
│   └── Task.js
├── utils/
│   ├── constant.js
│   ├── helper.js
│   ├── initialValues.js
│   └── mockData.js
└── App.test.js
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm

### Installation

```bash
npm install
```

### Run the app

```bash
npm start
```

The app will run in development mode and open in the browser at the default React port, usually:

```bash
http://localhost:3000
```

## Available Scripts

```bash
npm start
```

Runs the app in development mode.

```bash
npm run build
```

Builds the app for production.

```bash
npm test
```

Runs the test suite.

## Usage

1. Click the Add Task button in the header.
2. Enter a task title and optional description.
3. Save the task to add it to the Pending column.
4. Drag a task into another column to update its status.
5. Use the status filter at the top to view tasks by category.
6. Toggle dark mode from the header button.

## State and Persistence

Tasks are managed through a React context provider and stored with localStorage, so the board remains available after refresh.

## Notes

This project is designed as a lightweight Kanban-style task board. It is suitable for personal project tracking and small team workflows where visual task movement is useful.
