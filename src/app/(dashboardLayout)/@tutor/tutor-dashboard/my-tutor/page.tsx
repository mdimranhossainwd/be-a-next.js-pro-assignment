import { TutorProfileTable } from "@/components/data-table2";
import { tutorService } from "@/tutor.service";

export default async function MyTutorPage() {
  const { data: profile } = await tutorService.getTutorProfile();
  console.log(profile);

  return (
    <div>
      <TutorProfileTable tutors={profile} />
    </div>
  );
}
