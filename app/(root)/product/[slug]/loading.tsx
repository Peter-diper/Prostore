// ProductSkeleton.tsx
const ProductSkeleton = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-5 animate-pulse">
      {/* Image gallery column */}
      <div className="col-span-2">
        <div className="space-y-4">
          <div className="min-h-[75] aspect-square rounded-2xl bg-gray-200 dark:bg-gray-700/50" />
          <div className="flex gap-3">
            <div className="max-w-25 w-24 h-24 rounded-xl bg-gray-200 dark:bg-gray-700/50" />
            <div className="max-w-25 w-24 h-24 rounded-xl bg-gray-200 dark:bg-gray-700/50" />
          </div>
        </div>
      </div>

      {/* Details column */}
      <div className="col-span-2 p-5">
        <div className="flex flex-col gap-6">
          <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-700/50" />
          <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700/50" />
          <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700/50" />
          <div className="h-10 w-24 rounded-full bg-gray-200 dark:bg-gray-700/50" />
        </div>
        <div className="mt-6 space-y-2">
          <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700/50" />
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700/50" />
          <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700/50" />
        </div>
      </div>

      {/* Price/status/CTA card */}
      <div className="rounded-2xl ring-1 ring-foreground/10 h-fit py-2 col-span-1 md:col-start-5">
        <div className="p-4">
          <div className="mb-3 flex justify-between">
            <div className="h-4 w-12 rounded bg-gray-200 dark:bg-gray-700/50" />
            <div className="h-8 w-16 rounded bg-gray-200 dark:bg-gray-700/50" />
          </div>
          <div className="mb-3 flex justify-between">
            <div className="h-4 w-14 rounded bg-gray-200 dark:bg-gray-700/50" />
            <div className="h-5 w-16 rounded-4xl bg-gray-200 dark:bg-gray-700/50" />
          </div>
          <div className="h-9 w-full rounded-sm bg-gray-300 dark:bg-gray-600" />
        </div>
      </div>
    </section>
  );
};

export default ProductSkeleton;
