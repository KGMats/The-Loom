---
title: Job Claim Details API
sidebar_position: 16
---

# Job Claim Details API

_Retrieves project details using a one-time claim slug._

## Overview
This module defines a GET endpoint at `/api/jobs/claim/:slug`. This endpoint is used to retrieve the full details of a project using a unique, single-use slug that was generated when the job was claimed. It first validates the slug and checks if it has expired. If the slug is valid, it is consumed (deleted) to prevent reuse. Then, it fetches the associated project details from the database, parses any JSON string fields, and returns the complete project object.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| slug | `string` | The unique, one-time slug for the claimed job. |

## Returns
A JSON object containing the full details of the project.

## Dependencies
- `next/server`
- `../../../../../database`

## Example
```typescript
// GET request to /api/jobs/claim/a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6
```

## Notes
This document provides a technical guide for the Job Claim Details API. This endpoint provides a secure mechanism for the worker client to fetch job details. The slug acts as a one-time password.
- **Validation**: The API first checks if the slug exists and is not expired.
- **Consumption**: To ensure security and prevent replay attacks, the slug is deleted from the database immediately after it's validated.
- **Response**: If the slug is valid, the full project object, including potentially sensitive information like asset download links, is returned. If invalid or expired, it returns an error.
