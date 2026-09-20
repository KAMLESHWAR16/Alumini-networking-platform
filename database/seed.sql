-- Seed data for the Alumni Networking Platform.
-- Passwords below are bcrypt hashes of the literal "password".
-- Login hint: admin@alumni.example.com / password (and so on).

INSERT INTO users (id, name, email, password, role, enabled, created_at) VALUES
  (1, 'Alice Admin',   'admin@alumni.example.com',   '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ADMIN',  1, NOW()),
  (2, 'Bob Alumni',    'bob@alumni.example.com',     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ALUMNI',  1, NOW()),
  (3, 'Carol Alumni',  'carol@alumni.example.com',   '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ALUMNI',  1, NOW()),
  (4, 'Dan Student',   'dan@alumni.example.com',     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'STUDENT', 1, NOW()),
  (5, 'Eve Student',   'eve@alumni.example.com',     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'STUDENT', 1, NOW());

INSERT INTO profiles (id, user_id, headline, department, batch, current_company, current_role, location, verified, created_at, updated_at) VALUES
  (1, 2, 'Senior Backend Engineer', 'CSE', 2015, 'Acme Corp', 'Staff Engineer', 'Bengaluru', 1, NOW(), NOW()),
  (2, 3, 'Product Designer',        'Design', 2016, 'Bolt Labs', 'Principal Designer', 'Remote', 1, NOW(), NOW()),
  (3, 4, 'Final Year Student',      'CSE', 2026, NULL, 'Student', 'Hyderabad', 0, NOW(), NOW()),
  (4, 5, 'Aspiring Data Scientist', 'ECE', 2026, NULL, 'Student', 'Chennai', 0, NOW(), NOW());

INSERT INTO profile_skills (profile_id, skill) VALUES
  (1, 'Java'), (1, 'Spring Boot'), (1, 'SQL'),
  (2, 'Figma'), (2, 'Design Systems'),
  (4, 'Python'), (4, 'Machine Learning');

INSERT INTO connections (requester_id, addressee_id, status, message, created_at, responded_at) VALUES
  (4, 2, 'ACCEPTED', NULL, NOW(), NOW()),
  (5, 2, 'PENDING',  'Hi Bob, would love to connect!', NOW(), NULL);

INSERT INTO mentorship_requests (student_id, mentor_id, message, status, created_at, responded_at) VALUES
  (4, 2, 'Could you guide me on backend interviews?', 'PENDING', NOW(), NULL),
  (5, 3, 'Interested in UX career path.',              'ACCEPTED', NOW(), NOW());

INSERT INTO job_opportunities (id, title, company, location, type, experience, description, posted_by, active, created_at) VALUES
  (1, 'Software Engineer', 'Acme Corp', 'Remote', 'FULL_TIME', '2+ years', 'Backend development with Spring Boot.', 2, 1, NOW()),
  (2, 'UX Internship',     'Bolt Labs', 'Bengaluru', 'INTERNSHIP', NULL, 'Six month design internship.', 3, 1, NOW());

INSERT INTO opportunity_skills (opportunity_id, skill) VALUES
  (1, 'Java'), (1, 'Spring Boot'), (1, 'SQL'),
  (2, 'Figma');

INSERT INTO job_applications (job_id, applicant_id, status, created_at) VALUES
  (1, 4, 'PENDING', NOW());

INSERT INTO events (id, title, description, location, type, starts_at, ends_at, capacity, online, meeting_url, organizer_id, created_at) VALUES
  (1, 'Alumni Networking Night', 'Mix and mingle with alumni.', 'Campus Auditorium', 'HANGOUT', DATE_ADD(NOW(), INTERVAL 7 DAY), DATE_ADD(NOW(), INTERVAL 7 HOUR), 100, 0, NULL, 2, NOW()),
  (2, 'Career Paths Webinar',    'Ex-alumni share career stories.', 'Online', 'WEBINAR', DATE_ADD(NOW(), INTERVAL 14 DAY), DATE_ADD(NOW(), INTERVAL 14 HOUR), 500, 1, 'https://meet.example.com/webinar', 3, NOW());

INSERT INTO event_registrations (event_id, user_id, created_at) VALUES
  (1, 4, NOW()),
  (1, 5, NOW()),
  (2, 4, NOW());