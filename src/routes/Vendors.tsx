import VendorsTable from "../components/tables/VendorsTable";
import { claims, vendors } from "../mockData";

const Vendors = () => {
  return (
    <div className="space-y-4">
      <VendorsTable vendors={vendors} claims={claims} />
    </div>
  );
};

export default Vendors;
