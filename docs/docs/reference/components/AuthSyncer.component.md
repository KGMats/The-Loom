---
title: AuthSyncer
sidebar_position: 1
---

# AuthSyncer

_An invisible component that synchronizes user authentication state with the backend._

## Overview
This component uses the `useAccount` hook from `wagmi` to monitor the user's wallet connection status. When a user connects their wallet, it calls the `syncUserWithBackend` function to send the user's address to the backend API endpoint `/api/user/connect`. It uses a `useRef` to ensure that the synchronization only happens once per connection. This component does not render any UI.

## Returns
A JSX element that renders a connect button and handles wallet authentication.

## Dependencies
- `react`
- `wagmi`

## Notes
The `AuthSyncer` component is designed to seamlessly synchronize the user's authentication state with the backend without rendering any UI. It utilizes the `useAccount` hook from `wagmi` to monitor wallet connection status. A `useEffect` hook, in combination with a `useRef` to prevent duplicate calls, triggers the `syncUserWithBackend` function precisely once when a user connects their wallet. This function is responsible for sending the user's address to the backend, linking their on-chain identity to the application's user database.
