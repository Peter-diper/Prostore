"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="space-y-4">
      <div className="min-h-[75] rounded-2xl overflow-hidden">
        <Image
          src={images[current]}
          alt="product image"
          width={1000}
          height={1000}
          className="min-h-[75] object-cover object-center rounded-2xl hover:scale-110 transition-all duration-200"
        />
      </div>

      <div className="flex gap-3">
        {images.map((image, index) => (
          <button
            onClick={() => {
              setCurrent(index);
            }}
            key={index}
            className={
              "max-w-25 transition-all duration-150 overflow-hidden rounded-xl " +
              cn(
                "border-2 mr-2 cursor-pointer hover:border-orange-600",
                current === index && "border-orange-500",
              )
            }
          >
            <Image
              src={image}
              alt="image"
              width={100}
              height={100}
              className="rounded-xl hover:scale-110 transition-all duration-200  "
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
