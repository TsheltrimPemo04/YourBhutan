import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import Sidebar from "../../components/Sidebar";

function GuestDetails() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    fetchBookingDetails();
  }, []);

  async function fetchBookingDetails() {
    const { data, error } = await supabase
      .from("booking")
      .select("*")
      .eq("bookingid", bookingId)
      .single();

    if (error) {
      console.error("Error fetching booking details:", error);
    } else {
      setBooking(data);
    }
  }

  if (!booking) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <button 
          className="bg-gray-200 px-4 py-2 rounded-md mb-6"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold">Guest Details</h2>
        
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-6 text-[#535252]">
            <p><strong>Name:</strong> {booking.guestname}</p>
            <p><strong>Email:</strong> {booking.guestemail}</p>
            <p><strong>Check-in:</strong> {booking.checkin}</p>
            <p><strong>Check-out:</strong> {booking.checkout}</p>
            <p><strong>Adults:</strong> {booking.adult}</p>
            <p><strong>Children:</strong> {booking.children}</p>
            <p><strong>Guest Type:</strong> {booking.guesttype}</p>
            <p><strong>Total Price: </strong>Nu.{booking.totalprice}</p>
          </div>
          <div className="mt-6 flex flex-row space-x-2 w-1/2">
            <p><strong>Message:</strong></p>
            <p className="text-gray-600">{booking.message}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default GuestDetails;
