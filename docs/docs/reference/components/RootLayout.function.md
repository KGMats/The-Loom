---
title: RootLayout
sidebar_position: 19
---

# RootLayout

_Provides the root HTML structure for the entire application._

## Overview

This component wraps all pages and components, setting up the basic HTML document structure (`<html>`, `<body>`). It imports global stylesheets and wraps the application in the Providers component, which is likely used for state management or to provide context to child components (e.g., for wallet connections).

## Parameters

| Name | Type | Description |
|------|------|-------------|
| children | `React.ReactNode` | The content to be rendered within the layout. |

## Returns

A React element representing the root layout.

## Dependencies

- `app/globals.css`
- `@rainbow-me/rainbowkit/styles.css`
- `app/providers`

## Example

```typescript
This component is automatically used by Next.js to wrap all pages.
```

## Notes

This document explains the role of the RootLayout in a Next.js application, focusing on how it establishes a consistent structure and provides global context to all pages. By wrapping the entire application, `RootLayout` ensures that global styles, fonts, and essential providers (like those for wallet state) are loaded once and are available on every page, preventing redundant loading and ensuring a consistent user experience.
