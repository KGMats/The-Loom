---
title: PUT /api/projects/:id
sidebar_position: 40
---

# PUT /api/projects/:id

_Handles PUT requests to update a project._

## Overview
This function allows for partial updates to a project. It first retrieves the existing project, then merges the fields from the request body with the existing data. It performs validation on the updated fields before saving them to the database. This ensures that only the provided fields are changed and that the data remains valid.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| request | `Request` | The incoming Next.js request object, with a JSON body containing the fields to update. |
| context | `any` | The context object containing the route parameters, including the project ID. |

## Returns
A NextResponse object with the updated project data or an error message.

## Dependencies
- `next/server`
- `database.js`

## Example
```typescript
fetch('/api/projects/123', { method: 'PUT', body: JSON.stringify({ status: 'WORKING' }) })
```

## Notes
This is a detailed guide for the PUT `/api/projects/:id` endpoint. It enables partial updates by merging the existing project data with the new data from the request body.
- **Updatable Fields**: `title`, `description`, `project_type`, `price`, `status`, `progress`, etc.
- **Validation**: The endpoint validates the data types and values of the updated fields. For example, it ensures `price` is a number and `status` is one of the allowed values.
- **Example Scenarios**:
  - To update a project's status: `body: JSON.stringify({ status: 'COMPLETED' })`
  - To change the price and title: `body: JSON.stringify({ title: 'New Title', price: 250 })`
The response will be the full, updated project object.
