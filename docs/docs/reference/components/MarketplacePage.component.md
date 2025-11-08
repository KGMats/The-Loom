---
title: MarketplacePage
sidebar_position: 7
---

# MarketplacePage

_Displays a list of available jobs with filtering and search functionality._

## Overview
This component serves as the job marketplace, fetching and displaying all available projects from the `/api/projects` endpoint. It provides a user interface with various filtering options, including a search bar, category selection, price range, and hardware requirements (CPU/GPU). The component manages the state for these filters and applies them to the fetched job list. It also handles loading and error states during the data fetching process. Each job is displayed as a card with its title, description, tags, price, and posting date. Clicking on a job card navigates the user to the 'do-a-job' page with the job details.

## Returns
A JSX element that renders the job marketplace.

## Dependencies
- `react`
- `next/link`
- `../components/MainSection`
- `../styles/marketplace.css`
- `../styles/home.css`

## Notes
This guide is for users of the Marketplace page. Here, you can browse all available jobs on The Loom network. Use the search bar and filters to narrow down the list to find jobs that match your skills and hardware. Each job card provides a summary of the project, including its title, description, payment, and creation date. To see more information and to accept a job, simply click on the job card.
