---
title: CreateAJobPage
sidebar_position: 49
---

# CreateAJobPage

_A multi-step form for creating a new job._

## Overview
This component provides a guided, step-by-step process for users to create a new job. The process is broken down into five steps: 1. Select job type. 2. Provide project title and description. 3. Specify hardware and software requirements. 4. Set the budget and provide asset links. 5. Review all the details and submit. The component manages the state for each step and validates the input before allowing the user to proceed. On final submission, it constructs a `FormData` object with all the job details and sends it to the `/api/projects` endpoint. It also handles the loading and error states for the submission.

## Returns
A React element representing the multi-step job creation form.

## Dependencies
- `react`
- `next/navigation`
- `wagmi`
- `app/components/MainSection`
- `app/styles/create-a-job.css`
- `app/styles/home.css`

## Example
```typescript
This page is accessed by navigating to `/my-jobs/create-a-job`.
```

## Notes
This is a detailed user guide for the 'Create a Job' page.
- **Step-by-Step Guide**:
  1. **Job Type**: Choose between 'AI' or 'Graphics'.
  2. **Details**: Give your job a clear title and description.
  3. **Requirements**: Select the necessary hardware (e.g., CPU, GPU specs) and list any software dependencies.
  4. **Budget & Assets**: Set the price you are willing to pay and provide links to any necessary files (datasets, models, etc.).
  5. **Review**: Carefully review all the information before submitting.
- **Submission**: After the final review, your job will be posted to the marketplace.
- **For Developers**: The component maintains the form's state in a single React state object. As the user progresses through the steps, this object is updated. On final submission, this state object is used to build a `FormData` object, which is then sent to the POST `/api/projects` endpoint.
