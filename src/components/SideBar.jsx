const navItems = ['Dashboard', 'Finances', 'Clients', 'Employees', 'Tasks']

export default function Sidebar({ activeNav, setActiveNav }) {
  return (
    <div className="fixed top-0 left-0 bottom-0 w-[180px] bg-[#1e2235] border-r border-[#2e3350] flex flex-col justify-between pt-14 z-40">
      <nav className="flex flex-col gap-1 p-3">
        {navItems.map(item => (
          <button
            key={item}
            onClick={() => setActiveNav(item)}
            className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeNav === item
                ? 'bg-[#5865f2] text-white'
                : 'text-[#8b90a7] hover:bg-[#2e3350] hover:text-white'
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
      <div className="p-4 flex justify-center">
        <button className="w-10 h-10 rounded-full bg-[#5865f2] hover:bg-[#4752c4] text-white text-xl flex items-center justify-center shadow-lg transition-all hover:scale-110">
          +
        </button>
      </div>
    </div>
  )
}