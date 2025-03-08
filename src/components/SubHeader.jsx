// import React, { useState } from "react";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import { useNavigate, useLocation } from "react-router-dom";

// const districts = [
//   "Bumthang", "Chhukha", "Dagana", "Gasa", "Haa",
//   "Lhuentse", "Mongar", "Paro", "Pemagatshel",
//   "Punakha", "S|Jongkhar", "Samtse", "Sarpang", "Thimphu",
//   "Trashigang", "Trashiyangtse", "Trongsa", "Tsirang", "W|Phodrang", "Zhemgang"
// ];

// const SubHeader = () => {
//   const [startIndex, setStartIndex] = useState(0);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const visibleCount = 11;

//   // Extract selected district from the URL path
//   const selectedDistrict = location.pathname.split("/").pop();

//   const handleScroll = (direction) => {
//     if (direction === "left" && startIndex > 0) {
//       setStartIndex(startIndex - 1);
//     } else if (direction === "right" && startIndex < districts.length - visibleCount) {
//       setStartIndex(startIndex + 1);
//     }
//   };

//   const handleDistrictClick = (district) => {
//     navigate(`/districts/${district.toLowerCase()}`);
//   };

//   return (
//     <div className="flex items-center justify-center space-x-4 py-2 w-full max-w-6xl mx-auto">
//       <button
//         onClick={() => handleScroll("left")}
//         className="p-2 rounded-full hover:bg-gray-200"
//         disabled={startIndex === 0}
//       >
//         <FiChevronLeft size={20} />
//       </button>
//       <div className="flex space-x-4 overflow-hidden w-full justify-center">
//         {districts.slice(startIndex, startIndex + visibleCount).map((district) => {
//           const formattedDistrict = district.toLowerCase();
//           const isActive = formattedDistrict === selectedDistrict;

//           return (
//             <span 
//               key={district} 
//               className={`cursor-pointer hover:text-black ${
//                 isActive ? "font-bold text-black" : "text-gray-500"
//               }`}
//               onClick={() => handleDistrictClick(district)}
//             >
//               {district}
//             </span>
//           );
//         })}
//       </div>
//       <button
//         onClick={() => handleScroll("right")}
//         className="p-2 rounded-full hover:bg-gray-200"
//         disabled={startIndex >= districts.length - visibleCount}
//       >
//         <FiChevronRight size={20} />
//       </button>
//     </div>
//   );
// };

// export default SubHeader;

import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const districts = [
  "Bumthang", "Chhukha", "Dagana", "Gasa", "Haa",
  "Lhuentse", "Mongar", "Paro", "Pemagatshel",
  "Punakha", "Samdrup Jongkhar", "Samtse", "Sarpang", "Thimphu",
  "Trashigang", "Trashiyangtse", "Trongsa", "Tsirang", "Wangdue Phodrang", "Zhemgang"
];

const SubHeader = () => {
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const visibleCount = 11;

  // Redirect to Bumthang if the user is at /districts without selecting anything
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/districts/bumthang", { replace: true });
    }
  }, [location.pathname, navigate]);

  // Extract selected district from the URL path
  const selectedDistrict = location.pathname.includes("/districts/")
    ? location.pathname.split("/").pop().replace(/-/g, " ").toLowerCase()
    : "bumthang";

  const handleScroll = (direction) => {
    if (direction === "left" && startIndex > 0) {
      setStartIndex(startIndex - 1);
    } else if (direction === "right" && startIndex < districts.length - visibleCount) {
      setStartIndex(startIndex + 1);
    }
  };

  const handleDistrictClick = (district) => {
    navigate(`/districts/${district.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <div className="flex items-center justify-center space-x-4 py-2 w-full max-w-6xl mx-auto">
      <button
        onClick={() => handleScroll("left")}
        className={`p-2 rounded-full ${startIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
        disabled={startIndex === 0}
      >
        <FiChevronLeft size={20} />
      </button>
      <div className="flex space-x-4 overflow-hidden w-full justify-center">
        {districts.slice(startIndex, startIndex + visibleCount).map((district) => {
          const formattedDistrict = district.toLowerCase();
          const isActive = formattedDistrict === selectedDistrict;

          return (
            <span 
            key={district} 
            className={`cursor-pointer hover:text-black ${
              district.toLowerCase() === "bumthang"
                ? selectedDistrict === "bumthang"
                  ? "font-bold text-black" // Default bold when no district is selected
                  : "text-gray-500" // Grey when another district is selected
                : isActive 
                  ? "font-bold text-black" 
                  : "text-gray-500"
            }`}
            onClick={() => handleDistrictClick(district)}
          >
            {district}
          </span>
          
          );
        })}
      </div>
      <button
        onClick={() => handleScroll("right")}
        className={`p-2 rounded-full ${
          startIndex >= districts.length - visibleCount ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
        }`}
        disabled={startIndex >= districts.length - visibleCount}
      >
        <FiChevronRight size={20} />
      </button>
    </div>
  );
};

export default SubHeader;
