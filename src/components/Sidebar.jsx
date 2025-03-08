import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaHome, FaSignOutAlt } from 'react-icons/fa';
import { supabase } from '../utils/supabaseClient'; // Import Supabase client

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  /** Handle Logout */
  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      navigate("/host/login", { replace: true }); // Redirect to login after logout
    }
  }

  return (
    <div className='h-screen bg-[#FF6600] w-64 flex flex-col justify-between'>
        <div>
            <div className='flex justify-center mt-6'>
                <img src='/white-logo.svg' alt='Logo' width={40} height={40}/>
                <p className='tracking-tight text-[1.8rem] font-bold text-white'>
                    <span className='font-semibold'>Your</span>Bhutan
                </p>
            </div>
            <nav className='flex mt-12 justify-start'>
                <ul className='w-full'>
                  <li 
                    className={`py-4 text-xl gap-3 text-white flex items-center cursor-pointer px-4 transition-all w-full ${location.pathname === "/host/dashboard" ? "bg-white bg-opacity-50" : "hover:bg-white hover:bg-opacity-50"}`}
                    onClick={() => navigate("/host/dashboard")}
                  >
                    <FaTachometerAlt /> Dashboard
                  </li>
                  <li 
                    className={`py-4 text-xl gap-3 text-white mt-4 cursor-pointer flex items-center px-4 transition-all w-full ${location.pathname === "/host/homestay" ? "bg-white bg-opacity-50" : "hover:bg-white hover:bg-opacity-50"}`}
                    onClick={() => navigate("/host/homestay")}
                  >
                    <FaHome /> Homestay
                  </li>
                </ul>
            </nav>
        </div>
        
        {/* Logout Section */}
        <div className='mb-6 flex justify-start w-full'>
            <button 
              className='flex items-center gap-3 text-xl text-white cursor-pointer hover:bg-white hover:bg-opacity-50 px-4 py-3 w-full'
              onClick={handleLogout}
            >
              <FaSignOutAlt /> Logout
            </button>
        </div>
    </div>
  );
}

export default Sidebar;
