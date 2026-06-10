import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './store';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import EmailVerify from './pages/EmailVerify';
import CompanyInfo from './pages/CompanyInfo';
import PlanSelect from './pages/PlanSelect';
import Checkout from './pages/Checkout';
import AccountCreated from './pages/AccountCreated';
import Dashboard from './pages/Dashboard';
import ClientDashboard1 from './pages/ClientDashboard1';
import ClientDashboard2 from './pages/ClientDashboard2';
import ClientDashboard3 from './pages/ClientDashboard3';
import ExpertOnboarding from './pages/ExpertOnboarding';

function RequireAuth({ children }) {
  return store.getUser() ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"               element={<SignUp />} />
        <Route path="/signin"         element={<SignIn />} />
        <Route path="/verify"         element={<RequireAuth><EmailVerify /></RequireAuth>} />
        <Route path="/company"        element={<RequireAuth><CompanyInfo /></RequireAuth>} />
        <Route path="/expert-onboarding" element={<RequireAuth><ExpertOnboarding /></RequireAuth>} />
        <Route path="/plan"           element={<RequireAuth><PlanSelect /></RequireAuth>} />
        <Route path="/checkout"       element={<RequireAuth><Checkout /></RequireAuth>} />
        <Route path="/account-created" element={<RequireAuth><AccountCreated /></RequireAuth>} />
        <Route path="/dashboard"           element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/client-dashboard-1"  element={<RequireAuth><ClientDashboard1 /></RequireAuth>} />
        <Route path="/client-dashboard-2"  element={<RequireAuth><ClientDashboard2 /></RequireAuth>} />
        <Route path="/client-dashboard-3"  element={<RequireAuth><ClientDashboard3 /></RequireAuth>} />
        <Route path="*"               element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
