# GigErn Frontend

A modern React-based frontend application for the GigErn gig worker and store management platform.

## 🏗️ Project Structure

### 📁 Root Files
- **`package.json`** - Project dependencies, scripts, and metadata
- **`vite.config.js`** - Vite build tool configuration
- **`tailwind.config.js`** - Tailwind CSS configuration and custom theme
- **`postcss.config.js`** - PostCSS configuration for Tailwind
- **`eslint.config.js`** - ESLint linting rules and configuration
- **`index.html`** - Main HTML entry point
- **`.gitignore`** - Git ignore patterns

### 📁 src/ (Source Code)

#### 🚀 Core Files
- **`main.jsx`** - Application entry point and React root rendering
- **`App.jsx`** - Main application component with routing configuration

#### 🧩 components/ (Reusable Components)
- **`elements/`** - Basic UI components (Button, Input, Icon, DashboardHeader, DashboardTabs, DocumentsUpload, MetricCard, Select)
- **`AdminProtectedRoutes.jsx`** - Route protection for admin users
- **`UserProtectedRoute.jsx`** - Route protection for authenticated users
- **`Navbar.jsx`** - Main navigation header
- **`Footer.jsx`** - Application footer
- **`ScrollToTop.jsx`** - Scroll-to-top utility component
- **`ErrorBoundary.jsx`** - Error handling wrapper component

#### 🎨 layouts/ (Page Layouts)
- **`AdminLayout.jsx`** - Admin dashboard layout with sidebar navigation
- **`StoreLayout.jsx`** - Store owner dashboard layout
- **`GigLayout.jsx`** - Gig worker dashboard layout
- **`VerifierLayout.jsx`** - Document verifier dashboard layout

#### 📄 pages/ (Page Components)
- **`HomePage/`** - Landing page and marketing content
  - **`components/HowItWorks.jsx`** - How GigErn works section
- **`LoginPage/`** - User authentication pages
- **`RegisterPage/`** - User registration forms
- **`Admin/`** - Admin dashboard pages (AllUsers, GigUsers, GigVerifications, Jobs, Overview, Payments, Reports, Settings, StoreUsers, StoreVerifications, VerificationOversight, Verifications, VerifierManagement)
- **`Store/`** - Store owner management pages
- **`Gig/`** - Gig worker management pages (ActiveJob, Documents, Earnings, JobOffers, Overview, Profile, Progression, ShiftDetail, Shifts, Transactions)
- **`Verifier/`** - Document verification interface
- **Static Pages**: AboutUs, ContactUs, TermsConditions, PrivacyPolicy, NotFound, Unauthorized, AdminLogin, PendingVerification

#### 🔧 contexts/ (React Context)
- **`AuthContext.jsx`** - Global authentication state and user management

#### 🪝 hooks/ (Custom React Hooks)
- **`useAdmin.js`** - Admin role checking and permissions
- **`useAdminData.js`** - Admin data management and mock data
- **`useAuth.js`** - Authentication utilities
- **`useUserManager.js`** - User profile and document management

#### 🌐 services/ (API Services)
- **`authAPI.js`** - Authentication API calls

#### ⚙️ config/ (Configuration)
- **`api.js`** - API base URL and endpoints configuration

#### 🎨 styles/ (Styling)
- **`globals.css`** - Global CSS styles and Tailwind imports
- **`index.css`** - Additional global styles

#### 🛠️ utils/ (Utility Functions)
- **`auditLog.js`** - Audit logging and activity tracking
- **`cn.js`** - Utility function for conditional class names
- **`idGenerator.js`** - ID generation utilities

## 🎯 User Roles & Access

### 👨‍💼 Admin Role
- **Login**: `/admin/login`
- **Dashboard**: `/admin/*`
- **Access**: Full system control, user management, verifications oversight

### 🏪 Store Role
- **Login**: `/login` (store user)
- **Dashboard**: `/store/*`
- **Access**: Shift creation, worker management, delivery tracking

### 🚴 Gig Worker Role
- **Login**: `/login` (gig worker)
- **Dashboard**: `/gig/*`
- **Access**: Job applications, shift management, earnings tracking

### ✅ Verifier Role
- **Login**: `/verify/login`
- **Dashboard**: `/verify/*`
- **Access**: Document verification, audit logging

## 🔐 Authentication Flow

1. **Public Routes**: Homepage, About, Contact, Login, Register
2. **Protected Routes**: All dashboard routes require authentication
3. **Role-Based Access**: Different layouts and features based on user type
4. **Token Management**: JWT tokens stored in localStorage

## 🛣️ Routing Structure

```
/                           - Homepage
/login                      - User login
/register                   - User registration
/admin/*                    - Admin dashboard (admin role)
/store/*                    - Store dashboard (store role)
/gig/*                      - Gig worker dashboard (worker role)
/verify/*                   - Verifier dashboard (verifier role)
/about                      - About page
/contact                    - Contact page
/terms                      - Terms & Conditions
/privacy                    - Privacy Policy
```

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: Theme support with CSS variables
- **Component Library**: Reusable UI components
- **Loading States**: Skeleton loaders and spinners
- **Error Handling**: User-friendly error messages
- **Accessibility**: ARIA labels and keyboard navigation

## 🚀 Development

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## 📦 Key Dependencies

- **React 18** - UI framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library

## 🔧 Configuration Files

- **Vite**: Fast development server and optimized builds
- **Tailwind**: Custom color palette and design system
- **ESLint**: Code quality and consistency
- **PostCSS**: CSS processing pipeline

## 📱 Mobile Compatibility

- Responsive design for all screen sizes
- Touch-friendly interface elements
- Optimized performance for mobile devices
- PWA-ready structure

## 🎯 Key Features

1. **Multi-Role Authentication**: Different experiences for admin, store, gig worker, and verifier
2. **Real-time Updates**: Live status updates for shifts and verifications
3. **Document Management**: Upload and verification system
4. **Dashboard Analytics**: Overview metrics and insights
5. **Audit Trail**: Complete activity logging for compliance

## 🔄 State Management

- **React Context**: Global authentication state
- **Local State**: Component-level state with useState/useReducer
- **LocalStorage**: Persistent user data and preferences
- **API Integration**: RESTful API calls with error handling

## 🐛 Error Handling

- **Error Boundaries**: Catch and display React errors
- **API Errors**: User-friendly error messages
- **Network Issues**: Offline detection and retry logic
- **Form Validation**: Client-side validation with feedback
