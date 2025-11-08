---
title: deleteProject
sidebar_position: 35
---

# deleteProject

_Deletes a project from the backend._

## Overview
This function sends a DELETE request to the `/api/projects/{id}` endpoint to remove a project. It is intended to be used with React Query's `useMutation` hook to handle the deletion and subsequent UI updates.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| id | `number` | The ID of the project to delete. |

## Returns
A promise that resolves when the project is successfully deleted.

## Example
```typescript
const deleteMutation = useMutation({ mutationFn: deleteProject, ... })
```

## Notes
This document explains the `deleteProject` function. It sends a simple DELETE request to the API. When used with `useMutation` from React Query, you can set up an `onSuccess` callback to invalidate the `['projects']` query. This tells React Query that the local cache is stale, prompting it to refetch the project list from the server, which will cause the deleted project to disappear from the UI.
