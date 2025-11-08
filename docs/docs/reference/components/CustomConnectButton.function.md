---
title: CustomConnectButton
sidebar_position: 24
---

# CustomConnectButton

_A custom connect button that integrates wallet connection with backend synchronization._

## Overview
This component renders the `ConnectButton` from RainbowKit, allowing users to connect their crypto wallets. It also includes the `AuthSyncer` component, which ensures that the user's account information is synchronized with the backend upon successful connection. The button label is customized to 'Connect Wallet'.

## Returns
A React element containing the `ConnectButton` and `AuthSyncer`.

## Dependencies
- `@rainbow-me/rainbowkit`
- `app/components/AuthWallet`

## Example
```typescript
This button can be placed in the application's header or any other location where users need to connect their wallet.
```

## Notes
This document describes the `CustomConnectButton`. This component demonstrates a powerful pattern: composing vendor components with custom logic. It takes the polished UI of RainbowKit's `ConnectButton` and enhances it by including the `AuthSyncer` component. The benefit of this approach is that it creates a single, reusable component that handles both the user-facing action (connecting a wallet) and the necessary background logic (backend synchronization) in one go. This simplifies development and ensures that the authentication process is consistent wherever the button is used.
