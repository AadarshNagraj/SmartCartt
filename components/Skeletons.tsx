export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border/50 overflow-hidden bg-white animate-pulse">
      <div className="aspect-square bg-secondary" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-3 bg-secondary rounded w-1/3" />
        <div className="h-4 bg-secondary rounded w-4/5" />
        <div className="h-3 bg-secondary rounded w-1/2" />
        <div className="flex justify-between items-center mt-2">
          <div className="h-6 bg-secondary rounded w-16" />
          <div className="h-8 bg-secondary rounded-full w-20" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square rounded-2xl bg-secondary" />
        <div className="flex flex-col gap-4">
          <div className="h-4 bg-secondary rounded w-1/4" />
          <div className="h-10 bg-secondary rounded w-3/4" />
          <div className="h-8 bg-secondary rounded w-1/3" />
          <div className="h-px bg-secondary" />
          <div className="h-4 bg-secondary rounded w-full" />
          <div className="h-4 bg-secondary rounded w-5/6" />
          <div className="h-4 bg-secondary rounded w-4/5" />
          <div className="h-14 bg-secondary rounded-full mt-4" />
        </div>
      </div>
    </div>
  );
}

export function CollectionCardSkeleton() {
  return (
    <div className="h-80 rounded-2xl bg-secondary animate-pulse" />
  );
}

export function CartLineSkeleton() {
  return (
    <div className="flex gap-4 py-6 border-b border-border/50 animate-pulse">
      <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-xl bg-secondary shrink-0" />
      <div className="flex-1 flex flex-col gap-3">
        <div className="h-5 bg-secondary rounded w-3/4" />
        <div className="h-4 bg-secondary rounded w-1/4" />
        <div className="h-9 bg-secondary rounded-full w-28 mt-auto" />
      </div>
    </div>
  );
}
