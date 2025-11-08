---
title: parseProject
sidebar_position: 38
---

# parseProject

_A helper function to parse the `external_links` of a project._

## Overview
This function takes a project object and attempts to parse the `external_links` property, which is stored as a JSON string in the database, into an array. If parsing fails, it defaults to an empty array. This ensures that the project object sent to the client has a consistent structure.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| project | `any` | The project object to parse. |

## Returns
The project object with `external_links` as an array.

## Example
```typescript
const parsedProjects = projects.map(parseProject);
```

## Notes
This document describes the `parseProject` helper function. Storing structured data like arrays as JSON strings is a common practice in databases that don't have a native array type (like SQLite). This function is crucial for data integrity, as it ensures that the API response always provides `external_links` as an array, even if the database field is null or malformed. This simplifies client-side logic, as the frontend can always expect an array.
