---
title: GET /api/jobs/claim/[slug]
sidebar_position: 44
---

# GET /api/jobs/claim/[slug]

_Consumes a claim slug to retrieve the details of the associated project._

## Overview
This function allows a user or a worker client to redeem a claim slug. It first validates the slug, checking if it exists and has not expired. If the slug is valid, it is immediately deleted from the database to prevent reuse (making it a one-time use token). The function then fetches and returns the full details of the project associated with the slug. This mechanism ensures that only the user who accepted the job can access its sensitive details, like download links for datasets.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| request | `Request` | The incoming Next.js request object. |
| params | `{ slug: string }` | An object containing the route parameters, including the claim slug. |

## Returns
A NextResponse object with the full project details or an error message if the slug is invalid or expired.

## Dependencies
- `next/server`
- `database.js`

## Example
```typescript
fetch('/api/jobs/claim/a1b2c3d4e5f6...')
```

## Notes
This is a detailed technical guide for the GET `/api/jobs/claim/[slug]` endpoint. It is a critical security component for securely delivering job data to the worker client.
- **One-Time Use**: The most important feature is that the slug is consumed (deleted) upon successful validation. This prevents the same slug from being used multiple times to access the job data.
- **Process**:
  1. Find the claim in `job_claims` by slug.
  2. Check if it's expired.
  3. If valid, delete the claim slug from the database.
  4. Fetch the full project details using the `project_id` from the claim.
  5. Return the project details.
- **Responses**: Returns `404` if the slug is not found or expired, and `200` with the project data on success.
