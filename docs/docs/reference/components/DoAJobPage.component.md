---
title: DoAJobPage
sidebar_position: 6
---

# DoAJobPage

_Displays the details of a specific job and allows users to accept it._

## Overview
This component displays the detailed information of a job selected from the marketplace. It retrieves the job data from the URL search parameters. It shows the project's title, description, budget, requirements, and asset links. The page provides an 'Accept Job' button, which, when clicked, shows a confirmation modal. Upon confirmation, it sends a POST request to the `/api/projects/:id/accept` endpoint. If the job is successfully accepted, it displays a modal with a unique, one-time slug for the user to start the job on the desktop app. The page also handles different states, such as when the job is already accepted by the current user or another user.

## Returns
A JSX element that renders the detailed job view.

## Dependencies
- `react`
- `next/navigation`
- `wagmi`
- `next/link`
- `../../components/MainSection`
- `../../styles/do-a-job.css`
- `../../styles/home.css`

## Notes
This guide is for users of the 'Do a Job' page. On this page, you can review all the details of a potential job, including its description, budget, and technical requirements. To accept the job, click the 'Accept Job' button and confirm your choice. After confirmation, you will receive a unique Job Access Code (slug). This code is essential—you will need to enter it into the Loom desktop client to begin working on the job.
