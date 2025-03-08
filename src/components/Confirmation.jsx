import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Booking Request Received</h1>
        <p className="text-gray-600 mb-4">
          Thank you for booking with <span className="font-semibold">YourBhutan</span>! Your request has been received and is pending host confirmation.
        </p>

        <img src="/email.svg" alt="Email Icon" className="w-24 mx-auto mb-4" />

        <p className="text-gray-600">
          Our host will confirm within <span className="font-semibold">24hrs</span>, and you'll receive a confirmation email soon.
        </p>

        <button 
          onClick={() => navigate("/")} 
          className="mt-6 bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
