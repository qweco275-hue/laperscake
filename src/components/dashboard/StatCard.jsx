function StatCard({
  label,
  value,
  description,
  icon,
  background = '#FFF7E5',
}) {
  return (
    <div
      style={{ background }}
      className="rounded-3xl p-5"
    >

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs font-semibold text-[#756F66]">
            {label}
          </p>

          <p className="font-display mt-2 text-3xl font-semibold">
            {value}
          </p>

        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 text-lg">
          {icon}
        </div>

      </div>

      <p className="mt-5 text-[10px] font-medium text-[#756F66]">
        {description}
      </p>

    </div>
  )
}

export default StatCard