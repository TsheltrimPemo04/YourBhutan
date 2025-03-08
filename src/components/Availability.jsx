import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { supabase } from "../utils/supabaseClient";
import { useParams,useNavigate } from "react-router-dom";

const Availability = ({ chatbotVisible }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [guestType, setGuestType] = useState("International");
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);
  const [showGuestDetails, setShowGuestDetails] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);
  const [pricePerNight, setPricePerNight] = useState(null);

  useEffect(() => {
    async function fetchAvailability() {
      const { data, error } = await supabase
        .from("homestay")
        .select("availabilitydate,pricepernight")
        .eq("homestayid", id)
        .single();

      if (!error && data?.availabilitydate) {
        setUnavailableDates(data.availabilitydate.map(date => new Date(date)));
        setPricePerNight(data.pricepernight); 
      }
    }

    fetchAvailability();
  }, [id]);

  useEffect(() => {
    const checkAvailability = () => {
      const selectedDates = [];
      let currentDate = new Date(checkInDate);
      while (currentDate <= checkOutDate) {
        selectedDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      const unavailable = selectedDates.some(date => 
        unavailableDates.some(unavailableDate => date.toDateString() === unavailableDate.toDateString())
      );
      setIsAvailable(!unavailable);
    };

    checkAvailability();
  }, [checkInDate, checkOutDate, unavailableDates]);

  const handleAdultChange = (type) => {
    setAdults((prev) => (type === "increment" ? prev + 1 : prev > 1 ? prev - 1 : 1));
  };

  const handleChildrenChange = (type) => {
    setChildren((prev) => (type === "increment" ? prev + 1 : prev > 0 ? prev - 1 : 0));
  };

  const handleSubmit = () => {
    const nights =
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24);
  
    const cleaningFee = 50; // Example fee
    const taxes = pricePerNight * nights * 0.1; // 10% tax
    const grandTotal = pricePerNight * nights + cleaningFee + taxes;
  
    const bookingDetails = {
      homestayid: id, // Pass homestay ID to fetch details later
      guestName: document.getElementById("guestName").value,
      email: document.getElementById("guestEmail").value,
      aboutGuest: document.getElementById("guestAbout").value,
      checkInDate: checkInDate.toLocaleDateString(),
      checkOutDate: checkOutDate.toLocaleDateString(),
      adults,
      children,
      guestType,
      pricePerNight,
      nights,
      cleaningFee,
      taxes,
      grandTotal,
    };
  
    navigate("/districts/:district/bookingsummary", { state: bookingDetails });
  };
 
  return (
    <div className="flex mt-8 space-x-12 relative">
      {/* Calendar Section */}
      <div className={`left ${chatbotVisible ? "w-[55%]" : "w-[60%]"}`}>
        <h1 className="text-[1.2rem] font-semibold">Availability</h1>
        <p className="text-gray-500 mb-4">Select date to check the availability</p>
        <div className="flex space-x-12">
          <div>
            <h1>Checkin</h1>
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              selectsStart
              startDate={checkInDate}
              endDate={checkOutDate}
              minDate={today}
              className="border p-2 rounded-lg"
            />
          </div>
          <div>
            <h1>Checkout</h1>
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              selectsEnd
              startDate={checkInDate}
              endDate={checkOutDate}
              minDate={checkInDate}
              className="border p-2 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Availability Message or Booking Card Section */}
      <div className={`right checkout ${chatbotVisible ? "w-[35%]" : "w-[40%]"}`}>
        {!isAvailable ? (
          <div className="text-center text-red-500 text-lg font-semibold mt-6">
            The host is not available on these days
          </div>
        ) : (
          <div className="flex flex-col gap-6 shadow-lg p-6 rounded-lg bg-white">
          {/* Price Section */}
          <div className="heading flex items-end justify-between">
            <div className="price flex items-end">
              <h1 className="text-2xl font-semibold">{pricePerNight ? `Nu.${pricePerNight}` : "Loading..."}</h1>
              <p className="text-[#6b727f]"> / night</p>
            </div>
          </div>

          {/* Check-in & Check-out Section */}
          <div className="flex flex-col border border-gray-300 rounded-lg">
            <div className="flex justify-between items-start w-full border-b border-gray-300">
              <div className="w-full border-r border-gray-300 p-3">
                <h3 className="uppercase font-bold text-[0.8rem] flex items-center gap-1">
                  🗓️ Check-In
                </h3>
                <p className="text-[#6b727f]">{checkInDate.toLocaleDateString()}</p>
              </div>
              <div className="w-full p-3">
                <h3 className="uppercase font-bold text-[0.8rem] flex items-center gap-1">
                  🗓️ Check-Out
                </h3>
                <p className="text-[#6b727f]">{checkOutDate.toLocaleDateString()}</p>
              </div>
            </div>

            {/* Adults Selection */}
            <div className="flex justify-between items-center border-b border-gray-300 p-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">🧑</span>
                <h3 className="uppercase font-bold text-[0.8rem]">Adults</h3>
              </div>
              <div className="flex gap-2 items-center">
                <button onClick={() => handleAdultChange("increment")} className="w-8 h-8 bg-[#f7f7f7] rounded-lg flex justify-center items-center hover:bg-[#e2e2e2]">➕</button>
                <span className="text-lg font-semibold">{adults}</span>
                <button onClick={() => handleAdultChange("decrement")} className="w-8 h-8 bg-[#f7f7f7] rounded-lg flex justify-center items-center hover:bg-[#e2e2e2]">➖</button>
              </div>
            </div>

            {/* Children Selection */}
            <div className="flex justify-between items-center border-b border-gray-300 p-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">👶</span>
                <h3 className="uppercase font-bold text-[0.8rem]">Children</h3>
              </div>
              <div className="flex gap-2 items-center">
                <button onClick={() => handleChildrenChange("increment")} className="w-8 h-8 bg-[#f7f7f7] rounded-lg flex justify-center items-center hover:bg-[#e2e2e2]">➕</button>
                <span className="text-lg font-semibold">{children}</span>
                <button onClick={() => handleChildrenChange("decrement")} className="w-8 h-8 bg-[#f7f7f7] rounded-lg flex justify-center items-center hover:bg-[#e2e2e2]">➖</button>
              </div>
            </div>

            {/* Guest Type Dropdown */}
            <div className="p-4">
              <h3 className="uppercase font-bold text-[0.8rem] flex items-center gap-1">📱 Guest Type</h3>
              <select value={guestType} onChange={(e) => setGuestType(e.target.value)} className="w-full border rounded-lg p-2 mt-1 text-gray-700">
                <option>International</option>
                <option>Local</option>
              </select>
            </div>
          </div>

          {/* Book Now Button */}
          <div className="reserve_button">
            <button onClick={() => setShowGuestDetails(true)} className="w-full tracking-wider py-3 bg-[#FF6600] text-white rounded-lg transition duration-300 ease-in-out transform hover:bg-[#FF6600]/90 active:scale-[95%]">BOOK NOW</button>
          </div>
        </div>
        )}
        {showGuestDetails && (
       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 mt-12">
          <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg relative">
            <button 
              onClick={() => setShowGuestDetails(false)} 
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold">Guest Details</h2>
            <p className="text-gray-600 mb-4">Please enter your details before booking</p>
            <label className="block mb-2">Name:</label>
            <input id="guestName" type="text" className="w-full border p-2 rounded mb-4" />

            <label className="block mb-2">Email:</label>
            <input id="guestEmail" type="email" className="w-full border p-2 rounded mb-4" />

            <label className="block mb-2">Tell us a bit about yourself:</label>
            <textarea id="guestAbout" className="w-full border p-2 rounded mb-4"></textarea>
            <button 
              onClick={handleSubmit} 
              className="w-full bg-[#FF6600] text-white py-2 rounded"
            >
              Submit
            </button>
          </div>
        </div>
        
          )}
      </div>
    </div>
  );
};

export default Availability;


