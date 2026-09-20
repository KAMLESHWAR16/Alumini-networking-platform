# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Backend (Spring Boot)
- Initial project foundation and Spring Boot backend scaffolding.
- Auth module with JWT signup/login, custom filter and role-based access control.
- Profile module: profile entity, repository, service, controller and current-user resolver.
- Connection requests: send, accept, decline, incoming/outgoing listing.
- Mentorship requests: request, accept/decline, received/sent listings.
- Opportunities module: post, browse, apply, view applicants.
- Events module: create, browse, register with capacity limits, attendees.
- Notifications module wired into connection, mentorship and application flows.
- Admin endpoints: user listing, profile verification, user removal, platform stats.
- Unit tests for auth, JWT, profile, connection, mentorship, opportunity and event services.

### Database
- MySQL schema covering users, profiles, connections, mentorship, opportunities, events, registrations and notifications.
- Seed data with demo admin/alumni/student accounts.

### Docs
- API documentation covering all `/api/v1` endpoints.