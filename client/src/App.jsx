import { Routes, Route, Navigate } from "react-router-dom";
import AppShell from "./components/AppShell";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import RegisterStudent from "./pages/RegisterStudent";
import StudentHome from "./pages/student/StudentHome";
import MenuSkip from "./pages/student/MenuSkip";
import QrScan from "./pages/student/QrScan";
import RateMeal from "./pages/student/RateMeal";
import Payments from "./pages/student/Payments";
import Vault from "./pages/student/Vault";
import AdminHome from "./pages/admin/AdminHome";
import MenuManager from "./pages/admin/MenuManager";
import QrGenerator from "./pages/admin/QrGenerator";
import Students from "./pages/admin/Students";
import Prediction from "./pages/admin/Prediction";
import Feedbacks from "./pages/admin/Feedbacks";
import PaymentsAdmin from "./pages/admin/PaymentsAdmin";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsConditions from "./pages/legal/TermsConditions";
import Faq from "./pages/help/Faq";
import AboutUs from "./pages/AboutUs";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Landing />} />
        <Route path="/login/:kind" element={<Login />} />
        <Route path="/register/student" element={<RegisterStudent />} />
        <Route path="/legal/privacy" element={<PrivacyPolicy />} />
        <Route path="/legal/terms" element={<TermsConditions />} />
        <Route path="/help/faq" element={<Faq />} />
        <Route path="/about" element={<AboutUs />} />

        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/menu"
          element={
            <ProtectedRoute role="student">
              <MenuSkip />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/qr-scan"
          element={
            <ProtectedRoute role="student">
              <QrScan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/rate"
          element={
            <ProtectedRoute role="student">
              <RateMeal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/payments"
          element={
            <ProtectedRoute role="student">
              <Payments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/vault"
          element={
            <ProtectedRoute role="student">
              <Vault />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/menu"
          element={
            <ProtectedRoute role="admin">
              <MenuManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/qr"
          element={
            <ProtectedRoute role="admin">
              <QrGenerator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute role="admin">
              <Students />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/prediction"
          element={
            <ProtectedRoute role="admin">
              <Prediction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/feedbacks"
          element={
            <ProtectedRoute role="admin">
              <Feedbacks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/payments"
          element={
            <ProtectedRoute role="admin">
              <PaymentsAdmin />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
