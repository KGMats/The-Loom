---
title: TheLoomMVP
sidebar_position: 29
---

# TheLoomMVP

_The main component for managing and displaying user projects._

## Overview
This component serves as the core of the 'My Jobs' page. It orchestrates the entire project management lifecycle, including fetching, creating, updating, and deleting projects. It uses React Query for server state management, handling API requests and cache invalidation automatically. The component also manages the state for a modal form (`CreateProject`) for both creating new projects and editing existing ones. It simulates project progress for 'WORKING' projects using `setInterval`. The UI is composed of `ProjectStats` for an overview and `ProjectList` to display the projects.

## Returns
A React element representing the main project management interface.

## Dependencies
- `react`
- `@tanstack/react-query`
- `wagmi`
- `app/components/ProjectStats`
- `app/components/CreateProject`
- `app/components/ProjectList`

## Example
```typescript
This component is likely the main export of the `my-jobs/page.tsx` file.
```

## Notes
This is a comprehensive overview of the `TheLoomMVP` component. It acts as the central controller for the 'My Jobs' page, demonstrating a robust implementation of a CRUD interface with modern React tools.
- **Data Management**: It uses `useQuery` to fetch projects and `useMutation` for create, update, and delete operations. This handles loading states, errors, and cache invalidation seamlessly.
- **User Interaction**: It manages the state for the `CreateProject` modal, allowing users to create or edit projects. It passes the mutation functions down to the `ProjectList` and `CreateProject` components as callbacks.
- **Simulated Progress**: For demonstration purposes, it uses `setInterval` to randomly increment the `progress` of any project with a 'WORKING' status, simulating real-time updates from a worker client. This provides a dynamic and responsive feel to the UI.
