export const dynamic = "force-dynamic";

import CategoryTable from "@/components/category-table";
import { categoryService } from "@/service/category.service";

export default async function CategoryPage() {
  const { data: category } = await categoryService.getAllCategories();
  console.log(category);

  return (
    <div>
      <CategoryTable categories={category} />
    </div>
  );
}
