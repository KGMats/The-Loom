---
title: Projects API
sidebar_position: 12
---

# Projects API

_Handles listing and creating projects._

## Overview
This module defines two API endpoints: GET /api/projects and POST /api/projects. The GET endpoint retrieves all projects from the database, parsing the `external_links` field from a JSON string to an array. The POST endpoint creates a new project. It accepts form data, including project details, hardware/software requirements, and an optional script file. The script file is saved to the `public/uploads` directory. The new project data is then inserted into the 'projects' table in the database.

## Returns
The GET endpoint returns a JSON object with a list of projects. The POST endpoint returns a JSON object with the newly created project.

## Dependencies
- `next/server`
- `../../../database.js`
- `fs/promises`
- `path`
- `fs`

## Example
```typescript
// GET request to /api/projects
// POST request to /api/projects with form data
```

## Notes
This document provides a technical guide for the Projects API.
- **GET `/api/projects`**: Fetches a list of all projects. The request requires no parameters. The response is a JSON object containing a `projects` array.
- **POST `/api/projects`**: Creates a new project. The request must be `multipart/form-data`.
  - **Form Fields**: `title` (string), `description` (string), `project_type` (string), `price` (number), `wallet_address` (string), `hardware_requirements` (JSON string), `software_requirements` (JSON string), `external_links` (JSON string).
  - **File Upload**: An optional `script` field can contain a file, which will be saved in `public/uploads`.
The response will be the newly created project object.
