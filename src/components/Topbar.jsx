import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Topbar({ title = 'Dashboard', onNavigate }) {
  const [open, setOpen] = useState(false)
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSignOut = () => {
    // Clear any session-related data
    sessionStorage.clear()
    // Navigate back to login page
    navigate('/login')
  }

  const menuItems = [
    {
      icon: (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
      label: 'My Profile',
      action: () => { setOpen(false) },
    },
    {
      icon: (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      ),
      label: 'Settings',
      action: () => { setOpen(false); onNavigate && onNavigate('Settings') },
    },
    {
      icon: (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      ),
      label: 'Notifications',
      action: () => { setOpen(false) },
    },
    { divider: true },
    {
      icon: (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      ),
      label: 'Sign Out',
      danger: true,
      action: () => { setOpen(false); setShowSignOutConfirm(true) },
    },
  ]

  return (
    <>
      <header
        className="sticky top-0 z-40 flex h-[72px] items-center border-b border-white/8 bg-[#060818]/85 px-8 backdrop-blur-xl"
        style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr' }}
      >
        {/* Left spacer */}
        <div />

        {/* Center — BizzBoard branding */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl text-base font-bold text-white shadow-lg"
            style={{ background: '#5865f2', boxShadow: '0 4px 14px rgba(88,101,242,0.4)' }}
          >
            B
          </div>
          <div className="text-left">
            <p className="text-base font-black tracking-tight text-white leading-none">BizzBoard</p>
            <p className="text-[10px] text-white/35 leading-none mt-0.5">Business management hub</p>
          </div>
        </div>

        {/* Right — profile avatar with dropdown */}
        <div className="flex justify-end" ref={dropdownRef}>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen(o => !o)}
              className={`flex h-9 w-9 items-center justify-center rounded-xl border text-sm font-bold text-white transition ${
                open
                  ? 'border-[#5865f2] bg-[#5865f2]/20'
                  : 'border-white/12 bg-white/8 hover:border-white/25 hover:bg-white/15'
              }`}
            >
              RH
            </button>

            {open && (
              <div
                className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-2xl border border-white/10"
                style={{
                  background: 'linear-gradient(145deg,rgba(18,22,38,0.98),rgba(10,12,24,0.98))',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                }}
              >
                {/* Profile header */}
                <div className="flex items-center gap-3 border-b border-white/8 px-4 py-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5865f2] text-sm font-bold text-white">
                    RH
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Ryan H.</p>
                    <p className="text-[10px] text-white/35">ryan@bizzboard.com</p>
                  </div>
                </div>

                {/* Menu items */}
                <div className="p-2">
                  {menuItems.map((item, i) =>
                    item.divider ? (
                      <div key={i} className="my-1.5 h-px bg-white/8" />
                    ) : (
                      <button
                        key={i}
                        type="button"
                        onClick={item.action}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                          item.danger
                            ? 'text-red-400 hover:bg-red-400/10'
                            : 'text-white/70 hover:bg-white/6 hover:text-white'
                        }`}
                      >
                        <span className={item.danger ? 'text-red-400' : 'text-white/40'}>
                          {item.icon}
                        </span>
                        {item.label}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── SIGN OUT CONFIRMATION MODAL ─────────────────────────────── */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div
            className="w-full max-w-sm rounded-2xl border border-white/10 p-6"
            style={{
              background: 'linear-gradient(145deg,rgba(18,22,38,0.98),rgba(10,12,24,0.98))',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            }}
          >
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-400/10 border border-red-400/20">
                <svg className="h-7 w-7 text-red-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </div>
            </div>

            <h2 className="text-lg font-black text-white text-center mb-1">Sign out?</h2>
            <p className="text-sm text-white/40 text-center mb-6">
              You will be returned to the login page.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowSignOutConfirm(false)}
                className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm font-medium text-white/50 transition hover:bg-white/6 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 active:scale-[0.98]"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
