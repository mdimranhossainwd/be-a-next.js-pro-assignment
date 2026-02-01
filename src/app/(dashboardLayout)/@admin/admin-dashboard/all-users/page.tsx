export const dynamic = "force-dynamic";

import UserTable from "@/components/user-table";
import { userService } from "@/service/user.service";

export default async function AllUsersPages() {
  const { data: users } = await userService.getAllUsers();
  console.log(users);

  return (
    <div>
      <div className="py-5 text-3xl font-bold text-center">
        <h2>All User Management </h2>
      </div>
      <UserTable users={users} />
    </div>
  );
}
