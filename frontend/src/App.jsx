import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/common/Home";
import Login from "./pages/auth/Login";

import Dashboard from "./pages/student/Dashboard";
import Booking from "./pages/student/Booking";

import Tutors from "./pages/tutors/Tutors";
import TutorDetails from "./pages/tutors/TutorDetails";

import ProtectedRoute from "./routes/ProtectedRoute";

import TutorDashboard from "./pages/tutors/Dashboard";

function App() {

  return (
    <>
      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/tutors"
          element={<Tutors />}
        />

        <Route
          path="/tutors/:id"
          element={<TutorDetails />}
        />

        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
<Route
  path="/tutor/dashboard"
  element={
    <ProtectedRoute>
      <TutorDashboard />
    </ProtectedRoute>
  }
/>
      </Routes>

      <Footer />
    </>
  );
}

export default App;