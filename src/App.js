import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { useState } from "react";
import Contact from "./pages/Contact";
import HomestayList from "./components/HomestayList";
import DistrictLayout from "./components/DistrictLayout"; 
import HomestayDetails from "./components/HomestayDetails";
import HostLogin from "./pages/auth/Login";
import HostSignup from "./pages/auth/Signup";
import HostDashboard from "./pages/host/HostDashboard";
import GuestDetails from "./pages/host/GuestDetails";
import Homestay from "./pages/host/Homestay";
import BookingSummary from "./components/BookingSummary"
import Confirmation from "./components/Confirmation"


function App() {
  const [chatbotVisible, setChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setChatbotVisible(!chatbotVisible);
  };

  return (
    <Routes>
      {/* Auth Pages */}
      <Route path="/host/login" element={<HostLogin />} />
      <Route path="/host/signup" element={<HostSignup />} />

      {/* Host Dashboard */}
      <Route path="/host/dashboard" element={<HostDashboard />} />
      <Route path="/host/guestdetails/:bookingId" element={<GuestDetails />} />
      <Route path="/host/homestay" element={<Homestay />} />

      {/* Layout Wrapper */}
      <Route
        path="/"
        element={
          <Layout onSearch={toggleChatbot} chatbotVisible={chatbotVisible} />
        }
      >
        <Route path="/districts/:district" element={<DistrictLayout />}>
            <Route path="homestays" element={<HomestayList />} />
        </Route>
        <Route path="/districts/:district/homestaydetails/:id" element={<HomestayDetails />} />
        <Route path="/districts/:district/bookingsummary" element={<BookingSummary />} />
        <Route
          path="contact"
          element={<Contact chatbotVisible={chatbotVisible} />}
        />

        <Route path="/confirmation" element={<Confirmation />} />
      </Route>
    </Routes>
  );
}

export default App;
