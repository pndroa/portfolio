-- Enable extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ENUM type
CREATE TYPE skill_Level AS ENUM (
  'beginner',
  'intermediate',
  'advanced'
);

-- portfolio table
CREATE TABLE portfolio (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  title VARCHAR NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  description TEXT
);

-- User table
CREATE TABLE portfolio_user (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  portfolio_id UUID NOT NULL UNIQUE,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  job VARCHAR,
  field_of_Study VARCHAR,
  about_me TEXT NOT NULL,
  FOREIGN KEY (portfolio_id) REFERENCES portfolio (id)
);

-- education
CREATE TABLE education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  user_id UUID NOT NULL,
  institution VARCHAR NOT NULL,
  degree VARCHAR NOT NULL,
  field_of_study VARCHAR,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES portfolio_user (id)
);

-- experience
CREATE TABLE experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  user_id UUID NOT NULL,
  title VARCHAR NOT NULL,
  company VARCHAR,
  description TEXT,
  start_date DATE,
  end_date DATE,
  FOREIGN KEY (user_id) REFERENCES portfolio_user (id)
);

-- skill
CREATE TABLE skill (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  user_id UUID NOT NULL,
  name VARCHAR NOT NULL,
  description TEXT,
  level skill_level NOT NULL,
  FOREIGN KEY (user_id) REFERENCES portfolio_user (id)
);

-- project
CREATE TABLE project (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  user_id UUID NOT NULL,
  title VARCHAR NOT NULL,
  description TEXT NOT NULL,
  link VARCHAR,
  FOREIGN KEY (user_id) REFERENCES portfolio_user (id)
);

-- techstack
CREATE TABLE tech_stack (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  project_id UUID NOT NULL,
  name VARCHAR NOT NULL,
  FOREIGN KEY (project_id) REFERENCES project (id)
);

-- contact
CREATE TABLE contact (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  user_id UUID NOT NULL,
  email VARCHAR,
  FOREIGN KEY (user_id) REFERENCES portfolio_user (id)
);

-- social_link
CREATE TABLE social_link (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  contact_id UUID NOT NULL,
  platform VARCHAR NOT NULL,
  url VARCHAR NOT NULL,
  FOREIGN KEY (contact_id) REFERENCES contact (id)
);
