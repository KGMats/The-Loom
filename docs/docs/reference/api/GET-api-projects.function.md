---
title: GET /api/projects
sidebar_position: 36
---

# GET /api/projects

_Handles GET requests to fetch all projects._

## Overview
This function retrieves all projects from the database by executing a 'SELECT * FROM projects' query. It then parses the `external_links` field of each project from a JSON string into an array before returning the projects to the client. It includes error handling for database queries.

## Returns
A NextResponse object containing a JSON payload with the success status and an array of projects, or an error message.

## Dependencies
- `next/server`
- `database.js`

## Example
```typescript
fetch('/api/projects')
```

## Notes
This document provides a technical description of the GET `/api/projects` endpoint. It fetches all records from the `projects` table. A key data transformation step is parsing the `external_links` field, which is stored as a JSON string in the database, into a proper array. A successful response will have a `200` status code and a JSON body like `{ success: true, projects: [...] }`. A database error will result in a `500` status code and a body like `{ success: false, error: '...' }`.
