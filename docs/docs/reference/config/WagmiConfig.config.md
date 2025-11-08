---
title: WagmiConfig
sidebar_position: 20
---

# WagmiConfig

_Configuration object for Wagmi and RainbowKit._

## Overview
This configuration object, created using `getDefaultConfig` from RainbowKit, sets up the connection to various blockchain networks and wallets. It defines the application name, WalletConnect project ID, and a list of supported chains (including Scroll Sepolia, Sepolia, Mainnet, etc.). It also specifies additional wallets to be displayed in the connection modal.

## Returns
A Wagmi configuration object.

## Dependencies
- `@rainbow-me/rainbowkit`
- `wagmi`
- `@wagmi/core/chains`
- `@tanstack/react-query`

## Example
```typescript
This config object is passed to the `WagmiProvider` component.
```

## Notes
This document provides a technical explanation of the Wagmi and RainbowKit configuration.
- **`projectId`**: This is your WalletConnect project ID, which is essential for connecting to mobile wallets.
- **`chains`**: This array defines all the blockchain networks your application will support. You can add or remove chains from `wagmi/chains`.
- **Wallets**: You can customize the list of wallets shown in the connection modal by configuring the `connectorsForWallets` function.
- **`ssr: true`**: This setting enables Server-Side Rendering for Wagmi, which helps prevent UI flickering and hydration errors in a Next.js environment by ensuring the server-rendered HTML matches the initial client-side render.
