---
title: The Loom
sidebar_position: 18
---

# The Loom

_A decentralized supercomputer for AI models and 3D rendering._

## Overview
The Loom is a Next.js application that facilitates a decentralized marketplace for computational tasks. Users can submit jobs (e.g., AI model training, 3D rendering) with specific requirements and a budget. Other users with idle hardware can then accept and complete these jobs to earn rewards. The application uses a SQLite database to store project and job data, and it integrates with Ethereum wallets for authentication and transactions using RainbowKit and Wagmi. The frontend is built with React and TypeScript, and the backend API is implemented using Next.js API routes.

## Dependencies
- `next`
- `react`
- `sqlite3`
- `wagmi`
- `@rainbow-me/rainbowkit`
- `@tanstack/react-query`

## Notes
This document provides a high-level overview of The Loom project. Its core purpose is to create a peer-to-peer marketplace for computational power.
- **User Flows**:
  1. **Job Creation**: A user (requester) submits a job with a budget and technical requirements.
  2. **Marketplace**: Other users (providers) browse available jobs.
  3. **Job Acceptance**: A provider accepts a job, locking it.
  4. **Execution & Payment**: The provider completes the job and receives the payment.
- **Key Technologies**:
  - **Frontend**: Next.js (React)
  - **Backend**: Next.js API Routes
  - **Database**: SQLite
  - **Blockchain**: Wagmi and RainbowKit for Ethereum wallet integration.
