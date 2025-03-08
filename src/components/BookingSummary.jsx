import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const Summary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state || {};
  const [homestay, setHomestay] = useState({ name: "", location: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (bookingDetails.homestayid) {
      fetchHomestayDetails(bookingDetails.homestayid);
    }
  }, [bookingDetails.homestayid]);

  const fetchHomestayDetails = async (homestayid) => {
    const { data, error } = await supabase
      .from("homestay")
      .select("name, location")
      .eq("homestayid", homestayid)
      .single();

    if (data) {
      setHomestay({ name: data.name, location: data.location });
    }
  };

  // Convert string dates to Date objects
  const checkIn = new Date(bookingDetails.checkInDate);
  const checkOut = new Date(bookingDetails.checkOutDate);

  // Calculate number of nights
  const nights = Math.max((checkOut - checkIn) / (1000 * 60 * 60 * 24), 1);

  // Calculate total guests
  const totalGuests = (bookingDetails.adults || 0) + (bookingDetails.children || 0);

  // Calculate total cost based on guests and nights
  const totalPrice = bookingDetails.pricePerNight * totalGuests * nights;
  const cleaningFee = 99; 
  const taxes = totalPrice * 0.08; 
  const grandTotal = totalPrice + cleaningFee + taxes;

  // Handle booking submission
  const handleBooking = async () => {
    setLoading(true);
  
    const { error } = await supabase.from("booking").insert([
      {
        checkin: checkIn.toISOString().split("T")[0], 
        checkout: checkOut.toISOString().split("T")[0], 
        adult: bookingDetails.adults,
        children: bookingDetails.children,
        guesttype: bookingDetails.guestType,
        message: bookingDetails.aboutGuest || "",
        guestname: bookingDetails.guestName,
        guestemail: bookingDetails.email,
        totalprice: grandTotal,
        homestayid: bookingDetails.homestayid,
        status: "Pending",
      },
    ]);
  
    setLoading(false);
  
    if (error) {
      alert("Error booking stay. Please try again.");
    } else {
      navigate("/confirmation"); // Redirect to confirmation page
    }
  };
  
  return (
    <>
     {/* Back Button */}
     <div className="flex justify-start">
      <button 
          onClick={() => navigate(-1)} // ✅ Navigate back
          className="py-2 px-3 mb-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition cursor-pointer"
        >
          ← Back
      </button>
     </div>
     
      <div className="flex justify-center">
        <div className="bg-white px-8 py-4 rounded-2xl shadow-lg max-w-xl w-full">
          <h1 className="text-2xl font-bold text-center mb-6">Booking Summary</h1>

          {/* Homestay Details */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Homestay Details</h2>
            <div className="flex justify-between">
              <p className="text-gray-600">Name: <span className="font-medium">{homestay.name || "Loading..."}</span></p>
              <p className="text-gray-600">Location: <span className="font-medium">{homestay.location || "Loading..."}</span></p>
            </div>
          </div>

          {/* Guest Details */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Guest Details</h2>
            <div className="flex justify-between">
              <p className="text-gray-600">Name: <span className="font-medium">{bookingDetails.guestName}</span></p>
              <p className="text-gray-600">Email: <span className="font-medium">{bookingDetails.email}</span></p>
            </div>
          </div>

          {/* Stay Details */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Stay Details</h2>
            <div className="flex justify-between">
              <p className="text-gray-600">Check-in: <span className="font-medium">{bookingDetails.checkInDate}</span></p>
              <p className="text-gray-600">Check-out: <span className="font-medium">{bookingDetails.checkOutDate}</span></p>
            </div>
            <p className="text-gray-600 mt-2">Guest Type: <span className="font-medium">{bookingDetails.guestType}</span></p>
          </div>

          {/* Payment Details */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Payment Details</h2>
            <div className=" flex items-center bg-gray-100 p-3 rounded-md text-sm mb-4 shadow">
            <img src="/important.svg" className="mr-3"/>
              Payments are made directly to the host upon check-in.
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Nu.{bookingDetails.pricePerNight} x {totalGuests} guest(s) x {nights} night(s)</p>
              <p className="font-medium">Nu.{totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mt-1">
              <p className="text-gray-600">Cleaning Fee</p>
              <p className="font-medium">Nu.{cleaningFee.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mt-1">
              <p className="text-gray-600">Occupancy taxes and fees (8%)</p>
              <p className="font-medium">Nu.{taxes.toFixed(2)}</p>
            </div>
            <hr className="my-3 border-gray-300" />
            <div className="flex justify-between text-lg font-semibold">
              <p>Total</p>
              <p>Nu.{grandTotal.toFixed(2)}</p>
            </div>

            <div className="flex items-center bg-gray-100 p-3 rounded-md text-sm mt-4 shadow">
            <img src="/important.svg" className="mr-3"/>
              If you cancel your stay within 24 hours, no payment is required. However, cancellations after 24 hours may incur a fee to compensate the host.
            </div>
          </div>

          <button 
            onClick={handleBooking} 
            disabled={loading}
            className={`w-full py-3 rounded-lg transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 text-white"}`}
          >
            {loading ? "Processing..." : "BOOK NOW"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Summary;
