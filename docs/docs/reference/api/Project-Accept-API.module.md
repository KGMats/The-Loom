---
title: Project Accept API
sidebar_position: 15
---

# Project Accept API

_Handles the acceptance of a project by a secondary user._

## Overview
This module defines a POST endpoint at `/api/projects/:id/accept`. When a user accepts a project, this endpoint updates the project's status to 'WORKING' and assigns the user's wallet address to the `wallet_address_secondary` field. It performs several checks before updating the project: it validates the wallet address, ensures the project exists, checks that the job has not already been accepted, and prevents the project creator from accepting their own job. After successfully accepting the job, it makes a call to the `/api/projects/:id/claim` endpoint to generate a slug for the job.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| id | `number` | The ID of the project to be accepted. |
| wallet_address | `string` | The wallet address of the user accepting the job. |

## Returns
A JSON object with a success message, the updated project data, and a slug for the job.

## Dependencies
- `next/server`
- `../../../../../database.js`

## Example
```typescript
// POST request to /api/projects/1/accept with a JSON body containing the wallet_address
```

## Notes
This document provides a technical guide for the Project Accept API. This endpoint manages the core logic for a user accepting a job.
- **Request**: A POST request with a JSON body containing the `wallet_address` of the user accepting the job.
- **Validation**: It performs several crucial checks:
  1. Validates the `wallet_address`.
  2. Ensures the project exists and is available (`status` is 'PENDING').
  3. Prevents the creator from accepting their own job.
- **Response**: On success, it returns the updated project data and a unique `slug` (obtained from the Claim API) which the user needs to start the job.
