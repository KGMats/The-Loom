---
title: DELETE /api/projects/:id
sidebar_position: 41
---

# DELETE /api/projects/:id

_Handles DELETE requests to remove a project._

## Overview
This function deletes a project from the database based on the ID provided in the URL. It returns a success message upon successful deletion or a 404 error if the project is not found.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| request | `Request` | The incoming Next.js request object. |
| context | `any` | The context object containing the route parameters, including the project ID. |

## Returns
A NextResponse object with a success message or an error.

## Dependencies
- `next/server`
- `database.js`

## Example
```typescript
fetch('/api/projects/123', { method: 'DELETE' })
```

## Notes
This document provides a clear description of the DELETE `/api/projects/:id` endpoint. To delete a project, send a DELETE request to its URL.
- **Success**: If the project is found and deleted, the API returns a `200` status with the message: `{ success: true, message: 'Project deleted' }`.
- **Failure**: If no project with the given ID exists, it returns a `404` status with an error message.
