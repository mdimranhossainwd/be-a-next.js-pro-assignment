import CategoryCard from "../category-card";

async function getCategories() {
  const res = await fetch("http://localhost:3000/api/v1/categories", {
    cache: "no-store",
  });

  const data = await res.json();
  return data?.data || [];
}

export default async function CategorySection() {
  const categories = await getCategories();

  return (
    <section className="py-10 container mx-auto">
      <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {categories.map((category: any) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
