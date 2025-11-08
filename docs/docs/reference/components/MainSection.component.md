---
title: MainSection
sidebar_position: 3
---

# MainSection

_Renders the main header and navigation bar for the application._

## Overview
This React component creates the header of the application. It includes the logo 'The Loom' which links to the homepage, and a navigation bar with links to 'Download', 'My Jobs', and 'Explore Jobs'. It also includes a `CustomConnectButton` component, which is likely used for wallet connection.

## Returns
A JSX element representing the main header and navigation.

## Dependencies
- `react`
- `next/link`
- `./ConnectButton`

## Notes
This document describes the `MainSection` component, explaining its role as the primary navigation header and the purpose of each link and the connect button. The 'Download' link directs users to the Loom Client download page. 'My Jobs' takes them to their personal dashboard to manage created and accepted jobs. 'Explore Jobs' leads to the public marketplace. The integrated `CustomConnectButton` provides a persistent and easily accessible entry point for users to connect their wallet, which is required for most application features.
