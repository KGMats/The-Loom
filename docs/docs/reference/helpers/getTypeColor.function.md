---
title: getTypeColor
sidebar_position: 31
---

# getTypeColor

_Returns a Tailwind CSS color class based on the project type._

## Overview
A helper function that takes a project type string ('IA' or 'GRAFICA') and returns the corresponding Tailwind CSS classes for background and text color. This is used to visually distinguish projects based on their type.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| type | `string` | The type of the project. |

## Returns
A string of Tailwind CSS classes.

## Example
```typescript
<span className={getTypeColor(project.type)}>...</span>
```

## Notes
This document describes the `getTypeColor` utility function. Similar to `getStatusColor`, this function's purpose is to provide consistent visual feedback for project types. It maps a project type ('IA' for AI, 'GRAFICA' for Graphics) to a specific color scheme, making it easy to identify different types of jobs at a glance in a list or grid view.
