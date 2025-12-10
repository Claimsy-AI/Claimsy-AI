import { Agency, User } from "../../types";

interface UsersTableProps {
  users: User[];
  agencies: Agency[];
}

const UsersTable = ({ users, agencies }: UsersTableProps) => {
  const agencyMap = Object.fromEntries(agencies.map((a) => [a.id, a.name]));

  return (
    <div className="panel rounded-2xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-base text-left text-main">
          <thead className="text-sm uppercase tracking-wide text-main bg-[var(--card-muted)] border-b border-[var(--border)]">
            <tr>
              <th scope="col" className="px-4 py-3">
                Full name
              </th>
              <th scope="col" className="px-4 py-3">
                Email
              </th>
              <th scope="col" className="px-4 py-3">
                Role
              </th>
              <th scope="col" className="px-4 py-3">
                Agency
              </th>
              <th scope="col" className="px-4 py-3">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-800/60 hover:bg-slate-800/50 transition-colors">
                <td className="px-4 py-3 font-medium text-main">{user.full_name}</td>
                <td className="px-4 py-3 text-main">{user.email}</td>
                <td className="px-4 py-3 capitalize text-main">{user.role.replace("_", " ")}</td>
                <td className="px-4 py-3 text-main">{user.agency_id ? agencyMap[user.agency_id] : "—"}</td>
                <td className="px-4 py-3 text-main">{new Date(user.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
