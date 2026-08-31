import { DataBaseData, Product } from "@/db/sample-data";
import ProductCard from "./product-card";

interface ProductList {
  data: DataBaseData;
  title?: string;
  limit?: number;
}

const ProductList = ({ data, title, limit }: ProductList) => {
  const limitedData = limit ? data.products.slice(0, limit) : data.products;

  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4"> {title}</h2>
      {data.products.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {limitedData.map((product: Product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p>No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
