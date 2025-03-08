import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import Sidebar from "../../components/Sidebar";

function HostDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        console.error("Error fetching user:", error);
        navigate("/host/login");
        return;
      }

      setUser(data.user);
      await fetchBookings(data.user.id); // Ensure this completes before setting loading false
    }

    fetchUser();
  }, []);

  /** Fetch bookings for homestays owned by the logged-in host */
  async function fetchBookings(userId) {
    if (!userId) {
      setLoading(false); // Prevent infinite loading if userId is missing
      return;
    }

    try {
      console.log("Fetching host details for user:", userId);

      // Step 1: Get HostId from the `host` table using Supabase user ID
      const { data: hostData, error: hostError } = await supabase
        .from("host")
        .select("hostid")
        .eq("hostid", userId) // Ensure `userid` in `host` table matches Supabase `auth.users.id`
        .single();

      if (hostError || !hostData) {
        console.error("Error fetching host details:", hostError);
        setLoading(false);
        return;
      }

      const hostId = hostData.hostid;
      console.log("Found host ID:", hostId);

      // Step 2: Get all homestay IDs for this host
      const { data: homestays, error: homestayError } = await supabase
        .from("homestay")
        .select("homestayid")
        .eq("hostid", hostId);

      if (homestayError || !homestays || homestays.length === 0) {
        console.error("No homestays found for this host:", homestayError);
        setLoading(false);
        return;
      }

      const homeStayIds = homestays.map((home) => home.homestayid);
      console.log("Homestay IDs found:", homeStayIds);

      // Step 3: Get all bookings for these homestays
      const { data: bookingsData, error: bookingsError } = await supabase
        .from("booking")
        .select("bookingid, checkin, checkout, adult, children, guestname, guestemail, homestayid, status")
        .in("homestayid", homeStayIds);

      if (bookingsError) {
        console.error("Error fetching bookings:", bookingsError);
        setLoading(false);
        return;
      }

      setBookings(bookingsData);
      setLoading(false); // ✅ Ensure loading is turned off after fetching
    } catch (error) {
      console.error("Unexpected error fetching bookings:", error);
      setLoading(false);
    }
  }

  /** Handle Accepting or Declining a booking */
  async function handleBookingAction(bookingid, action) {
    const booking = bookings.find((b) => b.bookingid === bookingid);
    if (!booking) return;
  
    const emailBody =
      action === "Accepted"
        ? `Dear ${booking.guestname},\n\nYour booking request has been ACCEPTED! 🎉\nCheck-in: ${booking.checkin}\nCheck-out: ${booking.checkout}\n\nWe look forward to hosting you!\n\nBest,\nYourBhutan Team`
        : `Dear ${booking.guestname},\n\nUnfortunately, your booking request has been DECLINED. 😞\nIf you have any questions, please contact us.\n\nBest,\nYourBhutan Team`;
  
    const emailSubject =
      action === "Accepted" ? "🎉 Booking Confirmed - YourBhutan" : "😞 Booking Declined - YourBhutan";
  
    // ✅ 1. Send Email via API (Replace with your actual API key and sender email)
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer YOUR_RESEND_API_KEY`, // Replace with actual API key
      },
      body: JSON.stringify({
        from: "YourBhutan <noreply@yourbhutan.com>", // Replace with your domain
        to: booking.guestemail,
        subject: emailSubject,
        text: emailBody,
      }),
    });
  
    const emailResult = await response.json();
    if (!response.ok) {
      console.error("❌ Failed to send email:", emailResult);
      alert("Error sending email to guest.");
      return;
    }
  
    console.log("✅ Email sent successfully:", emailResult);
  
    // ✅ 2. Update Booking Status in Supabase
    if (action === "Accepted") {
      const { error } = await supabase
        .from("booking")
        .update({ status: "Accepted" })
        .eq("bookingid", bookingid);
  
      if (error) {
        console.error(`Error updating booking status: ${error.message}`);
      } else {
        fetchBookings(user.id);
      }
    } else if (action === "Declined") {
      const { error } = await supabase
        .from("booking")
        .delete()
        .eq("bookingid", bookingid);
  
      if (error) {
        console.error(`Error deleting booking: ${error.message}`);
      } else {
        fetchBookings(user.id);
      }
    }
  }
  

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Booking Management</h2>
          <div className="flex items-center space-x-2">
            <span className="font-semibold">{user?.email}</span>
          </div>
        </div>

        {/* Booking Table */}
        <table className="w-full bg-white mt-6 overflow-hidden">
          <thead>
            <tr className="text-gray-500 text-left border-b">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Check-in</th>
              <th className="py-3 px-4">Check-out</th>
              <th className="py-3 px-4">Adults</th>
              <th className="py-3 px-4">Children</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">More Details</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.bookingid}>
                <td className="py-3 px-4">{booking.guestname}</td>
                <td className="py-3 px-4">{booking.checkin}</td>
                <td className="py-3 px-4">{booking.checkout}</td>
                <td className="py-3 px-4">{booking.adult}</td>
                <td className="py-3 px-4">{booking.children}</td>
                <td className="py-3 px-4">
                  {booking.status === "Accepted" ? (
                    <span className="text-green-600 font-semibold">Accepted</span>
                  ) : (
                    <>
                      <button 
                        className="bg-[#51CF03] text-white px-3 py-1 rounded-full hover:bg-green-600 mr-2"
                        onClick={() => handleBookingAction(booking.bookingid, "Accepted")}
                      >
                        Accept
                      </button>
                      <button 
                        className="bg-[#FF6600] text-white px-3 py-1 rounded-full hover:bg-red-600"
                        onClick={() => handleBookingAction(booking.bookingid, "Declined")}
                      >
                        Decline
                      </button>
                    </>
                  )}
                </td>
                <td className="px-4 py-3 underline text-[#6E6E6E]">
                  <Link to={`/host/guestdetails/${booking.bookingid}`}>More Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default HostDashboard;

