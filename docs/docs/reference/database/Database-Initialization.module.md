---
title: Database Initialization
sidebar_position: 50
---

# Database Initialization

_Initializes the SQLite database, defines the schema, and seeds it with demo data._

## Overview
This module connects to the SQLite database file. Upon connection, it uses `db.serialize` to ensure that a series of database operations run in order. It first creates the `projects` and `job_claims` tables with a detailed schema if they do not already exist. It then checks if the `projects` table is empty and, if so, calls the `seedDatabase` function to populate it with a set of predefined demo projects. This entire process sets up the necessary database structure and initial data for the application to run correctly.

## Returns
A connected and initialized `sqlite3.Database` instance.

## Dependencies
- `sqlite3`

## Example
```typescript
This module is imported by the API route files to interact with the database.
```

## Notes
This document provides a technical overview of the database initialization process.
- **`db.serialize`**: This function is used to guarantee that the `CREATE TABLE` statements and the seeding logic execute sequentially, preventing race conditions.
- **Schema**:
  - `projects`: Contains all columns related to a job, including `title`, `description`, `status`, `price`, `hardware_requirements` (as JSON text), `software_requirements` (as JSON text), etc.
  - `job_claims`: A simple table to store the `slug`, the associated `project_id`, and an `expires_at` timestamp for the one-time claim tokens.
- **`seedDatabase`**: This function is executed only if the `projects` table is empty, populating the database with initial data for development and demonstration purposes without affecting a production database that already has data.
