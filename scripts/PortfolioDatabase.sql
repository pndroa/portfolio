-- Enable extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ENUM type
CREATE TYPE "skillLevel" AS ENUM (
  'beginner',
  'intermediate',
  'advanced'
);

-- portfolio table
CREATE TABLE "portfolio" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  "title" VARCHAR NOT NULL,
  "slug" VARCHAR UNIQUE NOT NULL,
  "description" TEXT
);

-- User table
CREATE TABLE "portfolioUser" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  "portfolioId" UUID NOT NULL UNIQUE,
  "firstName" VARCHAR NOT NULL,
  "lastName" VARCHAR NOT NULL,
  "job" VARCHAR,
  "fieldOfStudy" VARCHAR,
  "aboutMe" TEXT NOT NULL,
  FOREIGN KEY ("portfolioId") REFERENCES "portfolio" ("id")
);

-- education
CREATE TABLE "education" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  "userId" UUID NOT NULL,
  "institution" VARCHAR NOT NULL,
  "degree" VARCHAR NOT NULL,
  "fieldOfStudy" VARCHAR,
  "startDate" DATE NOT NULL,
  "endDate" DATE NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "portfolioUser" ("id")
);

-- experience
CREATE TABLE "experience" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  "userId" UUID NOT NULL,
  "title" VARCHAR NOT NULL,
  "company" VARCHAR,
  "description" TEXT,
  "startDate" DATE,
  "endDate" DATE,
  FOREIGN KEY ("userId") REFERENCES "portfolioUser" ("id")
);

-- skill
CREATE TABLE "skill" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  "userId" UUID NOT NULL,
  "name" VARCHAR NOT NULL,
  "description" TEXT,
  "level" "skillLevel" NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "portfolioUser" ("id")
);

-- project
CREATE TABLE "project" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  "userId" UUID NOT NULL,
  "title" VARCHAR NOT NULL,
  "description" TEXT NOT NULL,
  "link" VARCHAR,
  FOREIGN KEY ("userId") REFERENCES "portfolioUser" ("id")
);

-- techStack
CREATE TABLE "techStack" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  "projectId" UUID NOT NULL,
  "name" VARCHAR NOT NULL,
  FOREIGN KEY ("projectId") REFERENCES "project" ("id")
);

-- contact
CREATE TABLE "contact" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  "userId" UUID NOT NULL,
  "email" VARCHAR,
  FOREIGN KEY ("userId") REFERENCES "portfolioUser" ("id")
);

-- socialLink
CREATE TABLE "socialLink" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  "contactId" UUID NOT NULL,
  "platform" VARCHAR NOT NULL,
  "url" VARCHAR NOT NULL,
  FOREIGN KEY ("contactId") REFERENCES "contact" ("id")
);
