---
title: MyJobsPage
sidebar_position: 9
---

# MyJobsPage

_Displays a user's created and accepted jobs._

## Overview
This component fetches and displays two lists of projects associated with the connected user's wallet address: jobs they have created and jobs they have accepted. It uses the `useAccount` hook to get the user's address and then makes API calls to fetch the relevant data. The page includes a link to create a new job and separates the displayed jobs into 'Created by Me' and 'Accepted by Me' sections. It also handles loading and error states.

## Returns
A JSX element that renders the user's jobs.

## Dependencies
- `react`
- `next/link`
- `wagmi`
- `../components/MainSection`
- `../styles/my-jobs.css`

## Notes
This guide is for users of the 'My Jobs' page. This is your personal dashboard for tracking your activity on The Loom. The page is divided into two main sections: 'Created by Me' lists all the jobs you have posted, while 'Accepted by Me' shows the jobs you are currently working on. From here, you can also easily navigate to the 'Create a New Job' page to post a new task.
