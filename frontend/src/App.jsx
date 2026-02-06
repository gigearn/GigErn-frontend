import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import { default as Login } from './pages/LoginPage/LoginPage';
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

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/store" element={<StoreRegistration />} />
            <Route path="/register/gig" element={<GigRegistration />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
