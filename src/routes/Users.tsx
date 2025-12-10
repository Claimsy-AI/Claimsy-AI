import UsersTable from "../components/tables/UsersTable";
import { agencies, users } from "../mockData";

const Users = () => {
  return (
    <div className="space-y-4">
      <UsersTable users={users} agencies={agencies} />
    </div>
  );
};

export default Users;
