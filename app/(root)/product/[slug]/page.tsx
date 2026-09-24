import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProductBySlug } from "@/lib/actions/product.action";
import ProductPrice from "@/components/shared/product/product-price";

import { notFound } from "next/navigation";

const ProductDetailPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="col-span-2">{/* images component */}</div>

          {/*images  */}

          {/* details column  */}
          <div className="col-span2 p-5">
            <div className="flex flex-col gap-6">
              <p>
                {product.banner} {product.category}
              </p>
              <h1 className="h3-bold">{product.name}</h1>
              <p>
                {product.rating.toString()} of {product.numReviews} Reviews
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <ProductPrice
                  value={Number(product.price)}
                  className="w-24 rounded-full bg-green-200 text-green-700 px-5 py-2 text-center "
                />
              </div>
            </div>
            <div className="font-semibold"> Description</div>
            <p>{product.description}</p>
          </div>
          {/* action column */}
          <Card>
            <CardContent className="p-4">
              <div className="mb-2 flex justify-between">
                <div className="">Price</div>
                <div className="">
                  <ProductPrice value={Number(product.price)} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

export default ProductDetailPage;
