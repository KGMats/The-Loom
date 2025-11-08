---
title: Project Claim API
sidebar_position: 14
---

# Project Claim API

_Handles the claiming of a project by generating a temporary, unique slug._

## Overview
This module defines a POST endpoint at `/api/projects/:id/claim`. When a user claims a project, this endpoint generates a unique, secure slug that is valid for a limited time (5 minutes). It first checks if the project exists and if there is already an active claim. If not, it generates a new slug, stores it in the `job_claims` table with an expiration date, and returns the slug to the user. This slug is then used to accept the job.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| id | `number` | The ID of the project to be claimed. |

## Returns
A JSON object with the unique slug for the claimed job.

## Dependencies
- `next/server`
- `../../../../../database`
- `crypto`

## Example
```typescript
// POST request to /api/projects/1/claim
```

## Notes
This document provides a technical guide for the Project Claim API. This endpoint is a key part of the job claiming process, ensuring that only one user can start the acceptance process at a time. It generates a unique, cryptographically secure slug with a 5-minute expiration. The request requires the project ID in the URL. The response is a JSON object containing the `slug`.
