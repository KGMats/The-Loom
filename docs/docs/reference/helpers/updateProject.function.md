---
title: updateProject
sidebar_position: 34
---

# updateProject

_Updates an existing project with new data._

## Overview
This function sends a PUT request to the `/api/projects/{id}` endpoint to update a specific project. It takes the project ID and a partial project object containing the fields to be updated. It is designed for use with React Query's `useMutation` hook.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| id | `number` | The ID of the project to update. |
| data | `Partial<Project>` | An object containing the project fields to be updated. |

## Returns
A promise that resolves to the updated project object.

## Example
```typescript
const updateMutation = useMutation({ mutationFn: updateProject, ... })
```

## Notes
This document describes the `updateProject` function. It's designed to perform partial updates, meaning you only need to send the fields you want to change. For example, `updateProject(1, { status: 'COMPLETED' })`. In the `TheLoomMVP` component, this function is used in a mutation that, on success, invalidates the `['projects']` query to ensure the UI reflects the updated project data.
