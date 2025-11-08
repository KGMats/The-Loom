---
title: GET /api/projects/:id
sidebar_position: 39
---

# GET /api/projects/:id

_Handles GET requests to fetch a single project by its ID._

## Overview
This function retrieves a specific project from the database using the ID provided in the URL path. It returns the project data if found, or a 404 error if no project with the given ID exists.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| request | `Request` | The incoming Next.js request object. |
| context | `any` | The context object containing the route parameters, including the project ID. |

## Returns
A NextResponse object with the project data or an error message.

## Dependencies
- `next/server`
- `database.js`

## Example
```typescript
fetch('/api/projects/123')
```

## Notes
This document provides a technical description of the GET `/api/projects/:id` endpoint. It uses the `getQuery` database function to fetch a single project.
- **Success**: If a project with the specified ID is found, it returns a `200` status with the project object in the response body.
- **Failure**: If no project is found, it returns a `404` status with an error message: `{ success: false, error: 'Project not found' }`.
