---
title: Project API
sidebar_position: 13
---

# Project API

_Handles getting, updating, and deleting a specific project._

## Overview
This module defines three API endpoints for a specific project: GET /api/projects/:id, PUT /api/projects/:id, and DELETE /api/projects/:id. The GET endpoint retrieves a single project from the database by its ID. The PUT endpoint updates a project's details, allowing for partial updates. It validates the input data, such as the project type, price, and wallet address. The DELETE endpoint removes a project from the database by its ID.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| id | `number` | The ID of the project. |

## Returns
The GET and PUT endpoints return a JSON object with the project data. The DELETE endpoint returns a JSON object with a success message.

## Dependencies
- `next/server`
- `../../../../database.js`

## Example
```typescript
// GET request to /api/projects/1
// PUT request to /api/projects/1 with a JSON body
// DELETE request to /api/projects/1
```

## Notes
This document provides a technical guide for the Project API.
- **GET `/api/projects/:id`**: Retrieves a single project. The response is the project object.
- **PUT `/api/projects/:id`**: Updates a project. The request body should be a JSON object with the fields to update. Updatable fields include `title`, `description`, `status`, `price`, etc. Validation is performed on the input.
- **DELETE `/api/projects/:id`**: Deletes a project. No request body is needed. The response is a success message.
