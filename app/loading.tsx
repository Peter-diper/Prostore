import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="w-full border-b">
        <div className="wrapper flex-between h-16">
          {/* Logo */}
          <div className="flex-start">
            <div className="flex-start">
              <Skeleton className="h-12 w-12 rounded-md" />

              <Skeleton className="ml-3 hidden h-7 w-28 lg:block" />
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Skeleton className="h-9 w-9 rounded-4xl" />

            {/* Cart */}
            <Skeleton className="h-9 w-20 rounded-4xl" />

            {/* Sign In */}
            <Skeleton className="h-9 w-24 rounded-4xl" />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="wrapper flex-1 py-8">
        <Skeleton className="mb-8 h-9 w-40" />

        <div className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-4/6" />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="flex-center p-5">
          <Skeleton className="h-5 w-64" />
        </div>
      </footer>
    </div>
  );
}
