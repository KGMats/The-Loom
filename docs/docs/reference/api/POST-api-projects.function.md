---
title: POST /api/projects
sidebar_position: 37
---

# POST /api/projects

_Handles POST requests to create a new project._

## Overview
This function is responsible for creating a new project. It processes `multipart/form-data`, which can include both project data and a file upload. It performs validation on the input data, saves the uploaded file to the server's file system if one is provided, and then inserts a new record into the 'projects' table in the database. It handles various errors, including validation errors, file system errors, and database errors.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| request | `Request` | The incoming Next.js request object, expected to contain `formData`. |

## Returns
A NextResponse object with a JSON payload indicating success or failure, and the newly created project object on success.

## Dependencies
- `next/server`
- `database.js`
- `fs/promises`
- `path`
- `fs`

## Example
```typescript
const response = await fetch('/api/projects', { method: 'POST', body: formData });
```

## Notes
This is a comprehensive guide for the POST `/api/projects` endpoint.
- **Request Format**: The request must use `Content-Type: multipart/form-data`.
- **Form Fields**:
  - `title`, `description`, `project_type`, `price`, `wallet_address`: String values.
  - `hardware_requirements`, `software_requirements`, `external_links`: JSON strings.
  - `script`: An optional file upload.
- **Validation**: The endpoint validates required fields and data types. If validation fails, it returns a `400` error with details.
- **File Handling**: If a `script` file is included, it is saved to the `public/uploads` directory on the server.
- **Error Responses**: The API can return `400` for bad requests, `500` for server errors (file system or database), and `201` for successful creation.
