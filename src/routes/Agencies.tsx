import AgenciesTable from "../components/tables/AgenciesTable";
import { agencies, claims } from "../mockData";

const Agencies = () => {
  return (
    <div className="space-y-4">
      <AgenciesTable agencies={agencies} claims={claims} />
    </div>
  );
};

export default Agencies;
