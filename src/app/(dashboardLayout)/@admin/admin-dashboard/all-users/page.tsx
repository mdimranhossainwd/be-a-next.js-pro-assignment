import { userService } from "@/service/user.service";

export default async function AllUsersPages() {
  const { data: users } = await userService.getAllUsers();
  console.log(users);

  return <div></div>;
}
