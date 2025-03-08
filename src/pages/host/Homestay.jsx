import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import Sidebar from "../../components/Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const dzongkhags = [
  "Bumthang", "Chhukha", "Dagana", "Gasa", "Haa", "Lhuentse", "Mongar", 
  "Paro", "Pema Gatshel", "Punakha", "Samdrup Jongkhar", "Samtse", "Sarpang",
  "Thimphu", "Trashi Yangtse", "Trashigang", "Trongsa", "Tsirang", "Wangdue Phodrang", "Zhemgang"
];

function Homestay() {
  const [user, setUser] = useState(null);
  const [homestay, setHomestay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    facilities: "",
    numbedrooms: "",
    numbeds: "",
    availabilitydate: [],
    location: "",
    googlemapurl: "",
    images: [],
    pricepernight: "",
  });
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        setUser(data.user);
        fetchHomestay(data.user.id); // Fetch homestay only when user is available
      }
    }
    fetchUser();
  }, []);

  async function fetchHomestay(userId) {
    setLoading(true);
    try {
      const { data: hostData, error: hostError } = await supabase
        .from("host")
        .select("hostid")
        .eq("hostid", userId) // Use Supabase's user ID instead of Clerk
        .single();
  
      if (hostError || !hostData) {
        console.error("Error fetching host ID:", hostError);
        setLoading(false);
        return;
      }
  
      const hostId = hostData.hostid;
  
      const { data, error } = await supabase
        .from("homestay")
        .select("*")
        .eq("hostid", hostId)
        .single();
  
      if (error) {
        console.error("Error fetching homestay:", error);
      } else {
        setHomestay(data);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
    setLoading(false);
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleDateChange(date) {
    if (!date) return;
    setFormData(prevState => ({
      ...prevState,
      availabilitydate: [...prevState.availabilitydate, date]
    }));
  }

  function removeDate(index) {
    setFormData(prevState => ({
      ...prevState,
      availabilitydate: prevState.availabilitydate.filter((_, i) => i !== index)
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) return;
  
    const { data: hostData, error: hostError } = await supabase
      .from("host")
      .select("hostid")
      .eq("hostid", user.id) 
      .single();
  
    if (hostError || !hostData) {
      console.error("Error fetching host ID:", hostError);
      return;
    }
  
    const hostId = hostData.hostid;
    
    let imageUrls = [];

    for (const file of imageFiles) {
      const { data, error } = await supabase.storage
        .from("homestay-images")
        .upload(`homestays/${user.id}/${file.name}`, file, { cacheControl: "3600" });

      if (error) {
        console.error("Error uploading image:", error);
      } else {
        console.log("Uploaded file path:", data.path);

        // Get the public URL
        const { data: publicURL } = supabase.storage
          .from("homestay-images")
          .getPublicUrl(data.path);

        console.log("Generated Public URL:", publicURL.publicUrl);
        imageUrls.push(publicURL.publicUrl);
      }
    }
    
    console.log("Final image URLs:", imageUrls);
    
    const { error } = await supabase.from("homestay").insert([
      {
        hostid: hostId,
        name: formData.name,
        description: formData.description,
        facilities: formData.facilities,
        availabilitydate: formData.availabilitydate.map(date => date.toISOString().split("T")[0]),
        location: formData.location,
        googlemapurl: formData.googlemapurl,
        numbedrooms: parseInt(formData.numbedrooms) || 0, // Convert to number and avoid null
        numbeds: parseInt(formData.numbeds) || 0, // Convert to number and avoid null
        images: imageUrls,
        pricepernight: parseFloat(formData.pricepernight) || 0, // Ensure number for price
      },
    ]);
    
  
    if (error) {
      console.error("Error adding homestay:", error);
    } else {
      console.log("Homestay added successfully!");
      fetchHomestay(user.id);
    }
  }

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;


  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-semibold">Homestay Profile</h2>

        {/* ✅ Display Homestay if Exists */}
        {homestay ? (
          <div className="bg-white shadow-lg p-6 rounded-lg space-y-4">
            <h3><span className="text-[#8B8B8B]">Homestay Name:</span> {homestay.name}</h3>
            <p><span className="text-[#8B8B8B]">Location:</span> <a href={homestay.location}>{homestay.location}</a></p>
            <p><span className="text-[#8B8B8B]">Google Map Location:</span> <a href={homestay.googlemapurl} target="_blank" className="text-blue-500">{homestay.googlemapurl}</a></p>
            <p><span className="text-[#8B8B8B]">No of bedrooms:</span> {homestay.numbedrooms} &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[#8B8B8B]">No of beds:</span> {homestay.numbeds}</p>
            <p><span className="text-[#8B8B8B]">Price per night (Nu.):</span> {homestay.pricepernight}</p>
            <p><span className="text-[#8B8B8B]">Facilities:</span> {homestay.facilities}</p>
            <p><span className="text-[#8B8B8B]">Description:</span> {homestay.description}</p>
            <p><span className="text-[#8B8B8B]">Unavailable Dates:</span> {homestay.availabilitydate?.join(", ")}</p>

            {/* ✅ Display Images in Grid */}
            {homestay.images.length > 0 && (
              <div className="mt-8 grid grid-cols-3 gap-4">
                {homestay.images.map((img, index) => (
                  <img key={index} src={img} alt={`Homestay ${index + 1}`} className="w-full h-36 object-cover" />
                ))}
              </div>
            )}
          </div>
        ) : (
          // ✅ If No Homestay, Show Form
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input type="text" name="name" placeholder="Homestay Name" className="w-full border p-2 rounded" value={formData.name} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" className="w-full border p-2 rounded" value={formData.description} onChange={handleChange} required />
          <input type="text" name="facilities" placeholder="Facilities (comma-separated)" className="w-full border p-2 rounded" value={formData.facilities} onChange={handleChange} required />
          <input type="number" name="numbedrooms" placeholder="No of bedrooms" className="w-full border p-2 rounded" value={formData.numbedrooms} onChange={handleChange} required />
          <input type="number" name="numbeds" placeholder="No of beds" className="w-full border p-2 rounded" value={formData.numbeds} onChange={handleChange} required />

          <div>
            <label className="block text-gray-700 font-semibold">Unavailable Dates:</label>
            <DatePicker
              selected={null}
              onChange={(date) => handleDateChange(date)}
              dateFormat="yyyy-MM-dd"
              className="w-full border p-2 rounded"
              placeholderText="Select unavailable dates"
              minDate={new Date()}
            />

            <div className="mt-2 flex flex-wrap gap-2">
              {formData.availabilitydate.map((date, index) => (
                <div key={index} className="flex items-center bg-gray-200 px-2 py-1 rounded">
                  <span>{date.toISOString().split("T")[0]}</span>
                  <button
                    type="button"
                    className="ml-2 text-red-500"
                    onClick={() => removeDate(index)}
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </div>

          <select name="location" value={formData.location} onChange={handleChange} className="w-full border p-2 rounded" required>
            <option value="" disabled>Select Dzongkhag</option>
            {dzongkhags.map((dzongkhag, index) => (
              <option key={index} value={dzongkhag}>{dzongkhag}</option>
            ))}
          </select>
          <input type="text" name="googlemapurl" placeholder="Google Map URL" className="w-full border p-2 rounded" value={formData.googlemapurl} onChange={handleChange} required />


          <input type="file" multiple accept="image/*" onChange={(e) => setImageFiles([...e.target.files])} className="w-full border p-2 rounded" />
          <input type="number" name="pricepernight" placeholder="Price per Night (Nu.)" className="w-full border p-2 rounded" value={formData.pricepernight} onChange={handleChange} required />

          
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Homestay</button>
        </form>
        )}
      </main>
    </div>
  );
}

export default Homestay;

