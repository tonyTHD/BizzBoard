export default function ModuleCard({ label, sublabel, compact = false }) {
  return (
    <div
      className={`h-full overflow-hidden rounded-[28px] border border-[#232838] bg-[linear-gradient(180deg,#181d2a_0%,#141925_100%)] shadow-[0_20px_60px_rgba(0,0,0,0.25)] ${
        compact ? 'p-4' : 'p-6'
      }`}
    >
      <div className="flex h-full min-h-0 flex-col">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="inline-flex rounded-full border border-[#2c3550] bg-[#1d2434] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9da6c0]">
              Module
            </div>

            <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">
              {label}
            </h3>

            <p className="mt-2 text-sm leading-5 text-[#8f98b0]">{sublabel}</p>
          </div>

          <button className="shrink-0 rounded-xl border border-[#2a3145] bg-[#171c29] px-3 py-2 text-xs font-medium text-[#9aa4bc] transition hover:border-[#3a4463] hover:text-white">
            Manage
          </button>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-12 gap-3">
          <div className="col-span-7 flex min-h-0 flex-col rounded-2xl border border-[#242b3d] bg-[#101520] p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#66708a]">
                Overview
              </span>
              <span className="text-xs text-[#7f88a1]">Last 30 days</span>
            </div>

            <div className="flex min-h-0 flex-1 items-end gap-2">
              <div className="h-[28%] flex-1 rounded-t-xl bg-[#2a3145]" />
              <div className="h-[48%] flex-1 rounded-t-xl bg-[#36405f]" />
              <div className="h-[38%] flex-1 rounded-t-xl bg-[#48547c]" />
              <div className="h-[64%] flex-1 rounded-t-xl bg-[#5865f2]" />
              <div className="h-[54%] flex-1 rounded-t-xl bg-[#7080ff]" />
              <div className="h-[76%] flex-1 rounded-t-xl bg-[#8c97ff]" />
            </div>
          </div>

          <div className="col-span-5 flex min-h-0 flex-col gap-3">
            <div className="rounded-2xl border border-[#242b3d] bg-[#101520] px-4 py-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#66708a]">
                Status
              </p>
              <p className="mt-2 text-xl font-semibold leading-none text-white">
                87%
              </p>
              <p className="mt-2 text-sm leading-5 text-[#8f98b0]">On track</p>
            </div>

            <div className="flex-1 rounded-2xl border border-[#242b3d] bg-[#101520] px-4 py-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#66708a]">
                Insight
              </p>
              <p className="mt-2 text-sm leading-5 text-[#8f98b0]">
                This module is part of the fixed starter layout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}