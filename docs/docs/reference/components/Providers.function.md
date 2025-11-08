---
title: Providers
sidebar_position: 21
---

# Providers

_A component that wraps the application to provide necessary contexts._

## Overview
The `Providers` component wraps its children with `WagmiProvider`, `QueryClientProvider`, and `RainbowKitProvider`. This setup makes Wagmi hooks for blockchain interaction, React Query for data fetching and caching, and RainbowKit components for wallet connection available throughout the application. It also configures a dark theme for RainbowKit.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| children | `React.ReactNode` | The content to be rendered within the providers. |

## Returns
A React element that provides contexts to its children.

## Dependencies
- `react`
- `wagmi`
- `@tanstack/react-query`
- `@rainbow-me/rainbowkit`

## Example
```typescript
This component is used in `app/layout.tsx` to wrap the entire application.
```

## Notes
In React, "providers" are components that use the Context API to pass data down the component tree without having to pass props manually at every level. The `Providers` component for The Loom is a crucial piece of architecture that enables all web3 functionality.
- **`WagmiProvider`**: Provides the Wagmi context, allowing any component to access blockchain data and execute transactions.
- **`QueryClientProvider`**: Provides the React Query client, enabling efficient server state management.
- **`RainbowKitProvider`**: Provides the context for RainbowKit's modals and wallet connection state.
By wrapping the entire app in `Providers`, we ensure that these foundational services are available everywhere.
