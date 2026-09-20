-- Seed data for the Alumni Networking Platform.
-- Passwords below are bcrypt hashes of the literal "password".
-- Idempotent: existing rows are skipped (IGNORE / NOT EXISTS guards),
-- so this file can be applied more than once safely.

INSERT IGNORE INTO users (name, email, password, role, enabled, created_at) VALUES
  ('Alice Admin',   'admin@alumni.example.com',   '$2a$10$Ez28EV17kuVveKvdV4PSqOIVUBb5JE8BRUzIiVmJhRYzcbTBjmhyK', 'ADMIN',  1, NOW()),
  ('Bob Alumni',    'bob@alumni.example.com',     '$2a$10$Ez28EV17kuVveKvdV4PSqOIVUBb5JE8BRUzIiVmJhRYzcbTBjmhyK', 'ALUMNI',  1, NOW()),
  ('Carol Alumni',  'carol@alumni.example.com',   '$2a$10$Ez28EV17kuVveKvdV4PSqOIVUBb5JE8BRUzIiVmJhRYzcbTBjmhyK', 'ALUMNI',  1, NOW()),
  ('Dan Student',   'dan@alumni.example.com',     '$2a$10$Ez28EV17kuVveKvdV4PSqOIVUBb5JE8BRUzIiVmJhRYzcbTBjmhyK', 'STUDENT', 1, NOW()),
  ('Eve Student',   'eve@alumni.example.com',     '$2a$10$Ez28EV17kuVveKvdV4PSqOIVUBb5JE8BRUzIiVmJhRYzcbTBjmhyK', 'STUDENT', 1, NOW());

SET @alice = (SELECT id FROM users WHERE email = 'admin@alumni.example.com');
SET @bob   = (SELECT id FROM users WHERE email = 'bob@alumni.example.com');
SET @carol = (SELECT id FROM users WHERE email = 'carol@alumni.example.com');
SET @dan   = (SELECT id FROM users WHERE email = 'dan@alumni.example.com');
SET @eve   = (SELECT id FROM users WHERE email = 'eve@alumni.example.com');

INSERT IGNORE INTO profiles (user_id, headline, department, batch, current_company, current_role, location, verified, created_at, updated_at) VALUES
  (@bob,   'Senior Backend Engineer', 'CSE',    2015, 'Acme Corp', 'Staff Engineer',   'Bengaluru', 1, NOW(), NOW()),
  (@carol, 'Product Designer',        'Design', 2016, 'Bolt Labs', 'Principal Designer', 'Remote',   1, NOW(), NOW()),
  (@dan,   'Final Year Student',      'CSE',    2026, NULL,        'Student',           'Hyderabad', 0, NOW(), NOW()),
  (@eve,   'Aspiring Data Scientist', 'ECE',    2026, NULL,        'Student',           'Chennai',   0, NOW(), NOW());

INSERT IGNORE INTO profile_skills (profile_id, skill) VALUES
  ((SELECT id FROM profiles WHERE user_id = @bob), 'Java'),
  ((SELECT id FROM profiles WHERE user_id = @bob), 'Spring Boot'),
  ((SELECT id FROM profiles WHERE user_id = @bob), 'SQL'),
  ((SELECT id FROM profiles WHERE user_id = @carol), 'Figma'),
  ((SELECT id FROM profiles WHERE user_id = @carol), 'Design Systems'),
  ((SELECT id FROM profiles WHERE user_id = @eve), 'Python'),
  ((SELECT id FROM profiles WHERE user_id = @eve), 'Machine Learning');

INSERT IGNORE INTO connections (requester_id, addressee_id, status, created_at, responded_at) VALUES
  (@dan, @bob, 'ACCEPTED', NOW(), NOW()),
  (@eve, @bob, 'PENDING',  NOW(), NULL);

INSERT IGNORE INTO mentorship_requests (student_id, mentor_id, message, status, created_at, responded_at) VALUES
  (@dan, @bob,   'Could you guide me on backend interviews?', 'PENDING',  NOW(), NULL),
  (@eve, @carol, 'Interested in UX career path.',             'ACCEPTED', NOW(), NOW());

INSERT INTO job_opportunities (title, company, location, type, experience, description, posted_by, active, created_at)
SELECT 'Software Engineer', 'Acme Corp', 'Remote',    'FULL_TIME', '2+ years', 'Backend development with Spring Boot.', @bob, 1, NOW()
WHERE NOT EXISTS (SELECT 1 FROM job_opportunities WHERE title = 'Software Engineer' AND posted_by = @bob);

INSERT INTO job_opportunities (title, company, location, type, experience, description, posted_by, active, created_at)
SELECT 'UX Internship', 'Bolt Labs', 'Bengaluru', 'INTERNSHIP', NULL, 'Six month design internship.', @carol, 1, NOW()
WHERE NOT EXISTS (SELECT 1 FROM job_opportunities WHERE title = 'UX Internship' AND posted_by = @carol);

SET @job_eng = (SELECT id FROM job_opportunities WHERE title = 'Software Engineer' AND posted_by = @bob);
SET @job_ux  = (SELECT id FROM job_opportunities WHERE title = 'UX Internship' AND posted_by = @carol);

INSERT IGNORE INTO opportunity_skills (opportunity_id, skill) VALUES
  (@job_eng, 'Java'), (@job_eng, 'Spring Boot'), (@job_eng, 'SQL'),
  (@job_ux, 'Figma');

INSERT IGNORE INTO job_applications (job_id, applicant_id, status, created_at) VALUES
  (@job_eng, @dan, 'PENDING', NOW());

INSERT INTO events (title, description, location, type, starts_at, ends_at, capacity, online, meeting_url, organizer_id, created_at)
SELECT 'Alumni Networking Night', 'Mix and mingle with alumni.', 'Campus Auditorium', 'HANGOUT',
       DATE_ADD(NOW(), INTERVAL 7 DAY), DATE_ADD(NOW(), INTERVAL 7 HOUR), 100, 0, NULL, @bob, NOW()
WHERE NOT EXISTS (SELECT 1 FROM events WHERE title = 'Alumni Networking Night');

INSERT INTO events (title, description, location, type, starts_at, ends_at, capacity, online, meeting_url, organizer_id, created_at)
SELECT 'Career Paths Webinar', 'Ex-alumni share career stories.', 'Online', 'WEBINAR',
       DATE_ADD(NOW(), INTERVAL 14 DAY), DATE_ADD(NOW(), INTERVAL 14 HOUR), 500, 1, 'https://meet.example.com/webinar', @carol, NOW()
WHERE NOT EXISTS (SELECT 1 FROM events WHERE title = 'Career Paths Webinar');

SET @event_night = (SELECT id FROM events WHERE title = 'Alumni Networking Night');

INSERT IGNORE INTO event_registrations (event_id, user_id, created_at) VALUES
  (@event_night, @dan, NOW()),
  (@event_night, @eve, NOW());