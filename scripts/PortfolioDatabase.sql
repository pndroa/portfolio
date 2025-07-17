-- ENUM type
CREATE TYPE "SkillLevel" AS ENUM (
  'beginner',
  'intermediate',
  'advanced'
);

-- Portfolio table
CREATE TABLE "Portfolio" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  "title" VARCHAR NOT NULL,
  "slug" VARCHAR UNIQUE NOT NULL,
  "description" TEXT
);

-- User table
CREATE TABLE "PortfolioUser" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  "portfolioId" UUID NOT NULL UNIQUE,
  "firstName" VARCHAR NOT NULL,
  "lastName" VARCHAR NOT NULL,
  "job" VARCHAR,
  "fieldOfStudy" VARCHAR,
  "aboutMe" TEXT NOT NULL,
  FOREIGN KEY ("portfolioId") REFERENCES "Portfolio" ("id")
);

-- Education
CREATE TABLE "Education" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  "userId" UUID NOT NULL,
  "institution" VARCHAR NOT NULL,
  "degree" VARCHAR NOT NULL,
  "fieldOfStudy" VARCHAR,
  "startDate" DATE NOT NULL,
  "endDate" DATE NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "PortfolioUser" ("id")
);

-- Experience
CREATE TABLE "Experience" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  "userId" UUID NOT NULL,
  "title" VARCHAR NOT NULL,
  "company" VARCHAR,
  "description" TEXT,
  "startDate" DATE,
  "endDate" DATE,
  FOREIGN KEY ("userId") REFERENCES "PortfolioUser" ("id")
);

-- Skill
CREATE TABLE "Skill" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  "userId" UUID NOT NULL,
  "name" VARCHAR NOT NULL,
  "description" TEXT,
  "level" "SkillLevel" NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "PortfolioUser" ("id")
);

-- Project
CREATE TABLE "Project" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  "userId" UUID NOT NULL,
  "title" VARCHAR NOT NULL,
  "description" TEXT NOT NULL,
  "link" VARCHAR,
  FOREIGN KEY ("userId") REFERENCES "PortfolioUser" ("id")
);

-- TechStack
CREATE TABLE "TechStack" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  "projectId" UUID NOT NULL,
  "name" VARCHAR NOT NULL,
  FOREIGN KEY ("projectId") REFERENCES "Project" ("id")
);

-- Contact
CREATE TABLE "Contact" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  "userId" UUID NOT NULL,
  "email" VARCHAR,
  FOREIGN KEY ("userId") REFERENCES "PortfolioUser" ("id")
);

-- SocialLink
CREATE TABLE "SocialLink" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  "contactId" UUID NOT NULL,
  "platform" VARCHAR NOT NULL,
  "url" VARCHAR NOT NULL,
  FOREIGN KEY ("contactId") REFERENCES "Contact" ("id")
);
