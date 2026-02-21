import "./index.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Admin components
import { LoginPage, RegisterPage, ForgotPasswordPage, DashboardPage, AdminLayout } from "./admin";
import ChangePasswordPage from "./admin/auth/ChangePasswordPage";
import RegistrationSettings from "./admin/auth/RegistrationSettings";
import AdminRegisterPage from "./admin/auth/RegisterPage";
import AdminRegistrationWrapper from "./admin/auth/AdminRegistrationWrapper";
//// Admin Enquiry Management
import UserEnquiryPage from "./admin/components/consultant/UserEnquiryPage";

import ContactPage from "./components/contact/contactpage";
/// admin service and category management
import AdminServiceManagementPage from "./admin/components/service-management/AdminServiceManagementPage";
import AdminAddCategoryPage from "./admin/components/category-management/AdminAddCategoryPage";
import AdminEditCategoryPage from "./admin/components/category-management/AdminEditCategoryPage";
import AdminEditServicePage from "./admin/components/service-management/AdminEditServicePage";
import AdminAddServicePage from "./admin/components/service-management/AdminAddServicePage"; 




// User components
import UserLoginPage from "./components/auth/UserLoginPage";
import UserRegisterPage from "./components/auth/UserRegisterPage";
import UserDashboard from "./components/auth/UserDashboard";
import ServiceDetailPage from "./components/services/ServiceDetailPage";

// Common components
import HomePage from "./components/home/HomePage";
import CaseStudiesPage from "./components/casestudies/CaseStudiesPage";
import ServicesPage from "./components/services/ServicesPage";
import ServiceCategories from "./admin/components/ServiceCategories";
import ContentPage from "./components/content/ContentPage";
import CareerPage from "./components/career/CareerPage";
import AboutPage from "./components/about/AboutPage";
import RegistrationDisabledPage from "./components/auth/RegistrationDisabledPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Context providers
import { UserAuthProvider, useUserAuth } from "./context/UserAuthContext";
import { AdminAuthProvider, useAdminAuth } from "./context/AdminAuthContext";

function AppRoutes() {
  const { isAuthenticated: isUserAuthenticated, isLoading: isUserLoading } = useUserAuth();
  const { isAuthenticated: isAdminAuthenticated, isLoading: isAdminLoading } = useAdminAuth();

  return (
    <Routes>
      {/* 🌐 PUBLIC PAGES (No Auth Required) */}
      <Route path="/" element={<HomePage />} />
      <Route path="/case-studies" element={<CaseStudiesPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:id" element={<ServiceDetailPage />} />
      <Route path="/service-categories" element={<ServiceCategories />} />
      <Route path="/content" element={<ContentPage />} />
      <Route path="/career" element={<CareerPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* 🔐 USER AUTH PAGES */}
      <Route 
        path="/user/login" 
        element={isUserAuthenticated ? <Navigate to="/user/dashboard" replace /> : <UserLoginPage />} 
      />
      <Route 
        path="/user/register" 
        element={isUserAuthenticated ? <Navigate to="/user/dashboard" replace /> : <UserRegisterPage />} 
      />
      <Route path="/user/forgot-password" element={<ForgotPasswordPage />} />

      {/* 👤 USER DASHBOARD */}
      <Route path="/user" element={
        <ProtectedRoute isAuthenticated={isUserAuthenticated} isLoading={isUserLoading}>
          <UserDashboard />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<UserDashboard />} />
      </Route>

      {/* 🔐 ADMIN AUTH PAGES (Standalone - No Header) */}
      <Route 
        path="/admin/login" 
        element={isAdminAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <LoginPage />} 
      />
      <Route 
        path="/admin/register" 
        element={isAdminAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <AdminRegistrationWrapper />} 
      />
      <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />

      {/* 🧠 ADMIN DASHBOARD (With Admin Layout) */}
      <Route path="/admin" element={
        <ProtectedRoute isAuthenticated={isAdminAuthenticated} isLoading={isAdminLoading}>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="change-password" element={<ChangePasswordPage />} />
        <Route path="registration-settings" element={<RegistrationSettings />} />
        <Route path="enquiries" element={<UserEnquiryPage />} />
        <Route path="services" element={<AdminServiceManagementPage />} />
        <Route path="add-category" element={<AdminAddCategoryPage />} />
        <Route path="edit-category/:id" element={<AdminEditCategoryPage />} />
        <Route path="add-service" element={<AdminAddServicePage />} />
        <Route path="edit-service/:id" element={<AdminEditServicePage />} />
      </Route>

      {/* 🔁 LEGACY REDIRECTS */}
      <Route path="/login" element={<Navigate to="/admin/login" replace />} />
      <Route path="/register" element={<Navigate to="/user/register" replace />} />
      <Route path="/dashboard" element={<Navigate to="/user/dashboard" replace />} />

      {/* ❌ FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <UserAuthProvider>
      <AdminAuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AdminAuthProvider>
    </UserAuthProvider>
  );
}

export default App;
