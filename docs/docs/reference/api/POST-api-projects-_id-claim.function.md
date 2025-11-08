---
title: POST /api/projects/:id/claim
sidebar_position: 43
---

# POST /api/projects/:id/claim

_Generates a unique, expiring slug for a user to claim a job's reward._

## Overview
This function creates a secure, random slug that a user can use to claim their reward after completing a job. It first checks if a valid, non-expired slug already exists for the project. If not, it generates a new one, stores it in the `job_claims` table with an expiration date, and returns the slug to the caller. This endpoint is called internally by the `/api/projects/:id/accept` endpoint.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| request | `Request` | The incoming Next.js request object. |
| params | `{ id: string }` | An object containing the route parameters, including the project ID. |

## Returns
A NextResponse object with the generated slug or an error message.

## Dependencies
- `next/server`
- `database.js`
- `crypto`

## Example
```typescript
This endpoint is called internally when a job is accepted.
```

## Notes
This document provides a technical explanation of the POST `/api/projects/:id/claim` endpoint. The claim slug is a security measure to ensure that only the user who accepted the job can access its details later.
- **Security**: It uses `crypto.randomBytes` to generate a cryptographically secure random string for the slug.
- **Expiration**: Each slug is stored with a 5-minute expiration time (`expires_at`). The endpoint also includes logic to clean up any expired slugs for the given project before creating a new one.
- **Database**: It interacts with the `job_claims` table to check for existing slugs and to store the new one.
