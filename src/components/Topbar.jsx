export default function Topbar({ title = 'Dashboard' }) {
  return (
    <header className="sticky top-0 z-40 flex h-[88px] items-center justify-between border-b border-[#232838] bg-[#111318]/85 px-8 backdrop-blur-xl">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#6e7690]">
          Workspace
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">
          {title}
        </h2>
      </div>

      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#2a3145] bg-[#181d2b] text-sm font-semibold text-white">
        RH
      </div>
    </header>
  )
}