---
title: ProjectStats
sidebar_position: 28
---

# ProjectStats

_Displays key statistics about a collection of projects._

## Overview
This component calculates and displays the total number of projects, the number of projects currently in the 'WORKING' state, and the number of projects that are 'COMPLETED'. It takes an array of project objects and renders the statistics in a clean, card-based layout.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| projects | `Project[]` | An array of project objects to be analyzed. |

## Returns
A React element showing project statistics.

## Dependencies
- `react`

## Example
```typescript
This component can be used on a dashboard or 'My Jobs' page to give users a quick overview of their projects.
```

## Notes
This guide is for the `ProjectStats` component. It provides a high-level summary of a user's projects. It iterates through the `projects` array, counting the total number of projects and filtering them by their `status` to calculate the number of 'WORKING' and 'COMPLETED' jobs.
- **Usage**:
  ```jsx
  const myProjects = [{ status: 'WORKING' }, { status: 'COMPLETED' }];
  <ProjectStats projects={myProjects} />
  ```
This will display: Total Projects: 2, Working: 1, Completed: 1.
