import { Outlet, useParams } from "react-router-dom";
import DistrictPage from "./DistrictPage";
import HomestayList from "./HomestayList";

const DistrictLayout = () => {
  const { district } = useParams();

  return (
    <div>
      <DistrictPage />
      <HomestayList />
      <Outlet /> 
    </div>
  );
};

export default DistrictLayout;
