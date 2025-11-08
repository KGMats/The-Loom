---
title: RootLayout
sidebar_position: 5
---

# RootLayout

_The root layout for the entire application._

## Overview
This component wraps the entire application with necessary providers and global styles. It imports `globals.css` for global styling and `@rainbow-me/rainbowkit/styles.css` for the RainbowKit UI components. The main content of the application, represented by `children`, is wrapped within the `Providers` component, which likely sets up context providers for themes, authentication, and other global state.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| children | `React.ReactNode` | The child components to be rendered within the layout. |

## Returns
A JSX element representing the basic HTML structure of the application.

## Dependencies
- `./globals.css`
- `@rainbow-me/rainbowkit/styles.css`
- `./providers`

## Notes
This document provides a technical overview of the `RootLayout` component. Its primary role is to provide a consistent HTML structure for every page in the application. The imported CSS files (`globals.css` and RainbowKit's styles) ensure a uniform look and feel. The `Providers` component is critical for global state management; it wraps the application in all necessary contexts, such as wallet connection state from Wagmi and RainbowKit, making global data and functions available to all child components without prop-drilling.
