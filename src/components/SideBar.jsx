const navItems = [
  'Dashboard',
  'Finances',
  'Clients',
  'Employees',
  'Tasks',
]

export default function Sidebar({ activeNav, setActiveNav }) {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[260px] flex-col border-r border-[#232838] bg-[#0d1017] px-5 py-6">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#5865f2] text-lg font-bold text-white shadow-lg shadow-[#5865f2]/20">
          B
        </div>

        <div>
          <h1 className="text-lg font-semibold tracking-tight text-white">
            BizzBoard
          </h1>
          <p className="text-xs text-[#7d8499]">Business management hub</p>
        </div>
      </div>

      <div className="mb-4 px-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#5f6780]">
          Workspace
        </p>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = activeNav === item

          return (
            <button
              key={item}
              type="button"
              onClick={() => setActiveNav(item)}
              className={`group flex items-center justify-between rounded-2xl px-4 py-3 text-left transition-all ${
                isActive
                  ? 'bg-[#171c29] text-white ring-1 ring-[#2c3550]'
                  : 'text-[#98a1b7] hover:bg-[#131824] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    isActive
                      ? 'bg-[#5865f2]'
                      : 'bg-[#394055] group-hover:bg-[#6f7aa3]'
                  }`}
                />
                <span className="text-sm font-medium">{item}</span>
              </div>

              {isActive && (
                <span className="rounded-full bg-[#5865f2]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#9ea8ff]">
                  Live
                </span>
              )}
            </button>
          )
        })}
      </nav>

      <div className="mt-auto rounded-3xl border border-[#232838] bg-[#121723] p-4">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#677089]">
          Custom Layouts
        </p>
        <h3 className="mt-2 text-sm font-semibold text-white">
          Personalize your workspace
        </h3>
        <p className="mt-2 text-sm leading-6 text-[#8a93ab]">
          Rearrange modules, resize widgets, and save a dashboard that fits your workflow.
        </p>

        <button className="mt-4 w-full rounded-xl bg-[#5865f2] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6b77ff]">
          Edit Layout
        </button>
      </div>
    </aside>
  )
}