import { Product } from "../../../db/sample-data";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader } from "@/components/ui/card";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 items-center">
        <link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            height={300}
            width={300}
            property
          />
        </link>
      </CardHeader>
    </Card>
  );
};

export default ProductCard;
