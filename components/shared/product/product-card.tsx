import { Product } from "@/app/types";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductPrice from "./product-price";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 grid justify-center items-center">
        <Link href={`/product/${product.slug}`}>
          <div className="overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              height={300}
              width={300}
              priority
              className="md:hover:scale-105 transition-all duration-150"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 grid gap-4">
        <div className="text-xs">{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-sm font-bold">{product.name}</h2>
        </Link>

        <div className="flex-between gap-4">
          <p>{product.rating} </p>
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className="text-destructive">Out Of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
