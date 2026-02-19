export default function CategoryLoading() {
  return (
    <div className="animate-pulse">
      {/* Category breadcrumb bar */}
      <div className="bg-gray-alt h-16 w-full" />
      {/* Card grid */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gray-alt h-72 rounded" />
          ))}
        </div>
      </div>
    </div>
  )
}
