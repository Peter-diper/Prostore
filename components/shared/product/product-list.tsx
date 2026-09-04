import { Product } from "@/lib/actions/product.action";
import ProductCard from "./product-card";

interface ProductList {
  data: any;
  title?: string;
  limit?: number;
}

const ProductList = ({ data, title, limit }: ProductList) => {
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4"> {title}</h2>
      {data.length > 0 ? (
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
