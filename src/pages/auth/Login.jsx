import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (loginError) {
      if (loginError.message.includes("Invalid login credentials")) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("User does not exist. Please sign up.");
      }
      setLoading(false);
      return;
    }

    console.log("User signed in:", data);
    navigate("/host/dashboard", { replace: true });
  }

  return (
  <div className="bg-gray-100 h-screen">
    {/* Back Button */}
    <div className="flex justify-start p-16">
      <button 
          onClick={() => navigate("/")} // ✅ Navigate back
          className="py-2 px-3 mb-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition cursor-pointer"
        >
          ← Back
      </button>
    </div>
    <div className="flex justify-center items-center">
      <div className="w-96 p-8 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center mb-6">
          <img src="/logo.svg" alt="YourBhutan" className="h-10" />
          <h1 className="tracking-tight text-[1.8rem] font-semibold">
            <span className="text-[#6E6E6E]">Your</span>Bhutan
            </h1>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
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

          <button
            type="submit"
            className="w-full bg-orange-500 text-white px-4 py-2 rounded mt-2"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-gray-500 text-sm mt-2">Forgot your password?</p>
        </form>

        <p className="mt-4 text-center text-sm">
          Haven’t listed your homestay yet? {" "}
          <button
            type="button"
            className="text-orange-500 font-semibold"
            onClick={() => navigate("/host/signup")}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  </div>
  );
}

export default Login;
