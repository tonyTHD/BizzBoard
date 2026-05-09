import { useState, useRef, useEffect } from 'react'
import { useOrg } from '../context/OrgContext'

const navItems = ['Dashboard', 'Finances', 'Clients', 'Employees', 'Tasks']

function OrgLogo({ org, size = 'md' }) {
  const s = size === 'sm'
    ? 'h-8 w-8 text-sm rounded-xl'
    : 'h-11 w-11 text-lg rounded-2xl'
  return (
    <div className={`flex shrink-0 items-center justify-center font-bold text-white ${s}`}
      style={{ background: org.color, boxShadow: `0 4px 14px ${org.color}44` }}>
      {org.initials}
    </div>
  )
}

export default function Sidebar({ activeNav, setActiveNav }) {
  const { orgs, activeOrg, switchOrg, addOrg } = useOrg()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showAddOrg, setShowAddOrg] = useState(false)
  const [newOrgName, setNewOrgName] = useState('')
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
        setShowAddOrg(false)
        setNewOrgName('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleAddOrg = () => {
    if (!newOrgName.trim()) return
    const colors = ['#6366f1','#ec4899','#14b8a6','#f97316','#8b5cf6','#10b981']
    addOrg({
      name: newOrgName.trim(),
      initials: newOrgName.trim().slice(0,2).toUpperCase(),
      color: colors[orgs.length % colors.length],
      industry: '',
      size: '',
      website: '',
      description: '',
    })
    setNewOrgName('')
    setShowAddOrg(false)
    setDropdownOpen(false)
  }

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[260px] flex-col border-r border-white/8 bg-[#0a0c14] px-5 py-6">

      {/* ── ORG SWITCHER ─────────────────────────────── */}
      <div className="relative mb-8" ref={dropdownRef}>
        <button type="button"
          onClick={() => { setDropdownOpen(o => !o); setShowAddOrg(false); setNewOrgName('') }}
          className="flex w-full items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-3 py-2.5 text-left transition hover:bg-white/8 hover:border-white/15">
          <OrgLogo org={activeOrg}/>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{activeOrg.name}</p>
            <p className="text-xs text-white/35">Organization</p>
          </div>
          <svg className={`h-4 w-4 shrink-0 text-white/30 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>

        {dropdownOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-white/10"
            style={{
              background: 'linear-gradient(145deg,rgba(20,24,40,0.98),rgba(12,15,28,0.98))',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            }}>
            <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
              Switch Organization
            </p>
            <div className="flex flex-col gap-0.5 px-2 pb-2">
              {orgs.map(org => (
                <button key={org.id} type="button"
                  onClick={() => { switchOrg(org.id); setDropdownOpen(false) }}
                  className={`flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition ${
                    activeOrg.id === org.id ? 'bg-white/10' : 'hover:bg-white/6'
                  }`}>
                  <OrgLogo org={org} size="sm"/>
                  <span className="flex-1 truncate text-sm font-medium text-white">{org.name}</span>
                  {activeOrg.id === org.id && (
                    <svg className="h-4 w-4 text-[#5865f2]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>

            <div className="border-t border-white/8 p-2">
              {!showAddOrg ? (
                <button type="button" onClick={() => setShowAddOrg(true)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-white/6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-dashed border-white/20 text-white/40">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-white/50">Add organization</span>
                </button>
              ) : (
                <div className="flex flex-col gap-2 px-1 pt-1 pb-0.5">
                  <input autoFocus type="text" value={newOrgName}
                    onChange={e => setNewOrgName(e.target.value)}
                    onKeyDown={e => e.key==='Enter' && handleAddOrg()}
                    placeholder="Organization name"
                    className="w-full rounded-xl border border-white/15 bg-white/6 px-3 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-[#5865f2]/60"/>
                  <div className="flex gap-2">
                    <button type="button" onClick={handleAddOrg}
                      className="flex-1 rounded-lg bg-[#5865f2] py-1.5 text-xs font-semibold text-white hover:bg-[#6b77ff] transition">
                      Add
                    </button>
                    <button type="button" onClick={() => { setShowAddOrg(false); setNewOrgName('') }}
                      className="flex-1 rounded-lg border border-white/10 py-1.5 text-xs font-medium text-white/50 hover:bg-white/6 transition">
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── NAV LABEL ────────────────────────────────── */}
      <div className="mb-4 px-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/25">Workspace</p>
      </div>

      {/* ── NAV ITEMS ────────────────────────────────── */}
      <nav className="flex flex-col gap-2">
        {navItems.map(item => {
          const isActive = activeNav === item
          return (
            <button key={item} type="button" onClick={() => setActiveNav(item)}
              className={`group flex items-center justify-between rounded-2xl px-4 py-3 text-left transition-all ${
                isActive
                  ? 'bg-white/8 text-white ring-1 ring-white/12'
                  : 'text-white/50 hover:bg-white/5 hover:text-white'
              }`}>
              <div className="flex items-center gap-3">
                <div className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  isActive ? 'bg-[#5865f2]' : 'bg-white/15 group-hover:bg-white/30'
                }`}/>
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

      {/* ── BOTTOM CARD ──────────────────────────────── */}
      <div className="mt-auto rounded-3xl border border-white/8 bg-white/3 p-4">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/25">Organizations</p>
        <h3 className="mt-2 text-sm font-semibold text-white">Manage your workspaces</h3>
        <p className="mt-2 text-xs leading-5 text-white/35">
          Register new businesses and switch between your organizations.
        </p>
        <button onClick={() => setActiveNav('Organizations')}
          className="mt-4 w-full rounded-xl bg-[#5865f2] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6b77ff]">
          Manage Organizations
        </button>
      </div>
    </aside>
  )
}
