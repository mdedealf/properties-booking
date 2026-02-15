const ListingPageSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto animate-pulse mt-4">
      {/* Title */}
      <div className="h-8 w-3/4 bg-gray-200 rounded mb-6" />

      {/* Hero image */}
      <div className="w-full h-80 sm:h-110 lg:h-140 bg-gray-200 rounded-2xl mb-10" />

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left content */}
        <div className="flex-1 space-y-8">
          {/* Host info */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gray-200 rounded-full" />
            <div className="space-y-2">
              <div className="h-4 w-40 bg-gray-200 rounded" />
              <div className="h-3 w-24 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Stats */}
          <div className="h-4 w-64 bg-gray-200 rounded" />

          {/* description */}
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-120 mt-10 w-full bg-gray-200" />
          </div>
        </div>

        {/* Booking card skeleton */}
        <div className="border border-gray-200 rounded-2xl p-6 h-fit space-y-6 md:w-100 shrink-0">
          <div className="h-6 w-32 bg-gray-200 rounded" />
          <div className="h-64 w-full bg-gray-200 rounded-xl" />
          <div className="h-10 w-full bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ListingPageSkeleton;
