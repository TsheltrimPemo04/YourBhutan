import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

const ImageSlider = () => {
  const slides = [
    {
      url: "https://visaindex.s3-accelerate.amazonaws.com/wp-content/uploads/2023/05/08151048/Bhutan.webp",
      title: "Punakha",
    },
    {
      url: "https://www.breathebhutan.com/wp-content/uploads/2019/09/Enjoy-the-Flight-to-Bhutan.jpg",
      title: "DrukAir",
    },
    {
      url: "https://static2.tripoto.com/media/filter/tst/img/371913/TripDocument/1537266228_bhutan_4.jpg",
      title: "Paro",
    },
    {
      url: "https://www.bhutanairlines.bt/assets/galleries/76/99_aircraft.jpg",
      title: "Paro",
    },
    {
      url: "https://scontent.fpbh1-1.fna.fbcdn.net/v/t31.18172-8/11073232_784570311662509_5771057690774322566_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=19026a&_nc_ohc=zcM2hcfdkF4AX9sJYsJ&_nc_ht=scontent.fpbh1-1.fna&oh=00_AfB33G3r8GIQjoKwVmhTxMXg2pSdnlQP-yD1_oqm6vbPzA&oe=65300265",
      title: "Bhutan Air",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="max-w-[1400px] h-[580px] w-full m-auto py-16 px-4 relative group">
      <div
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
      ></div>
      {/* Left Arrow */}
      <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 group-hover:bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 group-hover:bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>

      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            className="text-2xl cursor-pointer"
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
