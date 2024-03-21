import { notFound } from "next/navigation";
import { initialData } from "@/seed/seed";
import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";

const seedProducts = initialData.products;

interface Props {
  params: {
    id: Category;
  };
}

function CategoryPage({ params }: Props) {
  const { id } = params;
  const products = seedProducts.filter((product) => product.gender === id);

  const labels: Record<Category, string> = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños/as",
    unisex: "Unisex",
  };

  // if (id === "kids") {
  //   notFound();
  // }
  return (
    <>
      <Title
        title={`${labels[id]}`}
        subtitle={`Todos los productos para ${labels[id]}`}
        className="mb-2"
      />

      <ProductGrid products={products} />
    </>
  );
}

export default CategoryPage;
