import { TutorProfileTable } from "@/components/data-table2";
import { tutorService } from "@/tutor.service";

export default async function MyTutorPage() {
  const { data: profile } = await tutorService.getTutorProfile();
  console.log(profile);

  return (
    <div>
      <div className="py-5 text-3xl font-bold text-center">
        <h2>My Tutor Profile </h2>
      </div>
      <TutorProfileTable tutors={profile} />
    </div>
  );
}
