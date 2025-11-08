---
title: DownloadPage
sidebar_position: 45
---

# DownloadPage

_Renders the download page for the Loom Client application._

## Overview
This component provides a user-friendly interface for downloading the Loom Client. It automatically detects the user's operating system (Mac, Windows, or Linux) and updates the main download button accordingly. It also displays alternative download options for other operating systems. The page is structured as a series of steps explaining how to use the client to submit jobs to the network.

## Returns
A React element representing the download page.

## Dependencies
- `react`
- `app/styles/download.css`
- `app/styles/home.css`
- `app/components/MainSection`

## Example
```typescript
This page is accessed by navigating to the `/download` URL.
```

## Notes
This guide is for users of the Download page. The Loom Client is the desktop application you'll use to perform jobs from the network.
- **Step 1: Download**: The page automatically detects your OS (Mac, Windows, or Linux) and provides the correct download link. If you need a different version, use the alternative links.
- **Step 2: Define & Package**: This step explains how you would prepare a job for execution (this is more for users creating jobs).
- **Step 3: Submit to Network**: This step explains how to submit your work.
The primary feature is the OS detection, which simplifies the process of getting the right client software.
