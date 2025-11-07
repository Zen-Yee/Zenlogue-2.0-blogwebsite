# Zenlogue 2.0
A full-stack blogging platform built with Node.js, Express, EJS, and PostgreSQL, allowing users to sign up, log in, and share their thoughts seamlessly.

## Features

- User Authentication (Signup/Login with password hashing)
- PostgreSQL Database (hosted on Railway)
- CRUD Posts (Create, Read)
- Server-side Rendering using EJS
- RESTful Routes (Express)
- Fully deployed backend & frontend **(To be Added)**

## Tech Stack
Frontend: EJS + HTML + CSS  
Backend: Node.js + Express  
Database: PostgreSQL (hosted on Railway)  
Deployment: **(Backend to be Added)** / Railway (PostgreSQL)

## Folder Structure
```
Zenlogue-2.0/  
│  
├── /public/              # Static files (Photos & CSS)
│    └── /styles/
│
├── /views/               # EJS templates
│    └── /partials/       # Header & Footer template
│
├── /routes/              # Express route files
│    ├── post.js
│    ├── signup.js
│    └── login.js
│
├── /db/
│    └── pool.js          # PostgreSQL connection setup
│
├── server.js             # Main Express entry point
├── package.json
└── README.md
```

## Routes Overview

| Route | Method | Description |
|--------|---------|-------------|
| `/` | GET | Render homepage with all posts |
| `/post/:id` | GET | Display a single post by ID |
| `/post/new` | POST | Render new post page |
| `/post/new/submit` | POST | Submit new post to database |
| `/signup` | GET | Render signup page |
| `/signup/Submit` | POST | Create new user and store in database |
| `/login` | GET | Render login page |
| `/login/Submit` | POST | Authenticate user credentials |
| `/logout` | GET | End session and redirect to homepage |
| `/about` | GET |  Render new about page |

## Deployment

Backend: **(To be Added)**  
Database: PostgreSQL (Railway)
Frontend: EJS templates served by Express

## Live Demo:
 (To be Added)  

## Screenshots
 (To be Added)


## Author
**Zen Yee**  
GitHub: [@Zen Yee](https://github.com/Zen-Yee)  
Software developer striking to explore more full-stack technologies.
