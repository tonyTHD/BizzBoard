import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#111318] flex items-center justify-center">
      <div className="bg-[#1a1d27] border border-[#2e3350] rounded-2xl p-16 text-center max-w-md w-full shadow-2xl">
        <h1 className="font-bold text-4xl text-white mb-3 leading-tight">
          Welcome to<br />BizzBoard
        </h1>
        <p className="text-[#8b90a7] italic mb-12 text-sm">
          For all your business<br />management needs
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/home')}
            className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-8 py-3 rounded-lg font-medium transition-all"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/home')}
            className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-8 py-3 rounded-lg font-medium transition-all"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}