import UserProfile from "@/components/profile";
import { userService } from "@/service/user.service";

export default async function page() {
  const { data: currentUser } = await userService.getCurrentUser();
  console.log(currentUser);

  return (
    <div>
      <UserProfile users={currentUser.data} />
    </div>
  );
}
