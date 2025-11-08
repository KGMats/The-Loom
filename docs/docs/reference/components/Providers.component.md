---
title: Providers
sidebar_position: 11
---

# Providers

_A component that wraps the application with necessary context providers for wallet connectivity and data fetching._

## Overview
This component sets up the context for the entire application. It uses `WagmiProvider` to provide Wagmi hooks for Ethereum interactions, `QueryClientProvider` for data fetching with React Query, and `RainbowKitProvider` for the wallet connection UI. The configuration for RainbowKit and Wagmi is defined here, including the app name, project ID, supported wallets (Argent, Trust, Ledger, MetaMask), and blockchain chains (Scroll Sepolia, Sepolia, Mainnet, Polygon, Optimism, Arbitrum, Base). It also configures a dark theme for RainbowKit.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| children | `React.ReactNode` | The child components to be rendered within the providers. |

## Returns
A JSX element that provides context to its children.

## Dependencies
- `react`
- `@rainbow-me/rainbowkit`
- `@rainbow-me/rainbowkit/wallets`
- `wagmi`
- `@wagmi/core/chains`
- `@tanstack/react-query`

## Notes
This is a comprehensive guide to the `Providers` component. It bundles all the essential context providers for the application.
- **`WagmiProvider`**: Enables the use of Wagmi hooks for interacting with the blockchain (e.g., reading data, sending transactions).
- **`QueryClientProvider`**: Provides React Query context for efficient server state management, including data fetching, caching, and synchronization.
- **`RainbowKitProvider`**: Manages the wallet connection UI and state.
The configuration specifies which wallets (Argent, Trust, Ledger, MetaMask) and networks (Scroll Sepolia, Sepolia, Mainnet, etc.) are supported. To customize the theme, you can modify the `darkTheme` options passed to the `RainbowKitProvider`.
