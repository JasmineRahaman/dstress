# D-Stress - Stress Management Platform

## Project Overview
D-Stress is a comprehensive stress management platform built with React (frontend) and FastAPI (backend), using PostgreSQL for data persistence. The platform helps users assess, understand, and manage their stress through questionnaires, resources, activities, professional consultations, games, and community support.

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, React Router
- **Backend**: FastAPI, Python 3.11
- **Database**: PostgreSQL (Neon-backed via Replit)
- **Authentication**: Replit Auth
- **Styling**: Tailwind CSS with custom calming color palette (blues, greens, lavenders)

## Features

### 1. Stress Assessment (No Login Required)
- 12-question questionnaire with multiple-choice answers
- Scoring system based on agreement level (1-5 scale)
- Categories: Work, Relationship, Financial, Health
- Instant results showing:
  - Overall stress level (Low, Moderate, High, Severe)
  - Category-specific scores
  - Personalized activity recommendations

### 2. Resources Page
- Curated content on stress management
- YouTube videos and WHO articles
- Topics: Understanding stress, Managing stress, Building resilience

### 3. Activities Page
- Comprehensive list of stress-relief activities
- Categories: Physical, Creative, Mindful, Relaxation
- Filterable by category
- Activities include: Music, Painting, Cooking, Dancing, Hiking, Yoga, Meditation, etc.

### 4. Professionals Page (Login Required)
- Browse mental health professionals
- View professional profiles (name, specialization, bio, rate)
- Book sessions with preferred professionals
- View booking history

### 5. Games & To-Do List (Login Required)
- Breathing exercise with visual guidance
- To-do list for task management
- Placeholder for additional stress-relief games

### 6. Community Page (Login Required)
- Create event posts (image/poster or text details)
- View community events
- Comment on posts (latest 20 comments displayed)
- Only authorized users can create posts

### 7. User Profile (Login Required)
- View account details
- Check authorization status
- Track activity statistics

### 8. Admin Dashboard (Admin Only)
- User management: View all users, authorize users for community posting
- Professional management: Add, edit, delete professionals

## Project Structure
```
/
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # React components (Navbar)
│   │   ├── pages/         # Page components (Home, Questionnaire, Results, etc.)
│   │   ├── services/      # API service layer
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js     # Vite configuration (host: 0.0.0.0, port: 5000)
│   └── tailwind.config.js # Tailwind with calming color scheme
│
├── backend/               # FastAPI application
│   ├── models/            # SQLAlchemy models
│   │   ├── user.py
│   │   ├── assessment.py
│   │   ├── professional.py
│   │   ├── booking.py
│   │   ├── post.py
│   │   └── todo.py
│   ├── routes/            # API endpoints
│   │   ├── auth.py
│   │   ├── questionnaire.py
│   │   ├── activities.py
│   │   ├── professionals.py
│   │   ├── bookings.py
│   │   ├── community.py
│   │   ├── todos.py
│   │   └── admin.py
│   ├── utils/             # Utility functions
│   │   └── auth.py        # Authentication helpers
│   ├── database.py        # Database configuration
│   └── main.py            # FastAPI app entry point
│
└── uploads/               # User-uploaded files (event posters)
```

## Database Schema

### Users Table
- id, replit_id, name, email
- is_authorized (for community posting)
- is_admin (for admin dashboard access)
- created_at

### Assessments Table
- id, user_id (nullable for anonymous users)
- answers (JSON), total_score, category_scores (JSON)
- stress_level, created_at

### Professionals Table
- id, name, specialization, bio, rate
- created_at

### Bookings Table
- id, user_id, professional_id
- date, time, notes, status
- created_at

### Posts Table
- id, user_id, type (image/text)
- image_url (for image posts)
- Event details: name, place, date, time, organizer_name, organizer_contact
- created_at

### Comments Table
- id, post_id, user_id, content
- created_at

### Todos Table
- id, user_id, title, completed
- created_at

## Authentication
Uses Replit Auth headers:
- X-Replit-User-Id
- X-Replit-User-Name
- X-Replit-User-Email

New users are automatically created on first access.

## API Endpoints

### Public Endpoints
- POST /api/questionnaire/submit
- GET /api/activities
- GET /api/resources

### Authenticated Endpoints
- GET /api/auth/user
- POST /api/auth/logout
- GET /api/professionals
- POST /api/professionals/{id}/book
- GET /api/bookings/my
- GET /api/community/posts
- POST /api/community/posts (requires authorization)
- GET /api/community/posts/{id}/comments
- POST /api/community/posts/{id}/comments
- GET /api/todos
- POST /api/todos
- PUT /api/todos/{id}
- DELETE /api/todos/{id}

### Admin Endpoints
- GET /api/admin/users
- POST /api/admin/users/{id}/authorize
- GET /api/admin/professionals
- POST /api/admin/professionals
- PUT /api/admin/professionals/{id}
- DELETE /api/admin/professionals/{id}

## Running the Application
The workflow runs both frontend and backend:
- Frontend: Vite dev server on port 5000 (http://0.0.0.0:5000)
- Backend: FastAPI on port 8000 (http://0.0.0.0:8000)

## Color Scheme
Calming colors designed to reduce stress:
- **Calm Blue**: #0ea5e9 (primary blue tones)
- **Calm Green**: #22c55e (nature-inspired greens)
- **Calm Lavender**: #a855f7 (soothing purple tones)

## Recent Changes
- 2025-10-30: Initial project setup with full-stack implementation
- Complete frontend with all 8 pages
- Complete backend API with all endpoints
- Database models and migrations
- Replit Auth integration
- Calming color scheme applied throughout

## User Workflow
1. **Anonymous User**: Takes assessment → Views results → Sees basic activity suggestions
2. **After Login**: Access all features → Book professionals → Use games → Join community
3. **Authorized User**: Can create community posts
4. **Admin**: Manage users and professionals

## Next Steps / Future Enhancements
- Add more interactive games
- Implement progress tracking over time
- Add notification system for bookings
- Create activity completion tracking with badges
- Advanced analytics for stress patterns
- Professional availability calendar
- Event RSVP system
- User-to-user messaging
