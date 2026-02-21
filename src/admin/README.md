# Admin Module

This folder contains all admin-related functionality for the ScaleForce application.

## Structure

```
src/admin/
├── auth/                    # Authentication pages
│   ├── LoginPage.jsx       # User login page
│   ├── RegisterPage.jsx    # User registration page
│   └── ForgotPasswordPage.jsx # Password reset page
├── DashboardPage.jsx        # Admin dashboard
├── AdminLayout.jsx          # Layout wrapper for admin pages
├── index.js                # Export barrel for clean imports
└── README.md               # This documentation
```

## Routes

All admin routes are prefixed with `/admin`:

- `/admin/login` - Login page
- `/admin/register` - Registration page  
- `/admin/forgot-password` - Password reset page
- `/admin/dashboard` - Admin dashboard (protected)

## Features

### Authentication
- Modern glass-morphism design with gradient backgrounds
- Form validation with real-time error feedback
- Password strength indicator during registration
- Social login options (Google, GitHub)
- Remember me functionality
- Loading states and user feedback

### Navigation
- Seamless transitions between pages
- Backward compatibility with legacy routes
- Proper routing structure with nested layouts

### Security
- Input validation and sanitization
- Error handling for API calls
- Protected routes for authenticated users
- Mock JWT token system (for demo)

## Usage

```jsx
// Import admin components
import { LoginPage, RegisterPage, DashboardPage } from './admin';

// Routes are automatically configured in App.jsx
```

## Backend Integration

The admin module connects to the following API endpoints:

- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset confirmation
- `GET /api/auth/me` - Get current user (protected)

## Test Credentials

- **Email:** `admin@example.com`
- **Password:** `Admin123!`

## Styling

The admin module uses:
- Tailwind CSS for styling
- Glass morphism effects
- Gradient backgrounds
- Responsive design
- Smooth transitions and animations
