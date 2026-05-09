import { useMemo, useState, useEffect, useRef } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Settings from './Settings'
import Organizations from './Organizations'

// ── STARFIELD ────────────────────────────────────────────────────────────────
function StarField() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animFrame
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.1 + 0.2,
      opacity: Math.random() * 0.6 + 0.1,
      speed: Math.random() * 0.012 + 0.003,
      offset: Math.random() * Math.PI * 2,
    }))
    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.016
      stars.forEach(s => {
        const a = s.opacity * (0.55 + 0.45 * Math.sin(t * s.speed * 60 + s.offset))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180,190,255,${a})`
        ctx.fill()
      })
      animFrame = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animFrame); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}

// ── WAVE CHART ───────────────────────────────────────────────────────────────
const waveData = [320,280,200,160,210,250,230,310,270,340,290,380,310,420,370,440,390,460,410,490,440,510,460,530]
const months   = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function WaveChart() {
  const W = 800, H = 200
  const pad = { top: 20, right: 16, bottom: 28, left: 36 }
  const iW = W - pad.left - pad.right
  const iH = H - pad.top - pad.bottom
  const minV = Math.min(...waveData), maxV = Math.max(...waveData)
  const range = maxV - minV

  const pts = waveData.map((v, i) => ({
    x: pad.left + (i / (waveData.length - 1)) * iW,
    y: pad.top  + iH - ((v - minV) / range) * iH,
  }))

  const smooth = (points) => {
    let d = `M ${points[0].x} ${points[0].y}`
    for (let i = 0; i < points.length - 1; i++) {
      const dx = (points[i+1].x - points[i].x) / 3
      d += ` C ${points[i].x+dx} ${points[i].y}, ${points[i+1].x-dx} ${points[i+1].y}, ${points[i+1].x} ${points[i+1].y}`
    }
    return d
  }

  const linePath = smooth(pts)
  const areaPath = `${linePath} L ${pts[pts.length-1].x} ${pad.top+iH} L ${pts[0].x} ${pad.top+iH} Z`
  const yLabels  = [0,100,200,300,400,500]

  return (
    <div className="w-full" style={{ aspectRatio: `${W}/${H}` }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#3b6fff" stopOpacity="0.72"/>
            <stop offset="55%"  stopColor="#1a3fa0" stopOpacity="0.38"/>
            <stop offset="100%" stopColor="#060818" stopOpacity="0.05"/>
          </linearGradient>
          <linearGradient id="shimGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#93c5fd" stopOpacity="0.28"/>
            <stop offset="100%" stopColor="#060818" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#3b6fff"/>
            <stop offset="50%"  stopColor="#60a5fa"/>
            <stop offset="100%" stopColor="#a5b4ff"/>
          </linearGradient>
          <filter id="lineGlow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {yLabels.map((v, i) => {
          const y = pad.top + iH - (v / 500) * iH
          return (
            <g key={i}>
              <line x1={pad.left} y1={y} x2={W-pad.right} y2={y}
                stroke="rgba(255,255,255,0.055)" strokeWidth="1" strokeDasharray="4 4"/>
              <text x={pad.left-5} y={y+4} textAnchor="end" fill="rgba(255,255,255,0.22)" fontSize="9">{v}</text>
            </g>
          )
        })}
        <path d={areaPath} fill="url(#areaGrad)"/>
        <path d={areaPath} fill="url(#shimGrad)"/>
        <path d={linePath} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" filter="url(#lineGlow)"/>
        {months.map((m, i) => (
          <text key={m} x={pad.left + (i / (months.length-1)) * iW} y={H-4}
            textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize="9">{m}</text>
        ))}
      </svg>
    </div>
  )
}

// ── DEFAULT DATA — workingDays must be {} objects, not arrays ─────────────────
const defaultClients = [
  { id:1, name:'Client 1', transactions:[
    { id:'T-1001', date:'2026-04-01', description:'Website redesign deposit', amount:'+$2,400' },
    { id:'T-1002', date:'2026-04-03', description:'Brand consultation', amount:'+$850' },
    { id:'T-1003', date:'2026-04-08', description:'Revision credit', amount:'-$150' },
    { id:'T-1004', date:'2026-04-12', description:'Final project payment', amount:'+$3,200' },
  ]},
  { id:2, name:'Client 2', transactions:[
    { id:'T-2001', date:'2026-04-02', description:'Monthly retainer', amount:'+$1,500' },
    { id:'T-2002', date:'2026-04-06', description:'Ad campaign setup', amount:'+$1,250' },
    { id:'T-2003', date:'2026-04-09', description:'Refund adjustment', amount:'-$200' },
    { id:'T-2004', date:'2026-04-14', description:'Analytics reporting', amount:'+$600' },
  ]},
  { id:3, name:'Client 3', transactions:[
    { id:'T-3001', date:'2026-04-04', description:'Mobile app prototype', amount:'+$4,100' },
    { id:'T-3002', date:'2026-04-07', description:'UI expansion phase', amount:'+$1,900' },
    { id:'T-3003', date:'2026-04-11', description:'Scope reduction adjustment', amount:'-$300' },
    { id:'T-3004', date:'2026-04-15', description:'Testing and QA invoice', amount:'+$1,150' },
  ]},
]

// ✅ workingDays is {} not [] — this was the white-screen bug
const defaultEmployees = [
  { id:1, name:'Employee 1', workingDays:{} },
  { id:2, name:'Employee 2', workingDays:{} },
  { id:3, name:'Employee 3', workingDays:{} },
]

// ── SHARED CARD ───────────────────────────────────────────────────────────────
function Card({ children, className='', glow=false }) {
  return (
    <div className={`rounded-2xl border border-white/8 ${className}`}
      style={{
        background:'linear-gradient(145deg,rgba(255,255,255,0.055) 0%,rgba(255,255,255,0.02) 100%)',
        backdropFilter:'blur(12px)',
        boxShadow: glow
          ? '0 0 40px rgba(88,101,242,0.18),0 8px 32px rgba(0,0,0,0.4)'
          : '0 8px 32px rgba(0,0,0,0.35)',
      }}>
      {children}
    </div>
  )
}

// ── STAT CARD ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, change, positive, icon }) {
  return (
    <Card className="p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">{label}</p>
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#5865f2]/20 text-base">{icon}</div>
      </div>
      <p className="text-2xl font-black text-white tracking-tight">{value}</p>
      <p className={`text-xs font-semibold ${positive?'text-emerald-400':'text-red-400'}`}>
        {change} <span className="text-white/30 font-normal">vs last month</span>
      </p>
    </Card>
  )
}

// ── REVENUE CHART ─────────────────────────────────────────────────────────────
function RevenueChart() {
  return (
    <Card className="p-6" glow>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-1">Sales Overview</p>
          <p className="text-2xl font-black text-white">$175,000</p>
          <p className="text-xs text-emerald-400 font-semibold mt-1">+90% this month</p>
        </div>
        <span className="text-xs text-white/30 border border-white/10 rounded-lg px-3 py-1">2026</span>
      </div>
      <WaveChart />
    </Card>
  )
}

// ── SATISFACTION RING ─────────────────────────────────────────────────────────
function SatisfactionCard() {
  const r=38, circ=2*Math.PI*r
  return (
    <Card className="p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-1">Satisfaction Rate</p>
      <p className="text-[10px] text-white/30 mb-4">From all projects</p>
      <div className="flex items-center justify-center mb-4">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="rGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5865f2"/><stop offset="100%" stopColor="#a5b4ff"/>
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10"/>
          <circle cx="50" cy="50" r={r} fill="none" stroke="url(#rGrad)" strokeWidth="10"
            strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ*0.05}
            transform="rotate(-90 50 50)"/>
          <text x="50" y="54" textAnchor="middle" fill="white" fontSize="14" fontWeight="800">95%</text>
        </svg>
      </div>
      <div className="flex justify-between text-xs text-white/30">
        <span>0%</span><span className="text-white/50">Focus on Sets</span><span>100%</span>
      </div>
    </Card>
  )
}

// ── REFERRAL CARD ─────────────────────────────────────────────────────────────
function ReferralCard() {
  return (
    <Card className="p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-4">Referral Tracking</p>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] text-white/30 mb-1">Invited</p>
          <p className="text-2xl font-black text-white">145</p>
          <p className="text-[10px] text-white/30 mt-3 mb-1">Bonus</p>
          <p className="text-lg font-bold text-white">1,465</p>
        </div>
        <div className="flex flex-col items-center">
          <svg width="72" height="72" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8"/>
            <circle cx="36" cy="36" r="30" fill="none" stroke="#10b981" strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2*Math.PI*30*0.93} ${2*Math.PI*30}`}
              transform="rotate(-90 36 36)"/>
            <text x="36" y="40" textAnchor="middle" fill="white" fontSize="13" fontWeight="800">9.3</text>
          </svg>
          <p className="text-[9px] text-white/30 mt-1">Star Score</p>
        </div>
      </div>
    </Card>
  )
}

// ── ACTIVE USERS ──────────────────────────────────────────────────────────────
function ActiveUsersCard() {
  const bars=[60,80,55,90,70,85,65,95,75,88,72,100]
  return (
    <Card className="p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-1">Active Users</p>
      <p className="text-[10px] text-white/30 mb-2">Than last week</p>
      <p className="text-2xl font-black text-white mb-4">32,984</p>
      <div className="flex items-end gap-1 h-16 mb-3">
        {bars.map((h,i) => (
          <div key={i} className="flex-1 rounded-sm"
            style={{ height:`${h}%`, background:i>=10?'#5865f2':'rgba(88,101,242,0.22)' }}/>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        {[['Clicks','2.42m'],['Sales','2,400$'],['Items','320']].map(([l,v]) => (
          <div key={l}>
            <p className="text-[10px] text-white/30">{l}</p>
            <p className="text-sm font-bold text-white">{v}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

// ── PROJECTS TABLE ────────────────────────────────────────────────────────────
const projects=[
  { name:'Chakra UI Version',  members:3, budget:'$14,000', completion:60 },
  { name:'BizzBoard Redesign', members:2, budget:'$28,000', completion:82 },
  { name:'Mobile App v2',      members:4, budget:'$19,500', completion:45 },
  { name:'API Integration',    members:2, budget:'$8,200',  completion:91 },
]

function ProjectsCard() {
  return (
    <Card className="p-6">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-1">Projects</p>
        <p className="text-[10px] text-white/30">30 done this month</p>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
        <span>Company</span><span>Members</span><span>Budget</span><span>Completion</span>
      </div>
      <div className="flex flex-col gap-3">
        {projects.map(p => (
          <div key={p.name} className="grid grid-cols-4 gap-2 items-center">
            <p className="text-xs font-semibold text-white truncate">{p.name}</p>
            <div className="flex gap-1">
              {Array.from({length:p.members}).map((_,i) => (
                <div key={i} className="h-5 w-5 rounded-full bg-[#5865f2]/60 border border-[#5865f2] text-[8px] flex items-center justify-center text-white font-bold">
                  {String.fromCharCode(65+i)}
                </div>
              ))}
            </div>
            <p className="text-xs text-white/70">{p.budget}</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#5865f2]" style={{ width:`${p.completion}%` }}/>
              </div>
              <span className="text-[10px] text-white/50 w-7 text-right">{p.completion}%</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

// ── ORDERS CARD ───────────────────────────────────────────────────────────────
function OrdersCard() {
  const orders=[
    { label:'$2,400 Design Changes', date:'22 Dec, 07:20', dot:'#5865f2' },
    { label:'New order #4219',       date:'21 Dec, 11:00', dot:'#10b981' },
    { label:'Server payments',       date:'20 Dec, 14:30', dot:'#f59e0b' },
    { label:'New card added',        date:'18 Dec, 09:15', dot:'#6366f1' },
    { label:'Refund processed',      date:'17 Dec, 16:45', dot:'#ef4444' },
  ]
  return (
    <Card className="p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-1">Orders Overview</p>
      <p className="text-emerald-400 text-xs font-semibold mb-5">+30% this month</p>
      <div className="flex flex-col gap-3">
        {orders.map((o,i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="relative flex flex-col items-center">
              <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background:o.dot }}/>
              {i<orders.length-1 && <div className="w-px h-5 bg-white/10 mt-1"/>}
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-white">{o.label}</p>
              <p className="text-[10px] text-white/30">{o.date}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

// ── WELCOME CARD ──────────────────────────────────────────────────────────────
function WelcomeCard() {
  return (
    <Card className="p-6 relative overflow-hidden" glow>
      <div className="absolute right-4 top-4 w-24 h-24 rounded-full opacity-30"
        style={{ background:'radial-gradient(circle,#818cf8,#5865f2)', filter:'blur(20px)' }}/>
      <div className="relative z-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-2">Welcome back</p>
        <p className="text-2xl font-black text-white leading-tight mb-1">Ryan H.</p>
        <p className="text-xs text-white/40 mb-5">Glad to see you again!<br/>Check your latest updates.</p>
        <button className="text-xs font-semibold text-[#a5b4ff] border border-[#5865f2]/40 rounded-lg px-4 py-2 hover:bg-[#5865f2]/20 transition">
          View reports →
        </button>
      </div>
    </Card>
  )
}

// ── PERSON CARD ───────────────────────────────────────────────────────────────
function PersonCard({ person, isSelected, onSelect, label='Client' }) {
  return (
    <button type="button" onClick={() => onSelect(person)}
      className={`flex h-full w-full flex-col items-center justify-center rounded-2xl border p-6 text-center transition-all ${
        isSelected
          ? 'border-[#5865f2] shadow-[0_0_0_2px_rgba(88,101,242,0.22)]'
          : 'border-white/8 hover:border-white/20'
      }`}
      style={{
        background:'linear-gradient(145deg,rgba(255,255,255,0.055) 0%,rgba(255,255,255,0.02) 100%)',
        backdropFilter:'blur(12px)',
      }}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-[#5865f2]/20">
        <svg viewBox="0 0 24 24" className="h-8 w-8 fill-[#a5b4ff]">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
        </svg>
      </div>
      <span className="text-lg font-bold text-white">{person.name}</span>
      <span className="mt-1 text-xs text-white/40">{label}</span>
    </button>
  )
}

// ── TRANSACTION CARD ──────────────────────────────────────────────────────────
function TransactionHistoryCard({ selectedClient, onAddTransaction }) {
  return (
    <Card className="h-full p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-1">Transaction History</p>
          <p className="text-lg font-bold text-white">{selectedClient.name}</p>
        </div>
        <button type="button" onClick={onAddTransaction}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5865f2] text-xl text-white transition hover:bg-[#6b77ff]">
          +
        </button>
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100%-80px)]">
        {selectedClient.transactions.length === 0 ? (
          <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-white/10 text-center">
            <div>
              <p className="text-sm font-semibold text-white">No transactions yet</p>
              <p className="mt-1 text-xs text-white/30">Click + to add the first transaction.</p>
            </div>
          </div>
        ) : (
          selectedClient.transactions.map(t => {
            const pos = t.amount.startsWith('+')
            return (
              <div key={t.id} className="flex items-center justify-between rounded-xl border border-white/6 bg-white/3 px-4 py-3 hover:bg-white/6 transition">
                <div>
                  <p className="text-sm font-semibold text-white">{t.description}</p>
                  <p className="text-xs text-white/30 mt-0.5">{t.id} · {t.date}</p>
                </div>
                <span className={`text-sm font-bold ml-4 shrink-0 ${pos?'text-emerald-400':'text-red-400'}`}>{t.amount}</span>
              </div>
            )
          })
        )}
      </div>
    </Card>
  )
}

// ── EMPLOYEE SCHEDULE CARD ────────────────────────────────────────────────────
// ✅ Fixed: workingDays is always treated as an object with string keys
function EmployeeScheduleCard({ selectedEmployee, onUpdateWorkingDays }) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

  const getFirstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const toggleWorkingDay = (day) => {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`
    const newWorkingDays = { ...(selectedEmployee.workingDays || {}) }
    if (newWorkingDays[dateKey]) delete newWorkingDays[dateKey]
    else newWorkingDays[dateKey] = true
    onUpdateWorkingDays(newWorkingDays)
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const monthName = currentDate.toLocaleString('default', { month:'long', year:'numeric' })

  const calendarDays = []
  for (let i = 0; i < firstDay; i++) calendarDays.push(null)
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day)

  // ✅ Always read workingDays as object — safe even if undefined
  const workingDays = selectedEmployee.workingDays || {}

  return (
    <Card className="h-full p-6">
      <div className="mb-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-1">Schedule</p>
        <p className="text-lg font-bold text-white">{selectedEmployee.name}</p>
        <p className="text-xs text-white/30 mt-1">Click days to toggle working schedule</p>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="mb-3 flex items-center justify-between">
            <button type="button"
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth()-1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm text-white/50 hover:border-[#5865f2] hover:text-white transition">
              ←
            </button>
            <h4 className="text-sm font-semibold text-white">{monthName}</h4>
            <button type="button"
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth()+1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm text-white/50 hover:border-[#5865f2] hover:text-white transition">
              →
            </button>
          </div>
          <div className="mb-1 grid grid-cols-7 gap-1 text-center">
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
              <div key={d} className="text-[10px] font-bold text-white/30">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              const dateKey = day
                ? `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`
                : null
              const isWorking = day && workingDays[dateKey]
              return (
                <button
                  key={index}
                  type="button"
                  disabled={!day}
                  onClick={() => day && toggleWorkingDay(day)}
                  className={`flex aspect-square items-center justify-center rounded-md border text-[10px] font-semibold transition ${
                    !day
                      ? 'border-transparent bg-transparent'
                      : isWorking
                        ? 'border-[#5865f2] bg-[#20294a] text-[#cdd4ff] shadow-[0_0_0_1px_rgba(88,101,242,0.18)]'
                        : 'border-white/8 bg-white/3 text-white/40 hover:border-white/20 hover:bg-white/6'
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </Card>
  )
}

// ── FINANCES PAGE ─────────────────────────────────────────────────────────────
function FinancesPage() {
  const incBars=[40,55,48,70,60,80,68,90,75,88,72,95]
  const expBars=[30,42,38,55,45,62,50,70,58,65,54,72]
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-6">
        {[
          ['Total Revenue','$175,000','+12%',true,'💵'],
          ['Total Expenses','$48,200','+3%',false,'📤'],
          ['Net Profit','$126,800','+18%',true,'🏆'],
        ].map(([l,v,c,p,ic]) => (
          <StatCard key={l} label={l} value={v} change={c} positive={p} icon={ic}/>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-1">Income</p>
          <p className="text-2xl font-black text-white mb-5">$175,000</p>
          <div className="flex items-end gap-2 h-24">
            {incBars.map((h,i) => (
              <div key={i} className="flex-1 rounded-t-lg"
                style={{ height:`${h}%`, background:i>=9?'linear-gradient(180deg,#a5b4ff,#5865f2)':'rgba(88,101,242,0.22)' }}/>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-1">Expenses</p>
          <p className="text-2xl font-black text-white mb-5">$48,200</p>
          <div className="flex items-end gap-2 h-24">
            {expBars.map((h,i) => (
              <div key={i} className="flex-1 rounded-t-lg"
                style={{ height:`${h}%`, background:i>=9?'linear-gradient(180deg,#fb7185,#e11d48)':'rgba(225,29,72,0.2)' }}/>
            ))}
          </div>
        </Card>
      </div>
      <ProjectsCard/>
    </div>
  )
}

// ── TASKS PAGE ────────────────────────────────────────────────────────────────
const taskData=[
  { name:'Redesign landing page', due:'Apr 12', priority:'High',   done:true  },
  { name:'Build login component', due:'Apr 13', priority:'High',   done:true  },
  { name:'Wire up auth routes',   due:'Apr 15', priority:'Medium', done:false },
  { name:'Employee calendar UI',  due:'Apr 18', priority:'Medium', done:false },
  { name:'Deploy to production',  due:'Apr 22', priority:'Low',    done:false },
  { name:'Write documentation',   due:'Apr 25', priority:'Low',    done:false },
]
const pColor={
  High:  'text-red-400 bg-red-400/10',
  Medium:'text-amber-400 bg-amber-400/10',
  Low:   'text-emerald-400 bg-emerald-400/10',
}

function TasksPage() {
  const [tasks, setTasks] = useState(taskData)
  const toggle = i => setTasks(prev => prev.map((t,idx) => idx===i ? {...t,done:!t.done} : t))
  const done = tasks.filter(t=>t.done).length
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-6">
        <StatCard label="Total Tasks"     value={tasks.length}                             change={`${done} complete`}  positive icon="✅"/>
        <StatCard label="In Progress"     value={tasks.length-done}                        change="active now"          positive icon="⏳"/>
        <StatCard label="Completion Rate" value={`${Math.round(done/tasks.length*100)}%`} change="+10% this week"      positive icon="📊"/>
      </div>
      <Card className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-5">Task Queue</p>
        <div className="flex flex-col gap-3">
          {tasks.map((t,i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl border border-white/6 bg-white/3 px-4 py-3 hover:bg-white/6 transition">
              <button type="button" onClick={() => toggle(i)}
                className={`h-5 w-5 shrink-0 rounded-md border-2 flex items-center justify-center transition ${
                  t.done ? 'border-[#5865f2] bg-[#5865f2]' : 'border-white/20'
                }`}>
                {t.done && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"/>
                  </svg>
                )}
              </button>
              <p className={`flex-1 text-sm font-semibold ${t.done?'line-through text-white/30':'text-white'}`}>{t.name}</p>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${pColor[t.priority]}`}>{t.priority}</span>
              <span className="text-xs text-white/30">Due {t.due}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

// ── PAGE CONFIG ───────────────────────────────────────────────────────────────
const pageContent={
  Dashboard:{ title:'Dashboard', subtitle:'A modular business management hub with a clean default layout.' },
  Finances: { title:'Finances',  subtitle:'Track income, expenses, and profitability from one place.' },
  Clients:  { title:'Clients',   subtitle:'Browse client profiles and review recent transaction activity.' },
  Employees:{ title:'Employees', subtitle:'Browse employee profiles and preview schedule availability.' },
  Tasks:    { title:'Tasks',     subtitle:'Manage open assignments, deadlines, and project milestones.' },
  Settings:      { title:'Settings',      subtitle:'Manage your account, workspace, and preferences.' },
  Organizations: { title:'Organizations',  subtitle:'Register and switch between your businesses and workspaces.' },
}

const statCards=[
  { label:"Today's Money", value:'$53,000',  change:'+55%', positive:true,  icon:'💰' },
  { label:"Today's Users", value:'2,300',    change:'+5%',  positive:true,  icon:'👥' },
  { label:'New Clients',   value:'+3,052',   change:'-14%', positive:false, icon:'🤝' },
  { label:'Total Sales',   value:'$173,000', change:'+8%',  positive:true,  icon:'📈' },
]

// ── HOME ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeNav, setActiveNav] = useState('Dashboard')

  // ✅ localStorage persistence for clients and employees
  const [clients, setClients] = useState(() => {
    try {
      const saved = localStorage.getItem('bizzboard_clients')
      return saved ? JSON.parse(saved) : defaultClients
    } catch { return defaultClients }
  })

  const [employees, setEmployees] = useState(() => {
    try {
      const saved = localStorage.getItem('bizzboard_employees')
      if (saved) {
        const parsed = JSON.parse(saved)
        // ✅ Ensure workingDays is always an object, not an array
        return parsed.map(e => ({
          ...e,
          workingDays: Array.isArray(e.workingDays) ? {} : (e.workingDays || {})
        }))
      }
      return defaultEmployees
    } catch { return defaultEmployees }
  })

  const [selectedClient, setSelectedClient] = useState(clients[0] || null)
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0] || null)

  const [showClientModal, setShowClientModal] = useState(false)
  const [newClientName, setNewClientName] = useState('')
  const [showEmployeeModal, setShowEmployeeModal] = useState(false)
  const [newEmployeeName, setNewEmployeeName] = useState('')
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const [newTransaction, setNewTransaction] = useState({ description:'', date:'', amount:'' })

  // ✅ Persist clients to localStorage
  useEffect(() => {
    localStorage.setItem('bizzboard_clients', JSON.stringify(clients))
  }, [clients])

  // ✅ Persist employees to localStorage
  useEffect(() => {
    localStorage.setItem('bizzboard_employees', JSON.stringify(employees))
  }, [employees])

  const currentPage = useMemo(() => pageContent[activeNav] || pageContent.Dashboard, [activeNav])

  const handleCreateClient = () => {
    if (!newClientName.trim()) return
    const newClient = { id:Date.now(), name:newClientName.trim(), transactions:[] }
    setClients(prev => [...prev, newClient])
    setSelectedClient(newClient)
    setNewClientName('')
    setShowClientModal(false)
  }

  const handleCreateEmployee = () => {
    if (!newEmployeeName.trim()) return
    // ✅ workingDays is always {} object
    const newEmployee = { id:Date.now(), name:newEmployeeName.trim(), workingDays:{} }
    setEmployees(prev => [...prev, newEmployee])
    setSelectedEmployee(newEmployee)
    setNewEmployeeName('')
    setShowEmployeeModal(false)
  }

  const handleCreateTransaction = () => {
    if (!selectedClient || !newTransaction.description.trim() || !newTransaction.date || !newTransaction.amount) return
    const amt = Number(newTransaction.amount)
    const formatted = amt >= 0
      ? `+$${Math.abs(amt).toLocaleString()}`
      : `-$${Math.abs(amt).toLocaleString()}`
    const transaction = {
      id:`T-${Date.now().toString().slice(-4)}`,
      date:newTransaction.date,
      description:newTransaction.description.trim(),
      amount:formatted,
    }
    const updated = clients.map(c =>
      c.id===selectedClient.id ? {...c, transactions:[...c.transactions, transaction]} : c
    )
    setClients(updated)
    setSelectedClient(updated.find(c => c.id===selectedClient.id))
    setNewTransaction({ description:'', date:'', amount:'' })
    setShowTransactionModal(false)
  }

  const handleUpdateWorkingDays = (newWorkingDays) => {
    const updated = { ...selectedEmployee, workingDays:newWorkingDays }
    setEmployees(prev => prev.map(e => e.id===selectedEmployee.id ? updated : e))
    setSelectedEmployee(updated)
  }

  const renderContent = () => {
    if (activeNav === 'Clients') return (
      <div className="flex flex-col gap-6 h-[calc(100vh-220px)]">
        <div className="grid gap-6" style={{ gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))', maxHeight:'200px', minHeight:'180px' }}>
          {clients.map(c => (
            <PersonCard key={c.id} person={c}
              isSelected={selectedClient?.id===c.id}
              onSelect={setSelectedClient} label="Client"/>
          ))}
          <button type="button" onClick={() => setShowClientModal(true)}
            className="flex h-full w-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/3 text-white/40 transition hover:border-[#5865f2] hover:bg-white/6 hover:text-white min-h-[160px]">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5865f2] text-3xl font-light text-white mb-3">+</span>
            <span className="text-base font-semibold">Add Client</span>
          </button>
        </div>
        <div className="flex-1 min-h-0">
          {selectedClient
            ? <TransactionHistoryCard selectedClient={selectedClient} onAddTransaction={() => setShowTransactionModal(true)}/>
            : <Card className="flex h-full items-center justify-center p-6 text-center">
                <p className="text-white/40">Select a client to view transactions</p>
              </Card>
          }
        </div>
      </div>
    )

    if (activeNav === 'Employees') return (
      <div className="flex flex-col gap-6 h-[calc(100vh-220px)]">
        <div className="grid gap-6" style={{ gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))', maxHeight:'200px', minHeight:'180px' }}>
          {employees.map(e => (
            <PersonCard key={e.id} person={e}
              isSelected={selectedEmployee?.id===e.id}
              onSelect={setSelectedEmployee} label="Employee"/>
          ))}
          <button type="button" onClick={() => setShowEmployeeModal(true)}
            className="flex h-full w-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/3 text-white/40 transition hover:border-[#5865f2] hover:bg-white/6 hover:text-white min-h-[160px]">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5865f2] text-3xl font-light text-white mb-3">+</span>
            <span className="text-base font-semibold">Add Employee</span>
          </button>
        </div>
        <div className="flex-1 min-h-0">
          {selectedEmployee
            ? <EmployeeScheduleCard selectedEmployee={selectedEmployee} onUpdateWorkingDays={handleUpdateWorkingDays}/>
            : <Card className="flex h-full items-center justify-center p-6 text-center">
                <p className="text-white/40">Select an employee to view schedule</p>
              </Card>
          }
        </div>
      </div>
    )

    if (activeNav === 'Finances') return <FinancesPage/>
    if (activeNav === 'Tasks')    return <TasksPage/>
    if (activeNav === 'Settings')       return <Settings/>
    if (activeNav === 'Organizations')  return <Organizations onNavigate={setActiveNav}/>

    return (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-4 gap-5">
          {statCards.map(s => <StatCard key={s.label} {...s}/>)}
        </div>
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-3"><WelcomeCard/></div>
          <div className="col-span-3"><SatisfactionCard/></div>
          <div className="col-span-3"><ReferralCard/></div>
          <div className="col-span-3"><ActiveUsersCard/></div>
        </div>
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-8"><RevenueChart/></div>
          <div className="col-span-4"><OrdersCard/></div>
        </div>
        <ProjectsCard/>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen text-white" style={{ background:'#060818' }}>
      <StarField/>
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ background:'radial-gradient(ellipse 80% 60% at 50% 0%,rgba(88,101,242,0.12) 0%,transparent 70%)' }}/>

      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav}/>

      <div className="relative z-10 ml-[260px] min-h-screen">
        <Topbar title={currentPage.title} onNavigate={setActiveNav}/>
        <main className="px-8 py-6">
          <section className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/30">Workspace</p>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-white">{currentPage.title}</h1>
            <p className="mt-1 text-sm text-white/40">{currentPage.subtitle}</p>
          </section>
          {renderContent()}
        </main>
      </div>

      {/* ── CLIENT MODAL ────────────────────────────────────── */}
      {showClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <Card className="w-full max-w-md p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-white mb-4">Add New Client</h2>
            <input type="text" value={newClientName}
              onChange={e => setNewClientName(e.target.value)}
              onKeyDown={e => e.key==='Enter' && handleCreateClient()}
              placeholder="Enter client name..."
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#5865f2] placeholder-white/25"/>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => { setShowClientModal(false); setNewClientName('') }}
                className="rounded-xl border border-white/10 px-4 py-2 text-white/50 hover:text-white transition">Cancel</button>
              <button type="button" onClick={handleCreateClient}
                className="rounded-xl bg-[#5865f2] px-4 py-2 font-semibold text-white hover:bg-[#6b77ff] transition">Add Client</button>
            </div>
          </Card>
        </div>
      )}

      {/* ── EMPLOYEE MODAL ───────────────────────────────────── */}
      {showEmployeeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <Card className="w-full max-w-md p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-white mb-4">Add New Employee</h2>
            <input type="text" value={newEmployeeName}
              onChange={e => setNewEmployeeName(e.target.value)}
              onKeyDown={e => e.key==='Enter' && handleCreateEmployee()}
              placeholder="Enter employee name..."
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#5865f2] placeholder-white/25"/>
            <p className="mt-3 text-xs text-white/30">Default: no days set. Click days on the calendar to mark working days.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => { setShowEmployeeModal(false); setNewEmployeeName('') }}
                className="rounded-xl border border-white/10 px-4 py-2 text-white/50 hover:text-white transition">Cancel</button>
              <button type="button" onClick={handleCreateEmployee}
                className="rounded-xl bg-[#5865f2] px-4 py-2 font-semibold text-white hover:bg-[#6b77ff] transition">Add Employee</button>
            </div>
          </Card>
        </div>
      )}

      {/* ── TRANSACTION MODAL ────────────────────────────────── */}
      {showTransactionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <Card className="w-full max-w-md p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-white mb-4">Add Transaction</h2>
            <input type="text" value={newTransaction.description}
              onChange={e => setNewTransaction(p => ({...p, description:e.target.value}))}
              placeholder="Transaction name..."
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#5865f2] placeholder-white/25"/>
            <input type="date" value={newTransaction.date}
              onChange={e => setNewTransaction(p => ({...p, date:e.target.value}))}
              className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#5865f2]"/>
            <input type="number" value={newTransaction.amount}
              onChange={e => setNewTransaction(p => ({...p, amount:e.target.value}))}
              placeholder="Amount — positive for incoming, negative for outgoing"
              className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#5865f2] placeholder-white/25"/>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button"
                onClick={() => { setShowTransactionModal(false); setNewTransaction({description:'',date:'',amount:''}) }}
                className="rounded-xl border border-white/10 px-4 py-2 text-white/50 hover:text-white transition">Cancel</button>
              <button type="button" onClick={handleCreateTransaction}
                className="rounded-xl bg-[#5865f2] px-4 py-2 font-semibold text-white hover:bg-[#6b77ff] transition">Add Transaction</button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
