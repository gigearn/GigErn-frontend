import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage/HomePage';
import { default as Login } from './pages/LoginPage/LoginPage';
import AdminLogin from './pages/AdminLogin';
import ScrollToTop from './components/ScrollToTop';
import StoreRegistration from './pages/RegisterPage/StoreRegistration';
import GigRegistration from './pages/RegisterPage/GigRegistration';
import AboutUs from './pages/AboutUs/AboutUs';
import TermsConditions from './pages/TermsConditions/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import ContactUs from './pages/ContactUs/ContactUs';
import Register from './pages/RegisterPage/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './pages/NotFound/NotFound';
import Unauthorized from './pages/Unauthorized';
import PendingVerification from './pages/PendingVerification';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/UserProtectedRoute';

// Role-based Protected Routes
import { SuperAdminRoute, VerifierRoute } from './components/AdminProtectedRoutes';

// Store Layout and Pages
import StoreLayout from './layouts/StoreLayout';
import StoreOverview from './pages/Store/Overview';
import StoreShifts from './pages/Store/Shifts';
import StoreCreateShift from './pages/Store/CreateShift';
import StoreShiftDetail from './pages/Store/ShiftDetail';
import StoreDeliveries from './pages/Store/Deliveries';
import StoreCreateDelivery from './pages/Store/CreateDelivery';
import StoreDeliveryDetail from './pages/Store/DeliveryDetail';
import StoreWallet from './pages/Store/Wallet';
import StoreTransactions from './pages/Store/Transactions';
import StoreProfile from './pages/Store/Profile';
import StoreDocuments from './pages/Store/Documents';

// Gig Layout and Pages
import GigLayout from './layouts/GigLayout';
import GigOverview from './pages/Gig/Overview';
import GigJobOffers from './pages/Gig/JobOffers';
import GigActiveJob from './pages/Gig/ActiveJob';
import GigShifts from './pages/Gig/Shifts';
import GigShiftDetail from './pages/Gig/ShiftDetail';
import GigEarnings from './pages/Gig/Earnings';
import GigTransactions from './pages/Gig/Transactions';
import GigDocuments from './pages/Gig/Documents';
import GigProfile from './pages/Gig/Profile';
import GigProgression from './pages/Gig/Progression';

// Admin Layout and Pages
import AdminLayout from './layouts/AdminLayout';

// Verifier Layout and Pages
import VerifierLayout from './layouts/VerifierLayout';
import VerificationQueue from './pages/Verifier/Queue';
import ReviewEntity from './pages/Verifier/Review';
import VerifierHistory from './pages/Verifier/History';
import VerifierLogin from './pages/VerifierLogin';
import AdminOverview from './pages/Admin/Overview';
import AdminVerifications from './pages/Admin/Verifications';
import AdminStoreVerifications from './pages/Admin/StoreVerifications';
import AdminGigVerifications from './pages/Admin/GigVerifications';
import AdminGigUsers from './pages/Admin/GigUsers';
import AdminStoreUsers from './pages/Admin/StoreUsers';
import AdminJobs from './pages/Admin/Jobs';
import AdminPayments from './pages/Admin/Payments';
import AdminReports from './pages/Admin/Reports';
import AdminSettings from './pages/Admin/Settings';
import VerifierManagement from './pages/Admin/VerifierManagement';
import VerificationOversight from './pages/Admin/VerificationOversight';
import AdminAllUsers from './pages/Admin/AllUsers';

function AppContent() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/store/') || location.pathname.startsWith('/gig/') || location.pathname.startsWith('/admin/') || location.pathname === '/worker-dashboard' || location.pathname === '/worker-dashboard';

  return (
    <div className="min-h-screen bg-background">
      {!isDashboardRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/verify/login" element={<VerifierLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/store" element={<StoreRegistration />} />
          <Route path="/register/gig" element={<GigRegistration />} />
          
          {/* Store Routes - Protected */}
          <Route path="/store" element={<Navigate to="/store/overview" replace />} />
          <Route path="/store/*" element={
            <ProtectedRoute requiredRole="store">
              <StoreLayout />
            </ProtectedRoute>
          }>
            <Route path="overview" element={<StoreOverview />} />
            <Route path="shifts" element={<StoreShifts />} />
            <Route path="shifts/create" element={<StoreCreateShift />} />
            <Route path="shifts/:shiftId" element={<StoreShiftDetail />} />
            <Route path="deliveries" element={<StoreDeliveries />} />
            <Route path="deliveries/create" element={<StoreCreateDelivery />} />
            <Route path="deliveries/:deliveryId" element={<StoreDeliveryDetail />} />
            <Route path="wallet" element={<StoreWallet />} />
            <Route path="wallet/transactions" element={<StoreTransactions />} />
            <Route path="profile" element={<StoreProfile />} />
            <Route path="profile/documents" element={<StoreDocuments />} />
          </Route>
          
          {/* Gig Routes - Protected */}
          <Route path="/gig" element={<Navigate to="/gig/overview" replace />} />
          <Route path="/gig/*" element={
            <ProtectedRoute requiredRole="worker">
              <GigLayout />
            </ProtectedRoute>
          }>
            <Route path="overview" element={<GigOverview />} />
            <Route path="job-offers" element={<GigJobOffers />} />
            <Route path="active-job" element={<GigActiveJob />} />
            <Route path="shifts" element={<GigShifts />} />
            <Route path="shifts/:shiftId" element={<GigShiftDetail />} />
            <Route path="earnings" element={<GigEarnings />} />
            <Route path="earnings/transactions" element={<GigTransactions />} />
            <Route path="documents" element={<GigDocuments />} />
            <Route path="profile" element={<GigProfile />} />
            <Route path="progression" element={<GigProgression />} />
          </Route>

          {/* Admin Routes - Super Admin Only */}
          <Route path="/admin" element={<Navigate to="/admin/overview" replace />} />
          <Route path="/admin/*" element={
            <SuperAdminRoute>
              <AdminLayout />
            </SuperAdminRoute>
          }>
            <Route path="overview" element={<AdminOverview />} />
            <Route path="all-users" element={<AdminAllUsers />} />
            <Route path="verifications/overview" element={<VerificationOversight />} />
            <Route path="verifiers" element={<VerifierManagement />} />
            <Route path="verifications" element={<AdminVerifications />}>
              <Route path="stores" element={<AdminStoreVerifications />} />
              <Route path="gigs" element={<AdminGigVerifications />} />
            </Route>
            <Route path="users/gigs" element={<AdminGigUsers />} />
            <Route path="users/stores" element={<AdminStoreUsers />} />
            <Route path="jobs" element={<AdminJobs />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Verifier Routes - Verification Agents Only */}
          <Route path="/verify" element={<Navigate to="/verify/queue" replace />} />
          <Route path="/verify/*" element={
            <VerifierRoute>
              <VerifierLayout />
            </VerifierRoute>
          }>
            <Route path="queue" element={<VerificationQueue />} />
            <Route path="review/:entityType/:entityId" element={<ReviewEntity />} />
            <Route path="history" element={<VerifierHistory />} />
          </Route>
          
          <Route path="/about" element={<AboutUs />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/pending-verification" element={<PendingVerification />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isDashboardRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop/>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
