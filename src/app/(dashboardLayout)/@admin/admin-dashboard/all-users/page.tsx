import UserTable from "@/components/user-table";
import { userService } from "@/service/user.service";

export default async function AllUsersPages() {
  const { data: users } = await userService.getAllUsers();
  console.log(users);

  return (
    <div>
      <UserTable users={users} />
    </div>
  );
}
