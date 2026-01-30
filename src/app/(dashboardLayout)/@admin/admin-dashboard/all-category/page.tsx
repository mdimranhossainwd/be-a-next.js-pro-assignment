import { categoryService } from "@/service/category.service";

export default async function CategoryPage() {
  const { data: category } = await categoryService.getAllCategories();
  console.log(category);

  return <div></div>;
}
