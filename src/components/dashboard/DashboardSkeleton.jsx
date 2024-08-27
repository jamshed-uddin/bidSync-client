export default function DashboardSkeleton() {
  return (
    <>
      <div className="lg:flex  gap-2 space-y-3 lg:space-y-0">
        <CardSkeleton />
        <CardSkeleton />
      </div>
      {/* <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          <RevenueChartSkeleton />
          <LatestInvoicesSkeleton />
        </div> */}
    </>
  );
}

export function CardSkeleton() {
  return (
    <div
      className={`skeleton relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm w-full`}
    >
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
      <div className="flex p-4">
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
    </div>
  );
}
