import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

const HomestayList = () => {
  const { district } = useParams();
  const [homestays, setHomestays] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Sort by price
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHomestays() {
      setLoading(true);
      
      // Fetch distinct locations from the homestay table
      const { data: locations, error: locationError } = await supabase
        .from("homestay")
        .select("location")
        .neq("location", "")
        .order("location", { ascending: true });
      
      if (locationError) {
        console.error("Error fetching locations:", locationError);
        setLoading(false);
        return;
      }

      // Check if the requested district exists in the locations list
      const matchingLocations = locations.filter(loc => loc.location.trim().toLowerCase() === district.trim().toLowerCase());
      if (matchingLocations.length === 0) {
        console.log("No homestays found in this district.");
        setHomestays([]);
        setLoading(false);
        return;
      }

      // Fetch homestays based on the identified locations
      const { data, error } = await supabase
        .from("homestay")
        .select("homestayid, name, location, pricepernight, images, availabilitydate")
        .in("location", matchingLocations.map(loc => loc.location));
      
      if (error) {
        console.error("Error fetching homestays:", error);
      } else {
        setHomestays(data);
      }
      setLoading(false);
    }

    fetchHomestays();
  }, [district]);

  // Filter by search term
  const filteredHomestays = homestays.filter(homestay =>
    homestay.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort homestays by price
  const sortedHomestays = filteredHomestays.sort((a, b) =>
    sortOrder === "asc" ? a.pricepernight - b.pricepernight : b.pricepernight - a.pricepernight
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold italic text-center py-4">
        Discover Authentic Homestays in {district}
      </h1>
      
      <p className="text-center italic text-gray-600 mb-6">
        Stay Local. Feel at Home. Explore Bhutan Like a Local.
      </p>

      {/* Search & Sort Controls */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by name"
          className="border px-4 py-2 rounded-md w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="border px-4 py-2 rounded-md"
        >
          {sortOrder === "asc" ? "⬆️ Price: Low to High" : "⬇️ Price: High to Low"}
        </button>
      </div>

      {/* Homestay Listings */}
      {loading ? (
        <p className="text-center text-gray-500">Loading homestays...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedHomestays.length > 0 ? (
            sortedHomestays.map((homestay) => (
              <Link 
                key={homestay.id}
                to={`/districts/${district}/homestaydetails/${homestay.homestayid}`}
                className="border rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={homestay.images && homestay.images.length > 0 ? homestay.images[0] : "/default-image.jpg"} 
                  alt={homestay.name} 
                  className="w-full h-48 object-cover" 
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{homestay.name}</h2>
                  <p className="text-gray-500">{homestay.location}, Bhutan</p>
                  <p className="text-gray-600">Available from: {homestay.availabilitydate ? homestay.availabilitydate[0] : "N/A"}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Nu.{homestay.pricepernight} / night</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">No homestays available in {district} yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomestayList;
