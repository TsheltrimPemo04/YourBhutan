import React from "react";
import { Link } from "react-router-dom";

const FlightCards = ({ data }) => {
  return (
    <div className="card w-80">
      <figure className="rounded-xl h-[285px] overflow-hidden">
        <Link to="/flight/checkout">
          <img
            className="h-full w-full object-cover object-center"
            src={data.images[0]}
            alt={data.altText}
          />
        </Link>
      </figure>
      <Link to="/flight/checkout">
        <div className="card-body pt-2 text-[1rem] text-[#222222] flex flex-col ">
          <div className="flex justify-between items-end mb-1">
            <h2 className="card-name font-semibold text-lg">{data.name}</h2>
            <p className="price text-right">
              <span className="font-medium">{data.price}</span>
            </p>
          </div>
          <p className="text-[#717171] -mb-1">{data.desc}</p>
        </div>
      </Link>
    </div>
  );
};

export default FlightCards;
