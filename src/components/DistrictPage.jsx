import { useParams } from "react-router-dom";

const districtData = {
  bumthang: {
    title: "WELCOME TO BUMTHANG",
    description: "Bumthang, the spiritual heartland of Bhutan, is home to ancient temples and monasteries.",
  },
  chhukha: {
    title: "WELCOME TO CHHUKHA",
    description: "A commercial hub with Bhutan's largest hydropower projects and stunning valleys.",
  },
  dagana: {
    title: "WELCOME TO DAGANA",
    description: "A land of lush greenery, traditional villages, and deep cultural heritage.",
  },
  gasa: {
    title: "WELCOME TO GASA",
    description: "Home to the beautiful Gasa Dzong and the famous hot springs (Gasa Tshachu).",
  },
  haa: {
    title: "WELCOME TO HAA",
    description: "A picturesque valley known for its pristine nature and traditional culture.",
  },
  lhuntse: {
    title: "WELCOME TO LHUNTSE",
    description: "A remote and spiritual place famous for weaving and towering cliffs.",
  },
  mongar: {
    title: "WELCOME TO MONGAR",
    description: "A gateway to Eastern Bhutan, known for its beautiful landscapes and rich culture.",
  },
  paro: {
    title: "WELCOME TO PARO",
    description: "Gateway to Bhutan with stunning landscapes and the iconic Tiger’s Nest Monastery.",
  },
  pemagatshel: {
    title: "WELCOME TO PEMAGATSHEL",
    description: "Famous for its music, crafts, and unique rock formations.",
  },
  punakha: {
    title: "WELCOME TO PUNAKHA",
    description: "Famous for the majestic Punakha Dzong and its warm valley climate.",
  },
  samdrupjongkhar: {
    title: "WELCOME TO SAMDRUP JONGKHAR",
    description: "The gateway to Bhutan’s southeast, known for its vibrant market and cultural diversity.",
  },
  samtse: {
    title: "WELCOME TO SAMTSE",
    description: "A blend of Bhutanese and Nepalese cultures, rich in agricultural land.",
  },
  sarpang: {
    title: "WELCOME TO SARPANG",
    description: "A tropical region with rich biodiversity and vast plains.",
  },
  thimphu: {
    title: "WELCOME TO THIMPHU",
    description: "The capital city of Bhutan, blending tradition with modernity.",
  },
  trashigang: {
    title: "WELCOME TO TRASHIGANG",
    description: "The largest district in Bhutan, famous for its festivals and breathtaking landscapes.",
  },
  trashiyangtse: {
    title: "WELCOME TO TRASHIYANGTSE",
    description: "Renowned for the Chorten Kora and fine traditional handicrafts.",
  },
  trongsa: {
    title: "WELCOME TO TRONGSA",
    description: "The historical center of Bhutan, home to the stunning Trongsa Dzong.",
  },
  tsirang: {
    title: "WELCOME TO TSIRANG",
    description: "A green paradise with rolling hills, rivers, and rich agriculture.",
  },
  wangduephodrang: {
    title: "WELCOME TO WANGDUE PHODRANG",
    description: "Known for its stunning Dzong and gateway to central Bhutan.",
  },
  zhemgang: {
    title: "WELCOME TO ZHEMGANG",
    description: "Famous for its wildlife, bamboo crafts, and rich Buddhist heritage.",
  },
};

const DistrictPage = () => {
  const { district } = useParams();
  const formattedDistrict = district.replace(/\s+/g, "").toLowerCase(); 
  const imageUrl = `/dzongkhags/${formattedDistrict}.jpg`;

  const districtInfo = districtData[formattedDistrict] || {
    title: `WELCOME TO ${district.toUpperCase()}`,
    description: `Explore the beauty and culture of ${district}.`,
  };

  return (
    <div className="relative w-full h-full">
      {/* Background Image */}
      <img 
        src={imageUrl} 
        alt={district} 
        className="w-full h-[600px] object-cover"
      />

      {/* Overlay and Centered Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50 text-center px-4">
        <h1 className="text-5xl font-bold">{districtInfo.title}</h1>
        <p className="mt-4 text-xl italic">{districtInfo.description}</p>
      </div>
    </div>
  );
};

export default DistrictPage;
