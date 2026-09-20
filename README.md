# AlumniConnect - Alumni Networking Platform

A capstone project connecting current students with alumni for mentorship, networking, career opportunities and events.

## Tech Stack

- **Backend**: Spring Boot 3.3, Java 17, Spring Security (JWT), Spring Data JPA, MySQL, Maven
- **Frontend**: React (Vite), Axios
- **Docs**: Springdoc OpenAPI (Swagger)

## Features

- JWT authentication with roles (STUDENT, ALUMNI, ADMIN)
- Alumni directory with searchable profiles and verification
- Connection requests with accept/decline flow
- Mentorship matching between students and alumni
- Job opportunities: alumni can post, students and alumni can apply
- Events with registration and capacity limits
- In-app notifications for connection, mentorship and application activity
- Admin dashboard endpoints: user management, profile verification, platform stats

## Repository Layout

```
backend/    Spring Boot REST API (base path /api/v1)
frontend/   React single-page application
database/   MySQL schema and seed data
docs/       API documentation
```

## Getting Started

1. Create the database: `alumni_networking` (see `database/schema.sql`).
2. `cd backend` and run `mvn spring-boot:run`. Set `JWT_SECRET` env var.
3. Optionally load seed data from `database/seed.sql` for demo accounts.
4. `cd frontend` and run `npm install && npm run dev` for the UI.

## Test Data

Seed accounts all use the password `password`:

| Email                   | Role    |
|-------------------------|---------|
| admin@alumni.example.com | ADMIN   |
| bob@alumni.example.com   | ALUMNI  |
| carol@alumni.example.com | ALUMNI  |
| dan@alumni.example.com   | STUDENT |
| eve@alumni.example.com   | STUDENT |