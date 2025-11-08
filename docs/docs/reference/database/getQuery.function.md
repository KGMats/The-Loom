---
title: getQuery
sidebar_position: 52
---

# getQuery

_Executes a SQL query that is expected to return a single row._

## Overview
This function is a promise-based wrapper around the `db.get` method from the `sqlite3` library. It is optimized for queries that should return at most one row. If the query finds a matching row, the promise resolves with that row object; otherwise, it resolves with `undefined`.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| sql | `string` | The SQL query to execute. |
| params | `any[]` | An array of parameters to be bound to the SQL query. |

## Returns
A promise that resolves with a single row object or `undefined`.

## Dependencies
- `sqlite3`

## Example
```typescript
const project = await getQuery('SELECT * FROM projects WHERE id = ?', [123]);
```

## Notes
This document provides a technical description of the `getQuery` function. It is the ideal choice when you need to retrieve a single record by a unique identifier (like a primary key). The promise resolves with the row object if found, or `undefined` if no match is found, making it easy to check for the existence of a record:
```javascript
const project = await getQuery('SELECT * FROM projects WHERE id = ?', [123]);
if (project) {
  // ... do something with the project
} else {
  // ... handle not found
}
```
