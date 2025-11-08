---
title: database
sidebar_position: 17
---

# database

_Handles database connection, schema creation, and data seeding._

## Overview
This module uses 'sqlite3' to create and connect to a SQLite database file ('the-loom-hackathon.db'). It defines the schema for 'projects' and 'job_claims' tables, including fields for project details, hardware/software requirements, and job claim management. On initialization, it checks if the 'projects' table is empty and, if so, populates it with demo data. It also exports three promise-based query functions ('runQuery', 'getQuery', 'allQuery') for interacting with the database.

## Returns
The module exports `runQuery`, `getQuery`, and `allQuery` functions.

## Dependencies
- `sqlite3`

## Example
```typescript
import { runQuery, getQuery, allQuery } from './database.js';
const projects = await allQuery('SELECT * FROM projects');
```

## Notes
This document provides a technical overview of the database module.
- **Schema**:
  - `projects`: Stores all job details, including title, description, status, budget, requirements, and associated wallet addresses.
  - `job_claims`: Manages temporary, unique slugs for claiming jobs, including an expiration timestamp.
- **Seeding**: The database is automatically seeded with demo projects on its first run, which is useful for development and testing.
- **Query Functions**: The exported functions (`runQuery`, `getQuery`, `allQuery`) are promise-based wrappers around `sqlite3` methods, simplifying asynchronous database operations.
