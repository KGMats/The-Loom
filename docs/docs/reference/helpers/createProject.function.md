---
title: createProject
sidebar_position: 33
---

# createProject

_Creates a new project by sending data to the backend API._

## Overview
This function handles the creation of a new project. It takes the project data and an optional file, constructs a `FormData` object, and sends it to the `/api/projects` endpoint via a POST request. This approach is used to support file uploads alongside the JSON data. It's intended to be used with React Query's `useMutation` hook.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| payload | `CreateProjectData` | The project data to be sent. |
| file | `File | null` | An optional file to be uploaded with the project. |

## Returns
A promise that resolves to the newly created project object.

## Example
```typescript
const createMutation = useMutation({ mutationFn: createProject, ... })
```

## Notes
This is a detailed explanation of the `createProject` function. It uses `FormData` because a standard JSON request cannot include file uploads. The project data is stringified and appended to the `FormData` object, and the file is appended separately. When used with `useMutation`, you can define `onSuccess` callbacks to perform actions like invalidating the `['projects']` query cache, which automatically triggers a refetch and updates the UI to show the new project. This is a key pattern for keeping server and client state in sync.
