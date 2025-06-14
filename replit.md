# Project Architecture Summary

## Overview

This is a full-stack web application built with a modern React frontend and Express.js backend architecture. The project follows a clean separation between client and server code, with shared schemas and TypeScript throughout. It includes a comprehensive UI component library using shadcn/ui with Radix UI primitives and is set up for PostgreSQL database integration via Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with shadcn/ui component system
- **UI Components**: Comprehensive set of accessible components using Radix UI primitives

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Production**: Compiled to JavaScript using esbuild

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Centralized schema definitions in `/shared` directory
- **Validation**: Zod schemas generated from Drizzle schema
- **Current Implementation**: In-memory storage for development with interface for easy database migration

## Key Components

### Directory Structure
```
├── client/               # React frontend application
│   ├── src/
│   │   ├── components/   # UI components (shadcn/ui)
│   │   ├── pages/        # Page components and sections
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities and query client
├── server/               # Express.js backend
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Data storage abstraction layer
│   └── vite.ts          # Vite integration for development
├── shared/               # Shared code between client and server
│   └── schema.ts         # Database schema and validation
└── migrations/           # Database migration files
```

### Data Storage Layer
- **Interface-based Design**: `IStorage` interface allows switching between storage implementations
- **Current Implementation**: `MemStorage` class for in-memory development storage
- **Database Ready**: Drizzle configuration prepared for PostgreSQL integration
- **Schema Validation**: Zod schemas for type-safe data validation

### UI Component System
- **Design System**: shadcn/ui components with "new-york" style variant
- **Accessibility**: All components built on Radix UI primitives for WCAG compliance
- **Theming**: CSS custom properties for consistent theming
- **Responsive**: Mobile-first design with Tailwind CSS

## Data Flow

### Client-Server Communication
1. **API Requests**: Client uses custom `apiRequest` function with automatic error handling
2. **State Management**: TanStack Query manages server state with optimistic updates
3. **Route Handling**: Express.js serves API endpoints under `/api` prefix
4. **Static Assets**: Vite handles static file serving in development

### Development Workflow
1. **Hot Reload**: Vite provides instant feedback for frontend changes
2. **TypeScript**: Shared types ensure consistency between client and server
3. **Error Handling**: Comprehensive error boundaries and logging
4. **Development Tools**: Replit integration with cartographer for debugging

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless driver
- **drizzle-orm**: Type-safe ORM with PostgreSQL support
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router
- **zod**: Runtime type validation

### UI Dependencies
- **@radix-ui/**: Complete set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Fast build tool and dev server
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React app to static assets in `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Production Mode**: Static file serving and API routes combined in single server

### Environment Configuration
- **Development**: Hot reload with Vite middleware integration
- **Production**: Optimized builds with static file serving
- **Database**: Environment variable configuration for PostgreSQL URL
- **Port Configuration**: Configurable port with default 5000

### Replit Integration
- **Auto-deployment**: Configured for Replit's autoscale deployment
- **Module System**: Node.js 20, web, and PostgreSQL 16 modules
- **Development Workflow**: Integrated run commands and port forwarding

## Changelog

```
Changelog:
- June 14, 2025. Initial setup
- June 14, 2025. Migrated from Figma to Replit for "Lydordbok i Lomma" project
- June 14, 2025. Updated landing page content for investor-focused TTS application
- June 14, 2025. Added AudioPlayer component with interactive playlist functionality
- June 14, 2025. Created sections: AudioPlayerSection, InvestorCTASection
- June 14, 2025. Updated HeroSection, StatisticsSection, ContentSection for TTS app
- June 14, 2025. Added interactive demo functionality to AudioPlayer
- June 14, 2025. Created MarketVisualization component with market trend cards
- June 14, 2025. Created TechShowcase component with interactive feature selection
- June 14, 2025. Created CompetitiveAdvantage component with comparison table
- June 14, 2025. Added Navigation component with smooth scrolling
- June 14, 2025. Added Footer component with investor CTA and contact info
- June 14, 2025. Complete investor-focused landing page with 9 major sections
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
Project focus: "Lydordbok i Lomma" - text-to-speech application targeting investors
Target audience: Investors interested in accessibility technology and audio-first content
Key messaging: Position as intersection of TTS technology, accessibility needs, and audio content growth
```