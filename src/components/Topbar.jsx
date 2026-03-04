export default function Topbar() {
  return (
    <div className="fixed top-0 left-[180px] right-0 h-14 bg-[#1a1d27] border-b border-[#2e3350] flex items-center justify-between px-6 z-50">
      <span className="font-bold text-lg text-white tracking-tight">BizzBoard</span>
      <div className="w-9 h-9 rounded-full bg-[#2e3350] flex items-center justify-center cursor-pointer hover:bg-[#5865f2] transition-colors">
        <svg className="w-5 h-5 fill-[#8b90a7]" viewBox="0 0 24 24">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
        </svg>
      </div>
    </div>
  )
}
