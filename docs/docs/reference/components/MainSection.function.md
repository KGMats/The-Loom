---
title: MainSection
sidebar_position: 26
---

# MainSection

_Renders the main header and navigation bar for the application._

## Overview
This component displays the application's logo, which links back to the homepage, and a set of navigation links to key sections: 'Download', 'My Jobs', and 'Explore Jobs'. It also includes the `CustomConnectButton` to provide wallet connection functionality directly in the header.

## Returns
A React element representing the application header.

## Dependencies
- `react`
- `next/link`
- `app/components/ConnectButton`

## Example
```typescript
This component is used in `app/page.tsx` and likely other pages to provide a consistent header and navigation experience.
```

## Notes
This document describes the `MainSection` component. The navigation links guide the user through the application's primary workflows: 'Download' for the worker client, 'My Jobs' for managing personal projects, and 'Explore Jobs' for finding work. The inclusion of the `CustomConnectButton` in the header is a strategic choice, making the crucial wallet connection action globally accessible, as it is a prerequisite for most interactions within the app.
