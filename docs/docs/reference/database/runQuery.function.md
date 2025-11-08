---
title: runQuery
sidebar_position: 51
---

# runQuery

_Executes a SQL query that does not return rows (e.g., INSERT, UPDATE, DELETE)._

## Overview
This function is a promise-based wrapper around the `db.run` method from the `sqlite3` library. It is used for executing SQL statements where you don't expect a result set, such as inserting, updating, or deleting records. The promise resolves with an object containing the `lastID` of the inserted row and the number of `changes` made.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| sql | `string` | The SQL query to execute. |
| params | `any[]` | An array of parameters to be bound to the SQL query. |

## Returns
A promise that resolves with an object containing `lastID` and `changes`.

## Dependencies
- `sqlite3`

## Example
```typescript
await runQuery('DELETE FROM projects WHERE id = ?', [123]);
```

## Notes
This document provides a technical description of the `runQuery` function. It should be used for any database operation that modifies data.
- **`INSERT`**: `const result = await runQuery('INSERT INTO projects (title) VALUES (?)', ['New Project']); console.log(result.lastID);`
- **`UPDATE`**: `const result = await runQuery('UPDATE projects SET status = ? WHERE id = ?', ['COMPLETED', 123]); console.log(result.changes);`
- **`DELETE`**: `const result = await runQuery('DELETE FROM projects WHERE id = ?', [123]); console.log(result.changes);`
The promise-based wrapper simplifies asynchronous database calls, allowing the use of `async/await`.
