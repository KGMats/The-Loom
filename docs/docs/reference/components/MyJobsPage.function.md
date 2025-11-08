---
title: MyJobsPage
sidebar_position: 48
---

# MyJobsPage

_Renders the user's personal dashboard for managing their created jobs._

## Overview
This component is the main interface for users to view and manage the jobs they have created. It first checks if a user's wallet is connected; if not, it prompts them to connect. Once connected, it fetches all projects from the API and filters them to display only those associated with the user's wallet address. The page includes a responsive sidebar, tabs to filter the displayed jobs by status (All, Active, Complete, Pending), and a grid of project cards. Clicking a card opens a detailed modal view of the project, from which the user can also delete the project.

## Returns
A React element representing the 'My Jobs' dashboard.

## Dependencies
- `react`
- `wagmi`
- `next/link`
- `app/components/MainSection`
- `app/components/ConnectButton`
- `app/styles/my-jobs.css`
- `app/styles/home.css`

## Example
```typescript
This page is accessed by navigating to the `/my-jobs` URL.
```

## Notes
This is a user guide for the 'My Jobs' page.
- **Initial State**: If your wallet is not connected, the page will prompt you to connect before you can see your jobs.
- **Sidebar & Tabs**: Use the sidebar and the status tabs ('All', 'Active', 'Complete', 'Pending') to filter and find specific jobs you have created.
- **Project Grid**: Your jobs are displayed in a grid of cards.
- **Details Modal**: Clicking on any project card opens a modal with a detailed view of that project's information. From this modal, you also have the option to delete the project.
