import { getLatestProducts } from "../../lib/actions/product.action";
import ProductList from "../../components/shared/product/product-list";

const HomePage = async () => {
  const latestProduct = await getLatestProducts();

  return (
    <>
      <ProductList data={latestProduct} title="Newest Arrivals" limit={4} />
    </>
  );
};

export default HomePage;
