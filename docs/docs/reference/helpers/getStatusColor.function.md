---
title: getStatusColor
sidebar_position: 30
---

# getStatusColor

_Returns a Tailwind CSS color class based on the project status._

## Overview
A helper function that takes a project status string ('PENDING', 'WORKING', 'COMPLETED') and returns the corresponding Tailwind CSS classes for background and text color. This is used to visually distinguish projects based on their status.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| status | `string` | The status of the project. |

## Returns
A string of Tailwind CSS classes.

## Example
```typescript
<span className={getStatusColor(project.status)}>...</span>
```

## Notes
This document describes the `getStatusColor` utility function. Its purpose is to centralize the mapping of project statuses to specific colors, ensuring a consistent visual language across the application. By using this function, you can easily change the color scheme for all statuses in one place, and the code in your components remains clean and readable.
