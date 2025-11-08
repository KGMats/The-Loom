---
sidebar_position: 4
---

# Frontend Architecture

The Loom App's frontend is a modern, full-stack application built with `Next.js 14` (App Router), `React 18`, and `TypeScript`, with a strong emphasis on Web3 integration and modularity.

## 1. Core Technologies & Frameworks

*   **Next.js 14 (App Router):** Provides Server-Side Rendering (SSR), Static Site Generation (SSG), API routes, and optimized routing.
*   **React 18:** The foundational UI library for building interactive user interfaces.
*   **TypeScript:** Ensures type safety across the codebase, enhancing maintainability and developer experience.

### Web3 Integration

*   **wagmi:** A collection of React Hooks designed for seamless Ethereum interactions.
*   **RainbowKit:** A user-friendly library that simplifies wallet connection for various Web3 wallets.
*   **viem:** A low-level TypeScript interface for interacting with the Ethereum blockchain.

### Data Fetching & State Management

*   **@tanstack/react-query:** Manages server state, including data caching, synchronization, and background refetching.
*   **Global Context Providers:** `WagmiProvider`, `RainbowKitProvider`, and `QueryClientProvider` (located in `app/providers.tsx`) establish global contexts essential for Web3 operations and efficient data fetching throughout the application.

## 2. Project Structure & Modularity

The project adheres to `Next.js App Router` conventions, promoting a clear and modular structure:

*   `app/` directory: Contains all routes, layouts, and pages, following the App Router's organizational principles.
*   `app/components/`: Houses reusable UI components such as `AuthWallet.tsx`, `ConnectButton.tsx`, and `MainSection.tsx`.
*   `app/api/`: Defines Next.js API routes that serve as backend endpoints (e.g., `jobs/claim/[slug]/route.ts`, `projects/route.ts`).
*   `app/styles/`: Stores styling assets, including global and page-specific CSS files.
*   `shims/`: Contains custom shims or polyfills for compatibility purposes.

## 3. Styling

The frontend employs a hybrid styling approach:

*   **Tailwind CSS:** A utility-first CSS framework used for rapid UI development and consistent styling.
*   **Global CSS (`app/globals.css`):** Defines base styles and global utility classes.
*   **Page-specific CSS (`app/styles/*.css`):** Provides custom styling for individual pages, allowing for granular control over design.

<h2> 4. Routing </h2>

*   **Next.js App Router:** Manages both client-side and server-side navigation using the `next/link` component.
*   **Dynamic Routes:** The application supports dynamic routing through conventions like `[slug]` and `[id]` within API routes, enabling flexible content delivery.

<h2> 5. Build & Configuration </h2>

*   `package.json`: Manages project dependencies and defines various scripts for development, building, and testing.
*   `next.config.mjs`: Configures Next.js-specific settings, including custom Webpack configurations.
*   `tsconfig.json`: Configures TypeScript compiler options and defines path aliases for improved module resolution.

<h2> 6. Backend Interaction (via Next.js API Routes) </h2>

The frontend interacts with backend logic primarily through `Next.js API routes`. These routes abstract the underlying data persistence mechanisms, which likely involve a database such as `sqlite3`.

<h2> Summary of Data Flow and Interaction </h2>

1.  Users interact with `React` components rendered by the frontend.
2.  Web3 interactions (e.g., wallet connections, blockchain transactions) are managed by `wagmi` and `RainbowKit` via global providers.
3.  Client-side data fetching leverages `@tanstack/react-query` to retrieve and manage data from `Next.js API routes`.
4.  `Next.js API routes` process incoming requests, interact with the database, and return the necessary data to the frontend.
5.  Styling is achieved through a combination of `Tailwind CSS`, global CSS, and page-specific CSS.

This architecture promotes a scalable, maintainable, and performant application, well-suited for Web3-enabled experiences.