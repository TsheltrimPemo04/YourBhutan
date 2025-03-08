import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import Availability from "./Availability";

const HomestayDetails = ({ chatbotVisible }) => {
  const { id } = useParams();
  const [homestay, setHomestay] = useState(null);
  const [hostName, setHostName] = useState("");
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    async function fetchHomestayDetails() {
      const { data, error } = await supabase
        .from("homestay")
        .select("homestayid, name, location, googlemapurl, description, numbedrooms, numbeds, facilities, images, hostid")
        .eq("homestayid", id)
        .single();

      if (error) {
        console.error("Error fetching homestay details:", error);
        setLoading(false);
        return;
      }

      setHomestay(data);
      
      // Fetch hostname from the host table using hostid
      if (data.hostid) {
        const { data: hostData, error: hostError } = await supabase
          .from("host")
          .select("hostname")
          .eq("hostid", data.hostid)
          .single();

        if (!hostError && hostData) {
          setHostName(hostData.hostname);
        }
      }
      setLoading(false);
    }

    fetchHomestayDetails();
  }, [id]);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!homestay) return <div className="text-center py-10">Homestay not found.</div>;

  return (
    <div className="mt-[1.5rem] px-[5%]">
      <h1 className="text-[2rem] font-semibold">{homestay.name}</h1>
      <div className="flex mt-1">
        <span className="flex justify-end items-center gap-2">
        <svg
            width="15"
            height="15"
            viewBox="0 0 19 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.31769 14.2916C9.52733 14.1673 9.7881 14.1673 9.99774 14.2916L14.486 16.953C14.9922 17.2532 15.6106 16.7981 15.4747 16.2256L14.292 11.245C14.2341 11.0013 14.3178 10.7457 14.5086 10.5833L18.4371 7.23977C18.8886 6.85543 18.6513 6.11699 18.0603 6.06773L12.8661 5.63478C12.6209 5.61434 12.4068 5.46046 12.3094 5.23449L10.2698 0.506842C10.0383 -0.0299468 9.27715 -0.0299478 9.04558 0.506842L7.00607 5.23449C6.90859 5.46046 6.69456 5.61434 6.44931 5.63478L1.25508 6.06773C0.664128 6.11699 0.426781 6.85543 0.878371 7.23978L4.80687 10.5833C4.99764 10.7457 5.08129 11.0013 5.02341 11.245L3.84077 16.2256C3.70482 16.7981 4.32326 17.2532 4.82943 16.953L9.31769 14.2916Z"
              fill="#222222"
            />
          </svg>
          2 reviews</span>
        <div className="flex items-center gap-2 ml-4">
        <svg
            width="15"
            height="15"
            viewBox="0 0 19 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.5 0C4.26172 0 0 4.26172 0 9.5C0 16.5 9.5 25 9.5 25C9.5 25 19 16.5 19 9.5C19 4.26172 14.7383 0 9.5 0ZM9.5 13.2812C7.26172 13.2812 5.4375 11.457 5.4375 9.21875C5.4375 6.98047 7.26172 5.15625 9.5 5.15625C11.7383 5.15625 13.5625 6.98047 13.5625 9.21875C13.5625 11.457 11.7383 13.2812 9.5 13.2812Z"
              fill="#222222"
            />
          </svg>
          <p className="text-[#6b727f]">{homestay.location}, Bhutan</p>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-2 gap-2 mt-6 rounded-lg overflow-hidden">
        {homestay.images?.length > 0 && (
          <>
            <img src={homestay.images[0]} alt="Homestay" className="col-span-1 w-full h-full object-cover rounded-lg" />
            <div className="grid grid-cols-2 gap-2 col-span-1">
              {homestay.images.slice(1, 5).map((img, index) => (
                <img key={index} src={img} alt={`Room ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Details */}
      <div className={`details flex mt-[2.3rem] ${chatbotVisible ? "flex-col" : ""}`}>
        <div className={`left ${chatbotVisible ? "w-[90%]" : "w-[60%]"}`}>
          <h1 className="text-[1.2rem] font-semibold">Entire place hosted by {hostName || "Owner"}</h1>
          <div className="flex flex-col gap-1 mt-5 pb-[2rem]">
            <div className="flex justify-start gap-8">
              <div className="flex items-center">
                <span className="w-1 h-1 bg-black rounded-full mr-1"></span>
                <p className="text-[#222222]">{homestay.numbedrooms} bedrooms</p>
              </div>

              <div className="flex items-center">
                <span className="w-1 h-1 bg-black rounded-full mr-1"></span>
                <p className="text-[#222222]">{homestay.numbeds} beds</p>
              </div>
            </div>
          </div>

          {/* About */}
          <div className={`overview transition-all ease-in-out duration-300 ${showMore ? "line-clamp-none" : "line-clamp-4"}`}>
            <h1 className="text-[1.2rem] font-semibold">About</h1>
            <p className="text-[#222222] mt-3">{homestay.description}</p>
          </div>
          <button className="text-black underline mt-2 cursor-pointer" onClick={toggleShowMore}>
            {showMore ? "Show Less" : "Show More"}
          </button>

          {/* Facilities */}
          <div className="facilities flex flex-col gap-5 pb-[2rem] mt-[2.5rem]">
            <h1 className="text-[1.2rem] font-semibold">Facilities</h1>
            <ul className="list-disc pl-5">
              {homestay.facilities?.split(",").map((facility, index) => (
                <li key={index} className="text-[#6b727f]">{facility.trim()}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Google Map */}
        <div className={`right checkout flex justify-center items-center ${chatbotVisible ? "w-[70%] mt-10" : "w-[40%] ml-[10%]"}`}>
          <iframe
            src={homestay.googlemapurl}
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <Availability />
    </div>
  );
};

export default HomestayDetails;
