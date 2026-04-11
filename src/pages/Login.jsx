import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

function StarField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animFrame

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.2,
      opacity: Math.random() * 0.7 + 0.15,
      twinkleSpeed: Math.random() * 0.015 + 0.003,
      twinkleOffset: Math.random() * Math.PI * 2,
    }))

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.016
      stars.forEach((s) => {
        const alpha = s.opacity * (0.6 + 0.4 * Math.sin(t * s.twinkleSpeed * 60 + s.twinkleOffset))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fill()
      })
      animFrame = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}

export default function Login() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="relative min-h-screen bg-[#0a0a0b] flex items-center justify-center overflow-hidden">
      <StarField />

      {/* Radial glow */}
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        style={{
          width: 700,
          height: 700,
          background: 'radial-gradient(circle, rgba(88,101,242,0.13) 0%, rgba(124,58,237,0.06) 40%, transparent 70%)',
        }}
      />

      {/* Top nav logo */}
      <div className="fixed top-5 left-10 z-20 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5865f2] text-sm font-bold text-white shadow-lg shadow-[#5865f2]/30">
          B
        </div>
        <span className="text-sm font-semibold text-white">BizzBoard</span>
      </div>

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 p-8"
        style={{
          background: 'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      >
        {/* Title */}
        <h1
          className="mb-6 text-center text-2xl font-black text-white"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          {isLogin ? 'Welcome back' : 'Create an account'}
        </h1>

        {/* OAuth buttons */}
        <div className="flex gap-3 mb-5">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            {/* Google G */}
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"/>
            </svg>
            Google
          </button>

          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            {/* Apple logo */}
            <svg width="16" height="18" viewBox="0 0 814 1000" fill="white">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.1 268.1-317.1 36.5-4.2 107.1 8.9 167.8 8.9s110.7-36.4 167.8-36.4c9 0 124.4 5.7 188.4 83.2zm-172-161.2c-20.7 10.9-68.1 48.9-68.1 112.9 0 61.6 43.4 92.1 57.3 92.1-3.2 1.3-55.7 23.5-55.7 97.8 0 68.1 38.2 100.2 56.4 100.2-3.9 1.3-64.6 24.8-64.6 110.5 0 66.1 47.8 123.9 98.8 123.9 21.4 0 58.1-8.4 103.1-8.4 44.4 0 103.7 8.4 103.7 8.4 51-1.3 93.8-57.2 93.8-122.6 0-88.6-62.9-111.3-66.9-112.6 18.3-6.5 56.4-39.5 56.4-102.8 0-72.2-50.4-95-57.3-97.8 13.9 0 57.3-30.5 57.3-92.1 0-62.9-44.4-100.2-68.1-112.9-6.5-3.2-64.6-23.5-64.6-23.5-1.3 0-1.9.6-1.9 1.9 0 1.9 58.1 21.4 58.1 21.4z"/>
            </svg>
            Apple
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-white/30">Or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-medium text-white/60">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-[#5865f2] focus:bg-white/8 focus:ring-1 focus:ring-[#5865f2]/50"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-white/60">Password</label>
            {isLogin && (
              <button type="button" className="text-xs text-white/40 transition hover:text-white/70">
                Forgot?
              </button>
            )}
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-11 text-sm text-white placeholder-white/25 outline-none transition focus:border-[#5865f2] focus:bg-white/8 focus:ring-1 focus:ring-[#5865f2]/50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 transition hover:text-white/60"
            >
              {showPassword ? (
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="w-full rounded-xl bg-[#5865f2] py-3 text-sm font-bold text-white shadow-lg shadow-[#5865f2]/30 transition hover:bg-[#6b77ff] active:scale-[0.98]"
        >
          {isLogin ? 'Log in' : 'Create account'}
        </button>

        {/* Toggle */}
        <p className="mt-5 text-center text-sm text-white/35">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="font-semibold text-white/70 transition hover:text-white"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  )
}
