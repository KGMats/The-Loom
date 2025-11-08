---
title: ProjectList
sidebar_position: 27
---

# ProjectList

_Renders a grid of projects with their details and available actions._

## Overview
This component takes an array of project objects and displays them in a responsive grid. Each project card shows the title, type, status, progress, description, price, and links. It also provides buttons for actions like starting, editing, or deleting a project. The visibility of these buttons can depend on the project's status. The component is highly reusable and customizable through its props.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| projects | `Project[]` | An array of project objects to be displayed. |
| onEdit | `(p: Project) => void` | A callback function to be executed when the user clicks the 'Edit' button. |
| onStart | `(p: Project) => void` | A callback function to be executed when the user clicks the 'Start' button (for pending projects). |
| onDelete | `(id: number) => void` | A callback function to be executed when the user clicks the 'Delete' button. |
| onUpdateProgress | `(id: number, progress: number) => void` | An optional callback to update the progress of a project. |

## Returns
A React element representing a grid of project cards.

## Dependencies
- `react`

## Example
```typescript
This component is likely used on pages like 'My Jobs' or 'Marketplace' to display lists of projects.
```

## Notes
This is a comprehensive guide for the `ProjectList` component. To use it, pass an array of `Project` objects to the `projects` prop.
- **Project Object Structure**: A `Project` object should contain fields like `id`, `title`, `type`, `status`, `progress`, `description`, `price`, etc.
- **Actions**: Implement the callback props (`onEdit`, `onStart`, `onDelete`) to handle user interactions. The component's UI will adapt based on the project's `status`; for example, the 'Start' button might only appear for projects with a 'PENDING' status.
- **Example Usage**:
  ```jsx
  <ProjectList
    projects={myProjects}
    onEdit={(p) => openEditModal(p)}
    onDelete={(id) => deleteProject(id)}
  />
  ```
