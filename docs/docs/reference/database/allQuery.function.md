---
title: allQuery
sidebar_position: 53
---

# allQuery

_Executes a SQL query that is expected to return multiple rows._

## Overview
This function is a promise-based wrapper around the `db.all` method from the `sqlite3-verbose` library. It is used for `SELECT` queries that can return multiple rows. The promise resolves with an array of row objects. If no rows are found, it resolves with an empty array.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| sql | `string` | The SQL query to execute. |
| params | `any[]` | An array of parameters to be bound to the SQL query. |

## Returns
A promise that resolves with an array of row objects.

## Dependencies
- `sqlite3`

## Example
```typescript
const projects = await allQuery('SELECT * FROM projects');
```

## Notes
This document provides a technical description of the `allQuery` function. It is used whenever you need to retrieve a list of records from the database. The promise will always resolve with an array, which will be empty if no records match the query. This provides a consistent return type, simplifying client code as you can always iterate over the result without checking if it's undefined.
```javascript
const activeProjects = await allQuery('SELECT * FROM projects WHERE status = ?', ['WORKING']);
console.log(`Found ${activeProjects.length} active projects.`);
for (const project of activeProjects) {
  // ...
}
```
