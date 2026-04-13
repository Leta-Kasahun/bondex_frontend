# bondex_frontend
Bondex Frontend is a modern Next.js CRM interface developed as part of a full-stack web application. Built with TypeScript, Tailwind CSS, Zustand, Axios, Zod validation, and shadcn/ui, it supports multilingual UX (English &amp; Amharic) and integrates seamlessly with the Bondex backend





## 🎥 Demo Video

[![Watch the demo](https://cdn.loom.com/sessions/thumbnails/c3d58de1c16249c1af4263fe1c9f7f73-with-play.gif)](https://www.loom.com/share/c3d58de1c16249c1af4263fe1c9f7f73)
```bash
bondex_frontend/
│
├── src/
│   ├── app/                                 # Next.js App Router - handles routing and page layouts only, no business logic
│   │   ├── (auth)/                          # Route group for authentication pages (login, register, forgot password) - no sidebar
│   │   │   ├── layout.tsx                   # Centered form layout for auth pages
│   │   │   ├── login/                       # Login page route
│   │   │   │   └── page.tsx                 # User login page component
│   │   │   ├── register/                    # Registration page route
│   │   │   │   └── page.tsx                 # New user registration page
│   │   │   └── forgot-password/             # Password reset request route
│   │   │       └── page.tsx                 # Forgot password page component
│   │   │
│   │   ├── (dashboard)/                     # Protected route group for authenticated CRM features - includes sidebar and navbar
│   │   │   ├── layout.tsx                   # Dashboard layout with Sidebar and Navbar
│   │   │   ├── dashboard/                   # Main overview page
│   │   │   │   └── page.tsx                 # Dashboard home with stats and charts
│   │   │   ├── leads/                       # Lead management section
│   │   │   │   ├── page.tsx                 # List of all leads with filters
│   │   │   │   └── [id]/                    # Dynamic route for individual lead
│   │   │   │       └── page.tsx             # Lead detail page with notes and replies
│   │   │   ├── deals/                       # Deal pipeline section
│   │   │   │   └── page.tsx                 # Kanban board for deal stages
│   │   │   ├── notifications/               # User notifications section
│   │   │   │   └── page.tsx                 # List of all notifications
│   │   │   ├── settings/                    # User settings section
│   │   │   │   ├── profile/                 # Profile settings route
│   │   │   │   │   └── page.tsx             # Update name, email, password
│   │   │   │   ├── business/                # Business settings route
│   │   │   │   │   └── page.tsx             # Update business info and logo
│   │   │   │   └── integrations/            # Integration settings
│   │   │   │       ├── telegram/            # Telegram bot connection page
│   │   │   │       │   └── page.tsx         # Connect/disconnect Telegram bot
│   │   │   │       ├── gmail/               # Gmail connection page
│   │   │   │       │   └── page.tsx         # Connect/disconnect Gmail account
│   │   │   │       └── webform/             # Web form embed code page
│   │   │   │           └── page.tsx         # Get embed code for website form
│   │   │   └── admin/                       # Admin-only section
│   │   │       └── dashboard/               # Admin dashboard route
│   │   │           └── page.tsx             # User management and system stats
│   │   │
│   │   ├── (public)/                        # Public pages accessible without authentication
│   │   │   ├── layout.tsx                   # Public layout without sidebar
│   │   │   ├── page.tsx                     # Homepage with business directory
│   │   │   └── business/                    # Public business profile route
│   │   │       └── [id]/                    # Dynamic business ID
│   │   │           └── page.tsx             # Public business profile with contact form
│   │   │
│   │   ├── layout.tsx                       # Root layout with global providers (fonts, metadata)
│   │   ├── globals.css                      # Global styles and Tailwind imports
│   │   └── favicon.ico                      # Browser tab icon
│   │
│   ├── features/                            # Business logic layer - each feature contains its own API, services, hooks, components, and types
│   │   │
│   │   ├── leads/                           # Lead management feature - handles all lead-related operations
│   │   │   ├── services/                    # API calls and business logic for leads
│   │   │   │   ├── lead.api.ts              # HTTP endpoints for leads (GET, POST, PUT, DELETE)
│   │   │   │   ├── lead.service.ts          # Business logic: filtering, transformation, multi-step workflows
│   │   │   │   └── index.ts                 # Barrel export for lead services
│   │   │   ├── hooks/                       # React Query hooks for data fetching and mutations
│   │   │   │   ├── useLeads.ts              # Fetch all leads with caching
│   │   │   │   ├── useLead.ts               # Fetch single lead by ID
│   │   │   │   ├── useCreateLead.ts         # Create lead mutation with cache invalidation
│   │   │   │   ├── useUpdateLead.ts         # Update lead mutation
│   │   │   │   ├── useDeleteLead.ts         # Delete lead mutation
│   │   │   │   └── index.ts                 # Barrel export for lead hooks
│   │   │   ├── components/                  # UI components specific to leads feature
│   │   │   │   ├── LeadTable.tsx            # Table displaying all leads with sorting
│   │   │   │   ├── LeadFilters.tsx          # Filter controls for status, priority, platform
│   │   │   │   ├── LeadDetail.tsx           # Detailed lead view with message and metadata
│   │   │   │   ├── LeadNotes.tsx            # Notes section for lead
│   │   │   │   ├── LeadStatusBadge.tsx      # Colored badge for lead status
│   │   │   │   ├── LeadPriorityBadge.tsx    # Colored badge for lead priority
│   │   │   │   └── index.ts                 # Barrel export for lead components
│   │   │   ├── types/                       # TypeScript interfaces for leads feature
│   │   │   │   ├── lead.types.ts            # Lead, LeadStatus, LeadPriority, CreateLeadInput
│   │   │   │   └── index.ts                 # Barrel export for lead types
│   │   │   └── index.ts                     # Barrel export for entire leads feature
│   │   │
│   │   ├── deals/                           # Deal pipeline feature - manages sales stages from qualified to won/lost
│   │   │   ├── services/                    # API calls and business logic for deals
│   │   │   │   ├── deal.api.ts              # HTTP endpoints for deals
│   │   │   │   ├── deal.service.ts          # Business logic: stage transitions, win rate calculation
│   │   │   │   └── index.ts
│   │   │   ├── hooks/                       # React Query hooks for deals
│   │   │   │   ├── useDeals.ts              # Fetch all deals with filtering
│   │   │   │   ├── useDealPipeline.ts       # Fetch deals organized by stage
│   │   │   │   ├── useUpdateDealStage.ts    # Move deal between stages mutation
│   │   │   │   └── index.ts
│   │   │   ├── components/                  # UI components for deal pipeline
│   │   │   │   ├── DealPipeline.tsx         # Kanban board with columns for each stage
│   │   │   │   ├── DealColumn.tsx           # Single stage column with deal cards
│   │   │   │   ├── DealCard.tsx             # Individual deal card with value and customer
│   │   │   │   └── index.ts
│   │   │   ├── types/                       # TypeScript interfaces for deals
│   │   │   └── index.ts
│   │   │
│   │   ├── auths/                           # Authentication module - handles both admin and user login flows
│   │   │   ├── admin/                       # Admin authentication (password + OTP)
│   │   │   │   ├── services/                # Admin auth API and business logic
│   │   │   │   │   ├── admin.api.ts         # Admin login, verify OTP, logout endpoints
│   │   │   │   │   ├── admin.service.ts     # Admin auth business logic
│   │   │   │   │   └── index.ts
│   │   │   │   ├── hooks/                   # React Query hooks for admin auth
│   │   │   │   │   ├── useAdminLogin.ts     # Step 1: password login to get OTP
│   │   │   │   │   ├── useAdminVerifyOtp.ts # Step 2: verify OTP and get token
│   │   │   │   │   └── index.ts
│   │   │   │   ├── components/              # UI components for admin login
│   │   │   │   │   ├── AdminLoginForm.tsx   # Password entry form
│   │   │   │   │   ├── AdminOtpInput.tsx    # OTP entry form
│   │   │   │   │   └── index.ts
│   │   │   │   └── types/                   # Admin auth TypeScript interfaces
│   │   │   ├── user/                        # Regular user authentication (email + password)
│   │   │   │   ├── services/                # User auth API and business logic
│   │   │   │   │   ├── user.api.ts          # Register, login, reset password endpoints
│   │   │   │   │   ├── user.service.ts      # User auth business logic
│   │   │   │   │   └── index.ts
│   │   │   │   ├── hooks/                   # React Query hooks for user auth
│   │   │   │   │   ├── useLogin.ts          # Email/password login mutation
│   │   │   │   │   ├── useRegister.ts       # New user registration mutation
│   │   │   │   │   ├── useForgotPassword.ts # Request password reset OTP
│   │   │   │   │   ├── useResetPassword.ts  # Reset password with OTP
│   │   │   │   │   └── index.ts
│   │   │   │   ├── components/              # UI components for user auth
│   │   │   │   │   ├── LoginForm.tsx        # Email/password login form
│   │   │   │   │   ├── RegisterForm.tsx     # New user registration form
│   │   │   │   │   ├── ForgotPasswordForm.tsx # Reset request form
│   │   │   │   │   └── index.ts
│   │   │   │   └── types/                   # User auth TypeScript interfaces
│   │   │   └── index.ts
│   │   │
│   │   ├── integrations/                    # External service integrations - Telegram and Gmail
│   │   │   ├── telegram/                    # Telegram bot integration
│   │   │   │   ├── services/                # Telegram API and business logic
│   │   │   │   │   ├── telegram.api.ts      # Connect, disconnect, send reply endpoints
│   │   │   │   │   ├── telegram.service.ts  # Telegram business logic
│   │   │   │   │   └── index.ts
│   │   │   │   ├── hooks/                   # React Query hooks for Telegram
│   │   │   │   │   ├── useTelegram.ts       # Fetch connection status
│   │   │   │   │   ├── useTelegramConnect.ts # Connect bot mutation
│   │   │   │   │   └── index.ts
│   │   │   │   ├── components/              # UI components for Telegram
│   │   │   │   │   ├── TelegramConnect.tsx  # Bot token input and connect button
│   │   │   │   │   ├── TelegramStatus.tsx   # Display connection status and bot username
│   │   │   │   │   └── index.ts
│   │   │   │   └── types/                   # Telegram TypeScript interfaces
│   │   │   ├── gmail/                       # Gmail API integration
│   │   │   │   ├── services/                # Gmail API and business logic
│   │   │   │   │   ├── gmail.api.ts         # Connect, disconnect, send reply endpoints
│   │   │   │   │   ├── gmail.service.ts     # Gmail business logic
│   │   │   │   │   └── index.ts
│   │   │   │   ├── hooks/                   # React Query hooks for Gmail
│   │   │   │   │   ├── useGmail.ts          # Fetch connection status
│   │   │   │   │   ├── useGmailConnect.ts   # OAuth connect mutation
│   │   │   │   │   └── index.ts
│   │   │   │   ├── components/              # UI components for Gmail
│   │   │   │   │   ├── GmailConnect.tsx     # OAuth button to connect Gmail
│   │   │   │   │   ├── GmailStatus.tsx      # Display connected email address
│   │   │   │   │   └── index.ts
│   │   │   │   └── types/                   # Gmail TypeScript interfaces
│   │   │   └── index.ts
│   │   │
│   │   ├── notifications/                   # Notification module - in-app alerts for leads
│   │   │   ├── services/                    # Notification API and business logic
│   │   │   │   ├── notification.api.ts      # Fetch notifications, mark as read endpoints
│   │   │   │   ├── notification.service.ts  # Notification business logic
│   │   │   │   └── index.ts
│   │   │   ├── hooks/                       # React Query hooks for notifications
│   │   │   │   ├── useNotifications.ts      # Fetch notification list with pagination
│   │   │   │   ├── useUnreadCount.ts        # Fetch unread count for badge
│   │   │   │   ├── useMarkAsRead.ts         # Mark single notification as read
│   │   │   │   └── index.ts
│   │   │   ├── components/                  # UI components for notifications
│   │   │   │   ├── NotificationBell.tsx     # Bell icon with unread count badge
│   │   │   │   ├── NotificationList.tsx     # Dropdown or page list of notifications
│   │   │   │   ├── NotificationItem.tsx     # Single notification with read/unread state
│   │   │   │   └── index.ts
│   │   │   ├── types/                       # Notification TypeScript interfaces
│   │   │   └── index.ts
│   │   │
│   │   ├── users/                           # User profile module - manage account settings
│   │   │   ├── services/                    # User profile API and business logic
│   │   │   │   ├── user.api.ts              # Get profile, update name, update email endpoints
│   │   │   │   ├── user.service.ts          # Profile business logic
│   │   │   │   └── index.ts
│   │   │   ├── hooks/                       # React Query hooks for user profile
│   │   │   │   ├── useProfile.ts            # Fetch user profile data
│   │   │   │   ├── useUpdateProfile.ts      # Update name mutation
│   │   │   │   ├── useUpdateEmail.ts        # Request and confirm email change with OTP
│   │   │   │   └── index.ts
│   │   │   ├── components/                  # UI components for user profile
│   │   │   │   ├── ProfileForm.tsx          # Display and edit user name
│   │   │   │   ├── ChangeEmailForm.tsx      # Request email change OTP and confirm
│   │   │   │   └── index.ts
│   │   │   ├── types/                       # User profile TypeScript interfaces
│   │   │   └── index.ts
│   │   │
│   │   ├── public/                          # Public pages logic - business directory and contact forms
│   │   │   ├── services/                    # Public API calls (no authentication)
│   │   │   │   ├── public.api.ts            # List businesses, get business, submit contact endpoints
│   │   │   │   ├── public.service.ts        # Public business logic
│   │   │   │   └── index.ts
│   │   │   ├── hooks/                       # React Query hooks for public pages
│   │   │   │   ├── useBusinesses.ts         # Fetch all businesses for directory
│   │   │   │   ├── useBusiness.ts           # Fetch single business by ID
│   │   │   │   ├── useSubmitContact.ts      # Submit contact form mutation
│   │   │   │   └── index.ts
│   │   │   ├── components/                  # UI components for public pages
│   │   │   │   ├── BusinessCard.tsx         # Card displaying business name and type
│   │   │   │   ├── BusinessSearch.tsx       # Search input for filtering businesses
│   │   │   │   ├── ContactForm.tsx          # Form for name, email, phone, message
│   │   │   │   └── index.ts
│   │   │   ├── types/                       # Public page TypeScript interfaces
│   │   │   └── index.ts
│   │   │
│   │   ├── shared/                          # Shared logic used across multiple features
│   │   │   ├── services/                    # Shared business logic
│   │   │   │   ├── errorHandler.ts          # Centralized error handling utility
│   │   │   │   └── index.ts
│   │   │   ├── hooks/                       # Reusable hooks used across features
│   │   │   │   ├── useDebounce.ts           # Debounce input values for search
│   │   │   │   ├── useLocalStorage.ts       # Persist data to localStorage
│   │   │   │   ├── useMediaQuery.ts         # Responsive breakpoint detection
│   │   │   │   └── index.ts
│   │   │   ├── components/                  # Shared UI components
│   │   │   │   ├── LoadingSpinner.tsx       # Centered loading indicator
│   │   │   │   ├── ErrorBoundary.tsx        # Catch and display React errors
│   │   │   │   ├── EmptyState.tsx           # Empty data placeholder with icon
│   │   │   │   └── index.ts
│   │   │   ├── types/                       # Shared TypeScript interfaces
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts                         # Barrel export for all features
│   │
│   ├── lib/                                 # External library wrappers - ONLY Axios instance and interceptors
│   │   ├── api/
│   │   │   ├── client.ts                    # Axios instance with baseURL, headers, auth interceptors
│   │   │   └── index.ts
│   │   ├── query/
│   │   │   ├── queryClient.ts               # TanStack Query client with default config
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── components/                          # UI Kit - Atomic design with NO business logic
│   │   ├── atoms/                           # Smallest UI building blocks (single responsibility)
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx               # Reusable button with variants (primary, secondary, error)
│   │   │   │   ├── Button.types.ts          # Button props TypeScript interface
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   │   ├── Input.tsx                # Reusable input with label and error
│   │   │   │   ├── Input.types.ts           # Input props TypeScript interface
│   │   │   │   └── index.ts
│   │   │   ├── Badge/
│   │   │   │   ├── Badge.tsx                # Small status indicator with color variants
│   │   │   │   ├── Badge.types.ts           # Badge props TypeScript interface
│   │   │   │   └── index.ts
│   │   │   ├── Avatar/
│   │   │   │   ├── Avatar.tsx               # User profile image placeholder
│   │   │   │   ├── Avatar.types.ts          # Avatar props TypeScript interface
│   │   │   │   └── index.ts
│   │   │   ├── Spinner/
│   │   │   │   ├── Spinner.tsx              # Loading animation indicator
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── molecules/                       # Combinations of atoms forming simple UI patterns
│   │   │   ├── Card/
│   │   │   │   ├── Card.tsx                 # Container with shadow and rounded corners
│   │   │   │   ├── Card.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── Modal/
│   │   │   │   ├── Modal.tsx                # Overlay dialog with close button
│   │   │   │   ├── Modal.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── Table/
│   │   │   │   ├── Table.tsx                # Data table with headers and rows
│   │   │   │   ├── Table.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── Select/
│   │   │   │   ├── Select.tsx               # Dropdown select with options
│   │   │   │   ├── Select.types.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── organisms/                       # Complex UI sections combining multiple molecules
│   │   │   ├── Sidebar/
│   │   │   │   ├── Sidebar.tsx              # Main navigation sidebar with menu items
│   │   │   │   ├── SidebarItem.tsx          # Individual navigation link with active state
│   │   │   │   ├── Sidebar.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── Navbar/
│   │   │   │   ├── Navbar.tsx               # Top bar with logo, search, user menu
│   │   │   │   ├── Navbar.types.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts                         # Barrel export for all UI components
│   │
│   ├── stores/                              # Global state management using Zustand
│   │   ├── authStore.ts                     # Auth state: user, token, isAuthenticated
│   │   ├── uiStore.ts                       # UI state: sidebar collapsed, theme mode
│   │   └── index.ts
│   │
│   ├── providers/                           # React Context Providers for app initialization
│   │   ├── AuthProvider.tsx                 # Provides auth state to entire app
│   │   ├── ThemeProvider.tsx                # Provides dark/light theme
│   │   ├── QueryProvider.tsx                # Provides TanStack Query client
│   │   ├── ToastProvider.tsx                # Provides toast notification system
│   │   └── index.ts                         # Combines all providers into one
│   │
│   ├── hooks/                               # Global React hooks used across multiple features
│   │   ├── useAuth.ts                       # Access auth state and methods (login, logout)
│   │   ├── useTheme.ts                      # Access theme state and toggle
│   │   ├── useToast.ts                      # Show toast notifications from anywhere
│   │   └── index.ts
│   │
│   ├── utils/                               # Pure utility functions - no React, no side effects
│   │   ├── formatters/
│   │   │   ├── date.ts                      # formatDate, relativeTime, isToday
│   │   │   ├── currency.ts                  # formatCurrency (Birr, USD)
│   │   │   ├── phone.ts                     # formatPhoneNumber (Ethiopian format)
│   │   │   └── index.ts
│   │   ├── validators/
│   │   │   ├── email.ts                     # isValidEmail regex check
│   │   │   ├── phone.ts                     # isValidPhoneNumber for Ethiopia
│   │   │   ├── password.ts                  # isStrongPassword (min 8 chars, etc)
│   │   │   └── index.ts
│   │   ├── helpers/
│   │   │   ├── cn.ts                        # className merger for Tailwind
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── config/                              # Environment and app configuration
│   │   ├── env.ts                           # Zod validation for environment variables
│   │   └── index.ts
│   │
│   ├── constants/                           # Fixed values that never change
│   │   ├── routes.ts                        # API and frontend route paths
│   │   ├── colors.ts                        # Color palette constants
│   │   ├── messages.ts                      # Success and error message templates
│   │   ├── leadStatus.ts                    # Lead status options and display names
│   │   ├── leadPriority.ts                  # Lead priority options and display names
│   │   ├── dealStage.ts                     # Deal stage options and order
│   │   └── index.ts
│   │
│   ├── branding/                            # Design assets and theme tokens
│   │   ├── logos/                           # Bondex logo SVG files
│   │   ├── fonts/                           # Custom font files (Inter, Poppins, Noto)
│   │   ├── theme/
│   │   │   └── tokens.ts                    # Design tokens: spacing, radius, shadows
│   │   └── index.ts
│   │
│   ├── types/                               # Global TypeScript interfaces used across features
│   │   ├── api.types.ts                     # ApiResponse, PaginatedResponse, ErrorResponse
│   │   ├── auth.types.ts                    # User, Admin, JwtPayload
│   │   └── index.ts
│   │
│   ├── middleware/                          # Next.js middleware for route protection
│   │   ├── auth.ts                          # Redirect unauthenticated users to login
│   │   └── index.ts
│   │
│   └── workers/                             # Web Workers for browser-side background tasks
│       ├── sync.worker.ts                   # Background data sync without blocking UI
│       ├── notification.worker.ts           # Poll for new notifications in background
│       └── index.ts
│
├── public/                                  # Static assets served directly
│   ├── images/                              # Static images (og-image, hero images)
│   ├── fonts/                               # Fallback font files
│   └── icons/                               # Favicon and app icons
│
├── .env.local                               # Local environment variables (not committed)
├── .gitignore                               # Git ignore rules
├── package.json                             # Dependencies and scripts
├── tailwind.config.ts                       # Tailwind CSS configuration (colors, fonts)
├── tsconfig.json                            # TypeScript compiler options
├── next.config.ts                           # Next.js configuration (rewrites, images)
├── postcss.config.js                        # PostCSS configuration for Tailwind
└── README.md                                # Project documentation
```
