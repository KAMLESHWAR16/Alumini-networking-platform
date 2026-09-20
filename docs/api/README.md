# API Documentation

The Spring Boot backend exposes a REST API under the base path `/api/v1`. All responses are wrapped in an `ApiResponse` envelope: `{"success": { ... }}` for success and `{"failure": "message"}` for errors.

Authentication is JWT based. Register or login through `/api/v1/auth`, then send `Authorization: Bearer <token>`.

## Endpoints

### Authentication
| Method | Path | Description | Access |
|---|---|---|---|
| POST | `/api/v1/auth/register` | Create a user account (STUDENT or ALUMNI) | Public |
| POST | `/api/v1/auth/login` | Login and receive a JWT | Public |
| GET | `/api/v1/health` | Health check | Public |

### Profile
| Method | Path | Description | Access |
|---|---|---|---|
| GET | `/api/v1/profiles/me` | Current user's profile (auto-created if missing) | Authenticated |
| PUT | `/api/v1/profiles/me` | Update current user's profile | Authenticated |
| GET | `/api/v1/profiles` | Directory of profiles (`?search=`) | Authenticated |
| GET | `/api/v1/profiles/{id}` | Profile by id | Authenticated |
| GET | `/api/v1/me` | Current user summary | Authenticated |

### Connections
| Method | Path | Description | Access |
|---|---|---|---|
| POST | `/api/v1/connections` | Send a connection request | Authenticated |
| GET | `/api/v1/connections` | Accepted connections of the current user | Authenticated |
| GET | `/api/v1/connections/requests/incoming` | Incoming pending requests | Authenticated |
| GET | `/api/v1/connections/requests/outgoing` | Outgoing pending requests | Authenticated |
| PUT | `/api/v1/connections/{id}/accept` | Accept a request | Addressee |
| PUT | `/api/v1/connections/{id}/decline` | Decline a request | Addressee |

### Mentorship
| Method | Path | Description | Access |
|---|---|---|---|
| POST | `/api/v1/mentorship` | Request mentorship from an alumni | Student |
| GET | `/api/v1/mentorship/received` | Requests received by the current alumni | Alumni |
| GET | `/api/v1/mentorship/sent` | Requests sent by the current user | Authenticated |
| GET | `/api/v1/mentorship/mentors` | Accepted mentors of the current user | Authenticated |
| PUT | `/api/v1/mentorship/{id}/accept` | Accept a mentorship request | Mentor |
| PUT | `/api/v1/mentorship/{id}/decline` | Decline a mentorship request | Mentor |

### Opportunities (Jobs)
| Method | Path | Description | Access |
|---|---|---|---|
| GET | `/api/v1/jobs` | List active opportunities (`?search=`) | Authenticated |
| GET | `/api/v1/jobs/{id}` | Opportunity by id | Authenticated |
| POST | `/api/v1/jobs` | Post an opportunity | Alumni / Admin |
| POST | `/api/v1/jobs/{id}/apply` | Apply for an opportunity | Students / Alumni |
| GET | `/api/v1/jobs/applications/mine` | My applications | Authenticated |

### Events
| Method | Path | Description | Access |
|---|---|---|---|
| GET | `/api/v1/events` | List upcoming events | Authenticated |
| GET | `/api/v1/events/{id}` | Event by id | Authenticated |
| POST | `/api/v1/events` | Create an event | Alumni / Admin |
| POST | `/api/v1/events/{id}/register` | Register for an event (capacity enforced) | Authenticated |
| GET | `/api/v1/events/registrations/mine` | My registrations | Authenticated |

### Notifications
| Method | Path | Description | Access |
|---|---|---|---|
| GET | `/api/v1/notifications` | Notifications for the current user | Authenticated |
| GET | `/api/v1/notifications/unread-count` | Unread notification counter | Authenticated |
| POST | `/api/v1/notifications/{id}/read` | Mark a notification read | Owner |
| POST | `/api/v1/notifications/read-all` | Mark all notifications read | Authenticated |

### Admin
| Method | Path | Description | Access |
|---|---|---|---|
| GET | `/api/v1/admin/users` | List all users | Admin |
| PUT | `/api/v1/admin/users/{id}/verify` | Verify a user's profile | Admin |
| DELETE | `/api/v1/admin/users/{id}` | Delete (or deactivate if referenced) a user | Admin |
| GET | `/api/v1/admin/stats` | Platform statistics | Admin |

Interactive documentation is available through Springdoc at `/swagger-ui.html` when the backend is running (Swagger endpoints are whitelisted for local access).