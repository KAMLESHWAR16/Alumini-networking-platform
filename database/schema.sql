-- MySQL schema for the Alumni Networking Platform.
-- These tables mirror the JPA entity mappings under backend/src/main/java/com/alumni/networking.
-- With spring.jpa.hibernate.ddl-auto=update the application also creates/alters these tables automatically.

CREATE TABLE IF NOT EXISTS users (
  id          BIGINT       NOT NULL AUTO_INCREMENT,
  name        VARCHAR(255) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  password    VARCHAR(255) NOT NULL,
  role        VARCHAR(20)  NOT NULL,
  enabled     BIT(1)       NOT NULL,
  created_at  DATETIME(6)  NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uk_users_email (email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS profiles (
  id               BIGINT       NOT NULL AUTO_INCREMENT,
  user_id          BIGINT       NOT NULL,
  headline         VARCHAR(255),
  about            VARCHAR(255),
  department       VARCHAR(255),
  batch            INT,
  current_company  VARCHAR(255),
  current_role     VARCHAR(255),
  location         VARCHAR(255),
  linkedin         VARCHAR(255),
  experience_years INT,
  verified         BIT(1)       NOT NULL DEFAULT 0,
  created_at       DATETIME(6)  NOT NULL,
  updated_at       DATETIME(6)  NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uk_profiles_user (user_id),
  CONSTRAINT fk_profiles_user FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS profile_skills (
  profile_id BIGINT       NOT NULL,
  skill      VARCHAR(100) NOT NULL,
  CONSTRAINT fk_profile_skills_profile FOREIGN KEY (profile_id) REFERENCES profiles (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS connections (
  id           BIGINT      NOT NULL AUTO_INCREMENT,
  requester_id BIGINT      NOT NULL,
  addressee_id BIGINT      NOT NULL,
  status       VARCHAR(20) NOT NULL,
  message      VARCHAR(1000),
  created_at   DATETIME(6) NOT NULL,
  responded_at DATETIME(6),
  PRIMARY KEY (id),
  UNIQUE KEY uk_connection_pair (requester_id, addressee_id),
  CONSTRAINT fk_connections_requester FOREIGN KEY (requester_id) REFERENCES users (id),
  CONSTRAINT fk_connections_addressee FOREIGN KEY (addressee_id) REFERENCES users (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS mentorship_requests (
  id           BIGINT      NOT NULL AUTO_INCREMENT,
  student_id   BIGINT      NOT NULL,
  mentor_id    BIGINT      NOT NULL,
  message      VARCHAR(1000),
  status       VARCHAR(20) NOT NULL,
  created_at   DATETIME(6) NOT NULL,
  responded_at DATETIME(6),
  PRIMARY KEY (id),
  UNIQUE KEY uk_mentorship_pair (student_id, mentor_id),
  CONSTRAINT fk_mentorship_student FOREIGN KEY (student_id) REFERENCES users (id),
  CONSTRAINT fk_mentorship_mentor FOREIGN KEY (mentor_id) REFERENCES users (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS job_opportunities (
  id          BIGINT       NOT NULL AUTO_INCREMENT,
  title       VARCHAR(150) NOT NULL,
  company     VARCHAR(120) NOT NULL,
  location    VARCHAR(120) NOT NULL,
  type        VARCHAR(20)  NOT NULL,
  experience  VARCHAR(100),
  description VARCHAR(3000),
  deadline    DATE,
  posted_by   BIGINT       NOT NULL,
  active      BIT(1)       NOT NULL DEFAULT 1,
  created_at  DATETIME(6)  NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_jobs_poster FOREIGN KEY (posted_by) REFERENCES users (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS opportunity_skills (
  opportunity_id BIGINT       NOT NULL,
  skill          VARCHAR(100) NOT NULL,
  CONSTRAINT fk_opportunity_skills_job FOREIGN KEY (opportunity_id) REFERENCES job_opportunities (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS job_applications (
  id           BIGINT      NOT NULL AUTO_INCREMENT,
  job_id       BIGINT      NOT NULL,
  applicant_id BIGINT      NOT NULL,
  status       VARCHAR(20) NOT NULL DEFAULT 'PENDING',
  created_at   DATETIME(6) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uk_job_application (job_id, applicant_id),
  CONSTRAINT fk_job_applications_job FOREIGN KEY (job_id) REFERENCES job_opportunities (id),
  CONSTRAINT fk_job_applications_applicant FOREIGN KEY (applicant_id) REFERENCES users (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS events (
  id          BIGINT       NOT NULL AUTO_INCREMENT,
  title       VARCHAR(150) NOT NULL,
  description VARCHAR(3000),
  location    VARCHAR(150) NOT NULL,
  type        VARCHAR(20)  NOT NULL,
  starts_at   DATETIME(6)  NOT NULL,
  ends_at     DATETIME(6),
  capacity    INT          NOT NULL,
  online      BIT(1)       NOT NULL DEFAULT 0,
  meeting_url VARCHAR(500),
  organizer_id BIGINT      NOT NULL,
  created_at  DATETIME(6)  NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_events_organizer FOREIGN KEY (organizer_id) REFERENCES users (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS event_registrations (
  id         BIGINT      NOT NULL AUTO_INCREMENT,
  event_id   BIGINT      NOT NULL,
  user_id    BIGINT      NOT NULL,
  created_at DATETIME(6) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uk_event_registration (event_id, user_id),
  CONSTRAINT fk_event_regs_event FOREIGN KEY (event_id) REFERENCES events (id),
  CONSTRAINT fk_event_regs_user FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS notifications (
  id           BIGINT       NOT NULL AUTO_INCREMENT,
  recipient_id BIGINT       NOT NULL,
  type         VARCHAR(30)  NOT NULL,
  message      VARCHAR(500) NOT NULL,
  link         VARCHAR(500),
  is_read      BIT(1)       NOT NULL DEFAULT 0,
  created_at   DATETIME(6)  NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_notifications_recipient FOREIGN KEY (recipient_id) REFERENCES users (id)
) ENGINE=InnoDB;