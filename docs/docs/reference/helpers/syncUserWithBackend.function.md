---
title: syncUserWithBackend
sidebar_position: 22
---

# syncUserWithBackend

_Sends the users wallet address to the backend for synchronization._

## Overview
This asynchronous function makes a POST request to the backend API endpoint (`/api/user/connect`) with the users wallet address. It is responsible for creating or updating the users record in the database. It logs the result of the synchronization to the console.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| address | `string` | The users wallet address. |

## Returns
void

## Example
```typescript
This function is called by the `AuthSyncer` component when a user connects their wallet.
```

## Notes
This document provides a technical description of the `syncUserWithBackend` function. Its primary role in the user authentication flow is to bridge the gap between the client-side wallet connection and the backend's user database. When a user connects their wallet, this function sends their address to the `/api/user/connect` endpoint. The backend can then use this address to either create a new user profile or retrieve an existing one, effectively logging the user into the application's backend systems. For security, the backend should validate the address format. Error handling should be added to manage cases where the API request fails.
