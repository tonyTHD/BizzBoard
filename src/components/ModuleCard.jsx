export default function ModuleCard({ label, sublabel, tall }) {
  return (
    <div className={`bg-[#252a3d] border border-[#2e3350] rounded-xl flex flex-col items-center justify-center text-center p-6 cursor-pointer hover:border-[#5865f2] hover:-translate-y-1 hover:shadow-lg transition-all ${tall ? 'min-h-[160px]' : 'min-h-[130px]'}`}>
      <p className="text-[#8b90a7] text-sm font-medium">{label}</p>
      {sublabel && <p className="text-[#8b90a7] text-xs mt-1">{sublabel}</p>}
    </div>
  )
}