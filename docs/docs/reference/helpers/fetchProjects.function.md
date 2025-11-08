---
title: fetchProjects
sidebar_position: 32
---

# fetchProjects

_Fetches the list of projects from the backend API._

## Overview
This asynchronous function sends a GET request to the `/api/projects` endpoint to retrieve all projects. It is designed to be used with React Query's `useQuery` hook for data fetching, caching, and state management.

## Returns
A promise that resolves to an object containing the success status and an array of project objects.

## Example
```typescript
useQuery({ queryKey: ['projects'], queryFn: fetchProjects })
```

## Notes
This document provides a technical description of the `fetchProjects` function. This function is the dedicated data-fetcher for retrieving all projects. By using it with `useQuery({ queryKey: ['projects'], queryFn: fetchProjects })`, React Query will handle caching the project list, refetching it in the background, and providing global access to the data via the `['projects']` query key. This decouples the data fetching logic from the component that uses it.
