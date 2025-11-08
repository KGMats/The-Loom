---
title: DoAJobPage
sidebar_position: 47
---

# DoAJobPage

_Displays the detailed view of a single job and handles the job acceptance process._

## Overview
This component renders the details of a specific job, which is passed as a JSON string in the 'job' query parameter. It displays the job's description, budget, and hardware/software requirements. The main functionality is the 'Accept Job' flow, which involves a confirmation modal and a call to the `/api/projects/:id/accept` endpoint. Upon successful acceptance, it displays the generated claim slug in another modal, which the user needs to start the job in the desktop client. The component also prevents the job creator from accepting their own job and shows if a job has already been taken.

## Returns
A React element representing the detailed job page.

## Dependencies
- `react`
- `next/navigation`
- `next/link`
- `wagmi`
- `app/components/MainSection`
- `app/styles/do-a-job.css`
- `app/styles/home.css`

## Example
```typescript
This page is accessed by clicking on a job from the marketplace. The job data is passed as a query parameter.
```

## Notes
This is a comprehensive guide for the 'Do a Job' page.
- **Information**: The page displays all critical information about the job so you can decide if you want to take it.
- **Acceptance Process**:
  1. Click 'Accept Job'.
  2. A modal will ask you to confirm.
  3. Upon confirmation, the system will attempt to assign the job to you.
  4. If successful, a second modal will appear with your unique **Job Access Code (slug)**. You MUST save this code to start the job in the desktop client.
- **For Developers**: The component receives the job data via a URL query parameter (`?job=...`). It uses the `useAccount` hook from Wagmi to get the current user's wallet address to send in the 'accept' API call. It manages the state for the two modals (confirmation and slug display) to guide the user through the process.
