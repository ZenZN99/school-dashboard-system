# School Management System - Complete Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- Docker Desktop for Windows
- Git

## Step-by-Step Setup Instructions

### 1. Install Dependencies

```powershell
npm install
```

### 2. Docker Setup

#### Install Docker Desktop

1. Download from: https://www.docker.com/products/docker-desktop
2. Install Docker Desktop
3. Restart your computer if prompted

#### Fix WSL Issues

If Docker shows "WSL needs updating":

```powershell
wsl --update
```

Then click "Restart" in Docker Desktop and wait for "Engine running" status.

#### Start PostgreSQL Database

```powershell
# Method 1: Using docker-compose (if working)
docker-compose up -d

# Method 2: Using docker compose (newer syntax)
docker compose up -d

# Method 3: Direct container run (if docker-compose fails)
docker run -d --name postgres -e POSTGRES_USER=arwaacademy -e POSTGRES_PASSWORD=arwa12345678 -e POSTGRES_DB=arwaschool -p 5432:5432 postgres:latest
```

#### Verify Docker is Running

```powershell
docker ps
```

You should see the postgres container running.

### 3. Database Setup

#### Generate Prisma Client

```powershell
npx prisma generate
```

#### Run Database Migrations

```powershell
npx prisma migrate dev
```

#### Seed Database with Initial Data

```powershell
npx prisma db seed
```

### 4. Environment Variables

Your `.env` file should contain:

```env
DATABASE_URL="postgresql://arwaacademy:arwa12345678@localhost:5432/arwaschool?schema=public"
NODE_ENV=development
PORT=3000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_Y3V0ZS1rcmlsbC04LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_cWziDysm2T4DKmkanrfkxdn1e2QIaiNJu0WJjZ6RJe
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/
```

### 5. Start Development Server

```powershell
npm run dev
```

The application will be available at: http://localhost:3000

---

## Common Errors and Solutions

### Error: "Docker Desktop is unable to start"

**Solution:**

1. Update WSL: `wsl --update`
2. Restart Docker Desktop
3. If still failing, restart your computer
4. Make sure Hyper-V is enabled in Windows Features

### Error: "Can't reach database server at localhost:5432"

**Solution:**

1. Check if Docker is running: `docker ps`
2. Check if postgres container exists: `docker ps -a`
3. Start postgres: `docker start postgres`
4. If container doesn't exist, run the docker run command above

### Error: "@prisma/client did not initialize yet"

**Solution:**

```powershell
npx prisma generate
```

Then restart the dev server.

### Error: "Unable to get image 'postgres:latest'"

**Solution:**

1. Make sure Docker Desktop is fully started
2. Check your internet connection
3. Try: `docker pull postgres:latest`
4. If 500 error, restart Docker Desktop

### Error: "Module not found: Can't resolve './forms/ExamForm'"

**Solution:**
Already fixed in code - the directory is named `froms` (typo in original project)

### Error: Hydration errors with Calendar or UserButton

**Solution:**
Already fixed in code:

- Calendar component now uses `locale="en-US"`
- Navbar is now a client component with `"use client"`

### Error: "searchParams should be awaited"

**Solution:**
Already fixed - EventCalendarContainer now awaits searchParams (Next.js 15 requirement)

---

## Database Management Commands

### View Database Status

```powershell
npx prisma studio
```

Opens a GUI at http://localhost:5555 to view/edit database

### Reset Database (WARNING: Deletes all data)

```powershell
npx prisma migrate reset
```

### Create New Migration

```powershell
npx prisma migrate dev --name your_migration_name
```

---

## Docker Management Commands

### Stop Database

```powershell
docker stop postgres
```

### Start Database

```powershell
docker start postgres
```

### Remove Database Container (WARNING: Deletes data)

```powershell
docker stop postgres
docker rm postgres
```

### View Container Logs

```powershell
docker logs postgres
```

### View All Containers

```powershell
docker ps -a
```

---

## User Authentication

This project uses **Clerk** for authentication. The credentials in `.env` are test keys.

### Default Test Users (from seed data)

- Admins: admin1, admin2
- Teachers: teacher1 to teacher15
- Students: student1 to student50
- Parents: parentId1 to parentId25

**Note:** These are database records only. Actual login is through Clerk - you need to sign up through the login page.

---

## Troubleshooting Checklist

Before asking for help, verify:

- [ ] Docker Desktop is running (green indicator)
- [ ] `docker ps` shows postgres container
- [ ] `npx prisma generate` completed successfully
- [ ] `.env` file exists with correct values
- [ ] Port 3000 and 5432 are not used by other applications
- [ ] Node.js version 18+ is installed: `node --version`

---

## Quick Start (After Initial Setup)

Every time you start working:

```powershell
# 1. Start Docker Desktop (if not running)

# 2. Start database (if stopped)
docker start postgres

# 3. Start dev server
npm run dev
```

---

## Project Structure

```
prisma/
  schema.prisma      # Database schema
  seed.ts           # Initial data
src/
  app/              # Next.js 15 app router
  components/       # React components
  lib/              # Utilities and Prisma client
```

---

## Support Links

- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
- Docker Docs: https://docs.docker.com
- Clerk Docs: https://clerk.com/docs

---

Last Updated: November 28, 2025
