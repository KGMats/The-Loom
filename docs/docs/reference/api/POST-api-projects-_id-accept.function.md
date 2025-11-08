---
title: POST /api/projects/:id/accept
sidebar_position: 42
---

# POST /api/projects/:id/accept

_Handles POST requests for a user to accept a project (job)._

## Overview
This function allows a user to accept a job. It validates the provided wallet address, checks that the project exists and has not already been accepted, and ensures the user is not accepting their own job. If all checks pass, it updates the project's `wallet_address_secondary` with the user's address and sets the project `status` to 'WORKING'. It also makes an internal API call to `/api/projects/:id/claim` to generate a slug for the user to later claim their reward.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| request | `Request` | The incoming Next.js request object, with a JSON body containing the user's `wallet_address`. |
| context | `any` | The context object containing the route parameters, including the project ID. |

## Returns
A NextResponse object with a success message, the updated project data, the generated claim slug, or an error message.

## Dependencies
- `next/server`
- `database.js`

## Example
```typescript
fetch('/api/projects/123/accept', { method: 'POST', body: JSON.stringify({ wallet_address: '0x...' }) })
```

## Notes
This is a detailed description of the POST `/api/projects/:id/accept` endpoint.
- **Business Logic**: This endpoint enforces critical rules for job acceptance:
  1. A job must exist and be 'PENDING'.
  2. A job cannot be accepted by its creator.
  3. A job can only be accepted by one person.
- **Request Body**: `{ "wallet_address": "0x..." }`
- **Interaction**: A key feature is its internal call to the `/api/projects/:id/claim` endpoint. This generates a secure, one-time `slug`.
- **Success Response**: `{ success: true, message: 'Project accepted', project: { ... }, slug: '...' }`
- **Error Responses**: Returns `400`, `403`, `404`, or `409` status codes with specific error messages depending on which validation check fails.
