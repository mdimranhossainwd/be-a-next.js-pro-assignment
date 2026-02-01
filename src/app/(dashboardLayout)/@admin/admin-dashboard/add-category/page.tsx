export const dynamic = "force-dynamic";

import CategoryForm from "@/components/categoryform";

export default function AddCategoryPage() {
  return (
    <div>
      <div className="text-center font-bold text-3xl py-6">
        <h2>Add to Category</h2>
      </div>
      <CategoryForm />
    </div>
  );
}
