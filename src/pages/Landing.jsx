import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'

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
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
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

const orbits = [
  { size: 320, delay: '0s', duration: '18s' },
  { size: 500, delay: '-6s', duration: '26s' },
  { size: 700, delay: '-3s', duration: '36s' },
]

const planets = [
  { orbit: 320, angle: 40, size: 28, color: 'radial-gradient(circle at 35% 35%, #7c9fff, #2a3bbf)', shadow: '#3a5aff' },
  { orbit: 320, angle: 210, size: 18, color: 'radial-gradient(circle at 35% 35%, #c084fc, #7e22ce)', shadow: '#a855f7' },
  { orbit: 500, angle: 120, size: 38, color: 'radial-gradient(circle at 35% 35%, #f97316, #92400e)', shadow: '#f97316' },
  { orbit: 500, angle: 290, size: 22, color: 'radial-gradient(circle at 35% 35%, #34d399, #065f46)', shadow: '#10b981' },
  { orbit: 700, angle: 60, size: 30, color: 'radial-gradient(circle at 35% 35%, #60a5fa, #1e3a8a)', shadow: '#3b82f6' },
  { orbit: 700, angle: 190, size: 20, color: 'radial-gradient(circle at 35% 35%, #fbbf24, #92400e)', shadow: '#f59e0b' },
]

const navItems = ['Dashboard', 'Finances', 'Clients', 'Employees', 'Tasks']

const features = [
  {
    title: 'Real-time financial insights',
    desc: 'Track cash flow, invoices, and profit margins with live data and beautiful charts.',
    icon: '📊',
    wide: false,
    accent: '#5865f2',
  },
  {
    title: 'Manage clients effortlessly',
    desc: 'Keep a full pipeline of leads, top accounts, and engagement history in one unified view.',
    icon: '🤝',
    wide: true,
    accent: '#7c3aed',
  },
  {
    title: 'Employee oversight',
    desc: 'Attendance tracking, performance reviews, and department staffing — always at a glance.',
    icon: '👥',
    wide: false,
    accent: '#0891b2',
  },
  {
    title: 'Modular workspace',
    desc: 'Rearrange and resize modules to build the dashboard that fits your exact workflow.',
    icon: '⚙️',
    wide: false,
    accent: '#059669',
  },
  {
    title: 'Task & project tracking',
    desc: 'Open assignments, upcoming deadlines, and milestone progress all in one board.',
    icon: '✅',
    wide: true,
    accent: '#d97706',
  },
  {
    title: 'Your business hub',
    desc: 'BizzBoard brings every part of your business together so nothing falls through the cracks.',
    icon: '🏢',
    wide: false,
    accent: '#dc2626',
  },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen bg-[#0a0a0b] overflow-x-hidden font-sans">
      <StarField />

      {/* Subtle radial glow behind orbit */}
      <div
        className="fixed left-1/2 top-[48vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        style={{
          width: 900,
          height: 900,
          background: 'radial-gradient(circle, rgba(88,101,242,0.08) 0%, transparent 70%)',
        }}
      />

      {/* NAV */}
      <nav className="relative z-20 flex items-center justify-between px-10 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5865f2] text-sm font-bold text-white shadow-lg shadow-[#5865f2]/30">
            B
          </div>
          <span className="text-sm font-semibold text-white">BizzBoard</span>
        </div>

        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 backdrop-blur-md">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => navigate('/home')}
              className="rounded-full px-4 py-1.5 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              {item}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => navigate('/login')}
          className="rounded-full border border-white/15 bg-white/8 px-5 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
        >
          Login
        </button>
      </nav>

      {/* HERO */}
      <section className="relative z-10 flex flex-col items-center pt-16 pb-8 text-center">
        <h1
          className="text-6xl font-black leading-none tracking-tight text-white"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.03em' }}
        >
          Business tools
          <br />
          <span style={{ color: '#8c97ff' }}>from the future.</span>
        </h1>
        <p className="mt-6 max-w-sm text-base leading-relaxed text-white/50">
          Run your entire business with BizzBoard's
          <br />
          all-in-one management platform.
        </p>

        <button
          type="button"
          onClick={() => navigate('/home')}
          
          className="mt-8 flex items-center gap-2.5 rounded-full border border-white/15 bg-white/8 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
        >
          <span className="h-2 w-2 rounded-full bg-[#5865f2]" />
          Explore the platform
        </button>
      </section>

      {/* ORBITAL SYSTEM */}
      <section className="relative z-10 flex items-center justify-center" style={{ height: 800 }}>
        {/* orbit rings */}
        {orbits.map((o, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/[0.06]"
            style={{ width: o.size, height: o.size }}
          />
        ))}

        {/* animated planets */}
        {planets.map((p, i) => {
        
          
          const animDuration = p.orbit === 320 ? 20 : p.orbit === 500 ? 32 : 44
          const animDelay = -(i * (animDuration / planets.length * 0.8))

          return (
            <div
              key={i}
              className="absolute"
              style={{
                width: p.orbit,
                height: p.orbit,
                animation: `orbit-spin ${animDuration}s linear infinite`,
                animationDelay: `${animDelay}s`,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: p.size,
                  height: p.size,
                  top: '50%',
                  left: '100%',
                  transform: 'translate(-50%, -50%)',
                  background: p.color,
                  borderRadius: '50%',
                  boxShadow: `0 0 ${p.size * 0.8}px ${p.shadow}55`,
                }}
              />
            </div>
          )
        })}

        {/* Center logo */}
        <div
          className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full border border-white/20"
          style={{
            background: 'radial-gradient(circle at 40% 35%, #2a2f3e, #0f1117)',
            boxShadow: '0 0 60px rgba(88,101,242,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          <span className="text-4xl font-black text-white" style={{ fontFamily: 'Georgia, serif' }}>
            B
          </span>
        </div>
      </section>

      {/* SECTION LABEL */}
      <div className="relative z-10 text-center mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5865f2]" />
          BizzBoard
        </div>
        <h2 className="mt-4 text-4xl font-black text-white" style={{ fontFamily: 'Georgia, serif' }}>
          Everything you need.
        </h2>
        <p className="mt-2 text-sm text-white/40">One dashboard to run it all.</p>
      </div>

      {/* FEATURE CARDS */}
      <section className="relative z-10 mx-auto max-w-5xl px-8 pb-32">
        <div className="grid grid-cols-3 gap-4 auto-rows-auto">
          {features.map((f, i) => (
            <div
              key={i}
              className={`rounded-2xl border border-white/8 p-6 transition hover:border-white/16 ${
                f.wide ? 'col-span-2' : 'col-span-1'
              }`}
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/30">
                Feature
              </p>
              <h3 className="mt-1 text-base font-bold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/45">{f.desc}</p>

              {/* placeholder visual */}
              <div
                className="mt-5 flex h-20 items-center justify-center rounded-xl text-3xl"
                style={{ background: `${f.accent}12`, border: `1px solid ${f.accent}25` }}
              >
                {f.icon}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA footer strip */}
      <div className="relative z-10 border-t border-white/8 py-10 text-center">
        <p className="mb-4 text-sm text-white/40">Ready to streamline your business?</p>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="rounded-full bg-[#5865f2] px-7 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#5865f2]/30 transition hover:bg-[#6b77ff]"
          >
            Get started free
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="rounded-full border border-white/15 px-7 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/8 hover:text-white"
          >
            Sign in
          </button>
        </div>
      </div>

      <style>{`
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
