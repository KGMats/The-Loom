---
title: MarketplacePage
sidebar_position: 46
---

# MarketplacePage

_Renders the main marketplace page for browsing and filtering available jobs._

## Overview
This component fetches all projects from the `/api/projects` endpoint and displays them as a list of available jobs. It provides a comprehensive set of client-side filtering options, including a search bar for keywords, project categories, a reward range (price), and hardware requirements (CPU/GPU). The component manages the state for all filters and applies them to the fetched job list to display only the relevant results. It also handles loading and error states for the API request.

## Returns
A React element representing the marketplace page.

## Dependencies
- `react`
- `next/link`
- `app/components/MainSection`
- `app/styles/marketplace.css`
- `app/styles/home.css`

## Example
```typescript
This page is accessed by navigating to the `/marketplace` URL.
```

## Notes
This is a detailed user guide for the Marketplace page.
- **Filtering**: You can use the search bar, category dropdown, price sliders, and hardware toggles to find jobs that fit your capabilities.
- **Job Listings**: Each job card shows the title, description, category, price, and when it was posted.
- **Viewing Details**: Clicking on any job card will take you to the 'Do a Job' page, where you can see the full details and accept the job.
- **For Developers**: The filtering logic is handled client-side. The component fetches all projects once and then applies the user's filter criteria to the local array of projects. This provides a fast and responsive filtering experience.
