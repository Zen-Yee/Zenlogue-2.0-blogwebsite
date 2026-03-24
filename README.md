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
├── /src/    
│    ├──/public/              # Static files (Photos & CSS)
│    │    ├── /Images/
│    │    └── /styles/
│    │         └── main.css
│    │
│    ├── /config/
│    │    └── pool.js          # PostgreSQL connection setup
│    │
│    ├──/views/               # EJS templates
│    │    └── /partials/       # Header & Footer template
│    │
│    ├── /modules/              
│    │    ├── /auth/
│    │    │    ├── auth.routes.js
│    │    │    ├── auth.controller.js
│    │    │    └── auth.service.js
│    │    ├── /post/
│    │    └── /home/
│    │
│    └── /middleware/
│         ├── auth.middleware.js          # PostgreSQL connection setup
│         ├── err.middleware.js          # PostgreSQL connection setup
│         └── role.middleware.js          # PostgreSQL connection setup
│
├── server.js             # Main Express entry point
├── app.js             
├── package.json
└── README.md
```

## Routes Overview

| Route | Method | Description |
|--------|---------|-------------|
| `/home` | GET | Render homepage with all posts |
| `/auth/signup` | GET | Render signup page|
| `/auth/signup` | POST | Create new user and store in database |
| `/auth/login` | GET | Render login page |
| `/auth/login` | POST | Authenticate user credentials|
| `/auth/logout` | GET | End session and redirect to homepage|
| `/post/:id` | GET | Display a single post by ID |
| `/post/create` | POST | Submit new post content and store in database |
| `/post/id/edit` | GET | Render post edit page with post content by id |
| `/post/:id` | PATCH | Submit updated post content and update in database |
| `/post/:id` | DELETE | Remove row based on post_id in database |
| `/comment/create` | POST | Submit new comment and store in databasee |
| `/comment/:id` | PATCH | Submit updated comment content and update in database |
| `/comment/:id` | DELETE | Remove row based on comment_id in database |



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
