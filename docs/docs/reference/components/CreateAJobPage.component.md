---
title: CreateAJobPage
sidebar_position: 8
---

# CreateAJobPage

_A multi-step form for creating a new job._

## Overview
This component provides a step-by-step wizard for users to create a new job. The form is divided into five steps: 1. Job Type Selection, 2. Project Details, 3. Requirements (Hardware and Software), 4. Budget & Assets, and 5. Review. The component uses React state to manage the form data across the different steps. On final submission, it constructs a `FormData` object and sends a POST request to the `/api/projects` endpoint. It also includes error handling and a redirect to the 'My Jobs' page upon successful submission. The page requires the user to be connected with a wallet and will redirect to the home page if the wallet is disconnected.

## Returns
A JSX element that renders the multi-step job creation form.

## Dependencies
- `react`
- `next/navigation`
- `wagmi`
- `../../components/MainSection`
- `../../styles/create-a-job.css`
- `../../styles/home.css`

## Notes
This is a comprehensive guide for the 'Create a New Job' page. This multi-step form walks you through the process of posting a new computational task to the network.
- **Step 1: Job Type:** Select the category of your job.
- **Step 2: Project Details:** Provide a clear title and description.
- **Step 3: Requirements:** Specify the necessary hardware (CPU/GPU) and software dependencies.
- **Step 4: Budget & Assets:** Set your budget and provide links to any required data or files.
- **Step 5: Review:** Double-check all the details before submitting.
Upon submission, your job will be posted to the marketplace. Please note that you must have your wallet connected to create a job.
