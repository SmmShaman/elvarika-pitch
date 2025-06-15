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
- June 14, 2025. Implemented complete trilingual system (Norwegian, English, Ukrainian)
- June 14, 2025. Replaced "Lydordbok i Lomma" with "Elvarika" throughout application
- June 14, 2025. Added language switcher with instant translation capability
- June 14, 2025. Professional translations for all content (non-Google Translate)
- June 14, 2025. Persistent language preferences with localStorage
- June 15, 2025. Created comprehensive B2B business landing page based on Ukrainian content structure
- June 15, 2025. Added dual-version architecture: Investor (/") and Business (/business) versions
- June 15, 2025. Implemented AnimatedDemo component with 5-step text-to-audio transformation
- June 15, 2025. Added authentic Norwegian workplace safety vocabulary and contexts
- June 15, 2025. Created bilingual playlist demonstration (Norwegian → Ukrainian/English)
- June 15, 2025. Processed 49 Norwegian workplace safety audio files with Ukrainian translations
- June 15, 2025. Configured Express server to serve audio files from /attached_assets/audio/
- June 15, 2025. Audio system fully operational for Norwegian-Ukrainian language pairs
- June 15, 2025. Updated contact information in footer with authentic details from Vitalii Berbeha CV
- June 15, 2025. Added comprehensive audio playback speed control with visual tempo indicators
- June 15, 2025. Fixed email verification unhandled rejection errors with comprehensive error handling
- June 15, 2025. Integrated NodeMailer with Gmail for free email service (unlimited with App Password)
- June 15, 2025. Added floating navigation with "Elvarika" logo linking to homepage
- June 15, 2025. Expanded Use Cases section with detailed industry-specific content and challenges
- June 15, 2025. Created production setup guide with multiple free email service options
- June 15, 2025. Enhanced demo/production system with fallback modes and proper error handling
- June 15, 2025. Made Business page the main homepage instead of investor version
- June 15, 2025. Simplified navigation to only Elvarika logo (scrolls to top) and language switcher
- June 15, 2025. Updated contact information with authentic data from Vitalii Berbeha CV
- June 15, 2025. Contact details: info@vitalii.no, +47 925 64 334, Hagegata 8 Lena 2850 Norge
- June 15, 2025. Enhanced demo controls: 2-second pauses between steps, click-to-pause on step circles
- June 15, 2025. Language pair selector disabled during demo playback, only active at start/end
- June 15, 2025. Improved step navigation with pause/resume functionality
- June 15, 2025. Updated Use Cases section with comprehensive investor-focused narratives from attached file
- June 15, 2025. Expanded all four industry examples (Logistics, Construction, HoReCa, Agriculture) with detailed scenarios
- June 15, 2025. Added "Result for investor" messaging focusing on measurable business impact and market opportunity
- June 15, 2025. Fixed demo step pause system with dynamic step scheduling instead of fixed timeouts
- June 15, 2025. Implemented real audio duration detection replacing template 3-second durations
- June 15, 2025. Added automatic audio metadata loading for accurate playlist duration display
- June 15, 2025. Implemented cookie-based verification system for persistent demo access
- June 15, 2025. Added automatic access checking on component load via cookies
- June 15, 2025. Users now stay verified for 30 days without re-entering email
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
Project focus: "Lydordbok i Lomma" - text-to-speech application targeting investors
Target audience: Investors interested in accessibility technology and audio-first content
Key messaging: Position as intersection of TTS technology, accessibility needs, and audio content growth
```