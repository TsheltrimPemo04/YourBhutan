import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";

function HostSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    console.log("Supabase Auth User:", data);
    setSuccess(true);
  }

  return (
    <div className="h-screen bg-gray-100">
    {/* Back Button */}
    <div className="flex justify-start p-16">
      <button 
          onClick={() => navigate("/")} // ✅ Navigate back
          className="py-2 px-3 mb-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition cursor-pointer"
        >
          ← Back
      </button>
    </div>

    <div className="flex justify-center items-cente">
      <div className="w-96 p-8 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center mb-6">
          <img src="/logo.svg" alt="YourBhutan" className="h-10" />
          <h1 className="tracking-tight text-[1.8rem] font-semibold">
            <span className="text-[#6E6E6E]">Your</span>Bhutan
            </h1>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && (
          <p className="text-green-500 text-center">Sign-up successful! You can now log in.</p>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white px-4 py-2 rounded mt-2"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already listed your homestay? {" "}
          <button
            type="button"
            className="text-orange-500 font-semibold"
            onClick={() => navigate("/host/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
    </div>

  );
}

export default HostSignup;
