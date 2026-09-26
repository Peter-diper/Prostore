// ProductGridSkeleton.tsx
const ProductCardSkeleton = () => {
  return (
    <>
      <div className="w-full p-0 md:max-w-sm rounded-2xl overflow-hidden ring-1 ring-foreground/10 animate-pulse">
        {/* Image */}
        <div className="aspect-square w-full bg-gray-200 dark:bg-gray-700" />

        {/* Content */}
        <div className="p-4 grid gap-4">
          <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="flex-between gap-4">
            <div className="h-4 w-8 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-6 w-16 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    </>
  );
};

const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
