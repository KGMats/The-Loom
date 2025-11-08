---
title: AuthSyncer
sidebar_position: 23
---

# AuthSyncer

_An invisible component that triggers backend synchronization on wallet connection._

## Overview
This component uses the `useAccount` hook from Wagmi to monitor the users connection status. When a user connects their wallet (`isConnected` becomes true), it calls the `syncUserWithBackend` function to register the users address with the backend. It uses a `useRef` to ensure that the synchronization only happens once per connection. This component does not render any UI.

## Returns
null

## Dependencies
- `react`
- `wagmi`

## Example
```typescript
This component should be included in the main layout or a high-level component to ensure it is always active.
```

## Notes
The `AuthSyncer` component is designed as an invisible, "set-it-and-forget-it" utility. Its purpose is to cleanly separate the concern of backend user synchronization from the UI components. It uses a `useEffect` hook to react to changes in the `useAccount` hook's `isConnected` status. A `useRef` (`hasSynced`) acts as a flag to ensure the synchronization logic runs only once when the user connects, not on every re-render, making it highly efficient. This pattern avoids cluttering UI components with authentication logic and ensures a reliable sync process.
