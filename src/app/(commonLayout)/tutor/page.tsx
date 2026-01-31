"use client";
export const dynamic = "force-dynamic";
import TutorList from "@/components/layout/TutorFiltering";
import { Suspense } from "react";

export default function TutorPage() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="text-center text-gray-500 py-10">Loading...</div>
        }
      >
        <TutorList />
      </Suspense>
    </div>
  );
}
