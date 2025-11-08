---
title: CustomConnectButton
sidebar_position: 2
---

# CustomConnectButton

_A custom connect button that integrates with RainbowKit and a custom authentication component._

## Overview
This component wraps the `ConnectButton` from `@rainbow-me/rainbowkit` and includes an `AuthSyncer` component. The `AuthSyncer` is likely used to synchronize the user's wallet authentication state with the application's backend or context.

## Returns
A JSX element that renders a connect button and handles wallet authentication.

## Dependencies
- `@rainbow-me/rainbowkit`
- `./AuthWallet`

## Notes
This document provides a technical explanation of the `CustomConnectButton` component, detailing how it uses RainbowKit's `ConnectButton` and the role of the `AuthSyncer` component in the authentication process. The `CustomConnectButton` serves as a clean, all-in-one solution for user authentication. By bundling RainbowKit's polished UI with the custom `AuthSyncer` logic, it ensures that the application's backend is always in sync with the on-chain wallet status, providing a smoother user experience.
