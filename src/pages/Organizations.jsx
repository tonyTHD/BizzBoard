import { useState } from 'react'
import { useOrg } from '../context/OrgContext'

const ACCENT_COLORS = [
  { color: '#5865f2', label: 'Indigo'  },
  { color: '#10b981', label: 'Emerald' },
  { color: '#f59e0b', label: 'Amber'   },
  { color: '#ef4444', label: 'Red'     },
  { color: '#8b5cf6', label: 'Purple'  },
  { color: '#06b6d4', label: 'Cyan'    },
  { color: '#ec4899', label: 'Pink'    },
  { color: '#f97316', label: 'Orange'  },
]

const INDUSTRIES = [
  'Technology', 'Finance', 'Healthcare', 'Retail', 'Education',
  'Real Estate', 'Marketing', 'Consulting', 'Manufacturing', 'Other',
]

const SIZES = ['1-10', '11-50', '51-200', '201-500', '500+']

function Card({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-white/8 ${className}`}
      style={{
        background: 'linear-gradient(145deg,rgba(255,255,255,0.055) 0%,rgba(255,255,255,0.02) 100%)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
      }}>
      {children}
    </div>
  )
}

function OrgLogo({ org, size = 'md' }) {
  const s = size === 'lg' ? 'h-14 w-14 text-2xl rounded-2xl'
          : size === 'sm' ? 'h-8 w-8 text-sm rounded-xl'
          : 'h-11 w-11 text-lg rounded-xl'
  return (
    <div className={`flex shrink-0 items-center justify-center font-bold text-white ${s}`}
      style={{ background: org.color, boxShadow: `0 4px 14px ${org.color}44` }}>
      {org.initials}
    </div>
  )
}

// ── REGISTER MODAL ────────────────────────────────────────────────────────────
function RegisterModal({ onClose, onSuccess }) {
  const { addOrg } = useOrg()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', initials: '', color: '#5865f2',
    industry: '', size: '', website: '', description: '',
  })
  const [errors, setErrors] = useState({})

  const set = (key, val) => {
    setForm(p => ({ ...p, [key]: val }))
    if (errors[key]) setErrors(p => ({ ...p, [key]: '' }))
  }

  const validate1 = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Organization name is required'
    if (!form.initials.trim()) e.initials = 'Initials are required'
    return e
  }

  const validate2 = () => {
    const e = {}
    if (!form.industry) e.industry = 'Please select an industry'
    if (!form.size) e.size = 'Please select a team size'
    return e
  }

  const handleNext = () => {
    const e = step === 1 ? validate1() : {}
    if (Object.keys(e).length) { setErrors(e); return }
    setStep(s => s + 1)
  }

  const handleSubmit = () => {
    const e = validate2()
    if (Object.keys(e).length) { setErrors(e); return }
    const org = addOrg({
      name: form.name.trim(),
      initials: form.initials.trim().slice(0, 2).toUpperCase(),
      color: form.color,
      industry: form.industry,
      size: form.size,
      website: form.website.trim(),
      description: form.description.trim(),
    })
    onSuccess(org)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg">
        <Card className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30 mb-1">
                Step {step} of 3
              </p>
              <h2 className="text-xl font-black text-white">
                {step === 1 ? 'Name your organization'
                : step === 2 ? 'Tell us about it'
                : 'Review & confirm'}
              </h2>
            </div>
            <button type="button" onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 text-white/40 hover:text-white transition">
              ✕
            </button>
          </div>

          {/* Progress bar */}
          <div className="mb-8 flex gap-1.5">
            {[1,2,3].map(n => (
              <div key={n} className="h-1 flex-1 rounded-full overflow-hidden bg-white/10">
                <div className="h-full rounded-full bg-[#5865f2] transition-all duration-300"
                  style={{ width: step >= n ? '100%' : '0%' }}/>
              </div>
            ))}
          </div>

          {/* Step 1 — Identity */}
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/60">Organization Name *</label>
                <input value={form.name}
                  onChange={e => {
                    set('name', e.target.value)
                    if (!form.initials || form.initials === form.name.slice(0,2).toUpperCase()) {
                      set('initials', e.target.value.slice(0,2).toUpperCase())
                    }
                  }}
                  placeholder="e.g. Acme Corp"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#5865f2] placeholder-white/20"/>
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/60">Initials *</label>
                  <input value={form.initials}
                    onChange={e => set('initials', e.target.value.slice(0,2).toUpperCase())}
                    maxLength={2}
                    placeholder="AB"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#5865f2] placeholder-white/20 uppercase tracking-widest text-center text-lg font-bold"/>
                  {errors.initials && <p className="mt-1 text-xs text-red-400">{errors.initials}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/60">Preview</label>
                  <div className="flex h-[50px] items-center gap-3 rounded-xl border border-white/8 bg-white/3 px-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                      style={{ background: form.color }}>
                      {form.initials || '?'}
                    </div>
                    <span className="text-sm font-semibold text-white truncate">{form.name || 'Your Org'}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/60">Brand Color</label>
                <div className="flex gap-2.5 flex-wrap">
                  {ACCENT_COLORS.map(({ color, label }) => (
                    <button key={color} type="button" onClick={() => set('color', color)}
                      title={label}
                      className={`h-8 w-8 rounded-xl transition-all ${form.color === color ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0a0c14] scale-110' : 'hover:scale-105'}`}
                      style={{ background: color }}/>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Details */}
          {step === 2 && (
            <div className="flex flex-col gap-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/60">Industry *</label>
                <div className="grid grid-cols-2 gap-2">
                  {INDUSTRIES.map(ind => (
                    <button key={ind} type="button" onClick={() => set('industry', ind)}
                      className={`rounded-xl border px-3 py-2 text-sm font-medium text-left transition ${
                        form.industry === ind
                          ? 'border-[#5865f2] bg-[#5865f2]/15 text-white'
                          : 'border-white/8 bg-white/3 text-white/50 hover:border-white/20 hover:text-white'
                      }`}>
                      {ind}
                    </button>
                  ))}
                </div>
                {errors.industry && <p className="mt-1 text-xs text-red-400">{errors.industry}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/60">Team Size *</label>
                <div className="flex gap-2 flex-wrap">
                  {SIZES.map(s => (
                    <button key={s} type="button" onClick={() => set('size', s)}
                      className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                        form.size === s
                          ? 'border-[#5865f2] bg-[#5865f2]/15 text-white'
                          : 'border-white/8 bg-white/3 text-white/50 hover:border-white/20 hover:text-white'
                      }`}>
                      {s}
                    </button>
                  ))}
                </div>
                {errors.size && <p className="mt-1 text-xs text-red-400">{errors.size}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/60">Website <span className="text-white/25">(optional)</span></label>
                <input value={form.website} onChange={e => set('website', e.target.value)}
                  placeholder="yourcompany.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#5865f2] placeholder-white/20"/>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/60">Description <span className="text-white/25">(optional)</span></label>
                <textarea value={form.description} onChange={e => set('description', e.target.value)}
                  rows={3} placeholder="What does your organization do?"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#5865f2] placeholder-white/20 resize-none"/>
              </div>
            </div>
          )}

          {/* Step 3 — Review */}
          {step === 3 && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/3 p-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold text-white"
                  style={{ background: form.color, boxShadow: `0 4px 20px ${form.color}55` }}>
                  {form.initials}
                </div>
                <div>
                  <p className="text-lg font-black text-white">{form.name}</p>
                  <p className="text-sm text-white/40">{form.industry} · {form.size} employees</p>
                  {form.website && <p className="text-xs text-white/30 mt-0.5">{form.website}</p>}
                </div>
              </div>

              {form.description && (
                <div className="rounded-xl border border-white/8 bg-white/3 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-1">About</p>
                  <p className="text-sm text-white/60">{form.description}</p>
                </div>
              )}

              <div className="rounded-xl border border-white/8 bg-white/3 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-2">Details</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-white/30">Industry</span><p className="text-white font-medium">{form.industry}</p></div>
                  <div><span className="text-white/30">Team size</span><p className="text-white font-medium">{form.size}</p></div>
                </div>
              </div>

              <p className="text-xs text-white/30 text-center">
                You can edit these details anytime from Settings.
              </p>
            </div>
          )}

          {/* Footer buttons */}
          <div className="mt-8 flex items-center justify-between">
            <button type="button"
              onClick={step === 1 ? onClose : () => setStep(s => s - 1)}
              className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-white/50 transition hover:text-white">
              {step === 1 ? 'Cancel' : '← Back'}
            </button>
            <button type="button"
              onClick={step === 3 ? handleSubmit : handleNext}
              className="rounded-xl bg-[#5865f2] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6b77ff]">
              {step === 3 ? 'Create Organization' : 'Continue →'}
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}

// ── SUCCESS MODAL ─────────────────────────────────────────────────────────────
function SuccessModal({ org, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <Card className="w-full max-w-sm p-8 text-center">
        <div className="flex justify-center mb-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-white"
            style={{ background: org.color, boxShadow: `0 8px 30px ${org.color}55` }}>
            {org.initials}
          </div>
        </div>
        <div className="mb-1 text-2xl">🎉</div>
        <h2 className="text-xl font-black text-white mb-2">Organization Created!</h2>
        <p className="text-sm text-white/40 mb-6">
          <span className="text-white font-semibold">{org.name}</span> has been registered and set as your active workspace.
        </p>
        <button type="button" onClick={onClose}
          className="w-full rounded-xl bg-[#5865f2] py-3 text-sm font-semibold text-white transition hover:bg-[#6b77ff]">
          Go to Dashboard
        </button>
      </Card>
    </div>
  )
}

// ── MAIN ORGANIZATIONS PAGE ───────────────────────────────────────────────────
export default function Organizations({ onNavigate }) {
  const { orgs, activeOrg, switchOrg, deleteOrg } = useOrg()
  const [showRegister, setShowRegister] = useState(false)
  const [successOrg, setSuccessOrg] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const handleSuccess = (org) => {
    setShowRegister(false)
    setSuccessOrg(org)
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30 mb-1">Manage</p>
          <h2 className="text-2xl font-black text-white">Your Organizations</h2>
          <p className="text-sm text-white/40 mt-1">{orgs.length} organization{orgs.length !== 1 ? 's' : ''} registered</p>
        </div>
        <button type="button" onClick={() => setShowRegister(true)}
          className="flex items-center gap-2 rounded-xl bg-[#5865f2] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6b77ff]">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Register Organization
        </button>
      </div>

      {/* Active org highlight */}
      <Card className="p-5" style={{ boxShadow: `0 0 30px ${activeOrg.color}22, 0 8px 32px rgba(0,0,0,0.4)`, borderColor: `${activeOrg.color}40` }}>
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-bold text-white"
            style={{ background: activeOrg.color, boxShadow: `0 4px 20px ${activeOrg.color}55` }}>
            {activeOrg.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-lg font-black text-white">{activeOrg.name}</p>
              <span className="rounded-full bg-[#5865f2]/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#a5b4ff]">Active</span>
            </div>
            <p className="text-sm text-white/40">{activeOrg.industry} · {activeOrg.size} employees</p>
            {activeOrg.description && <p className="text-xs text-white/30 mt-1 truncate">{activeOrg.description}</p>}
          </div>
          <button type="button" onClick={() => onNavigate && onNavigate('Dashboard')}
            className="shrink-0 rounded-xl bg-[#5865f2]/20 border border-[#5865f2]/30 px-4 py-2 text-sm font-semibold text-[#a5b4ff] transition hover:bg-[#5865f2]/30">
            Open Dashboard →
          </button>
        </div>
      </Card>

      {/* All orgs grid */}
      <div className="grid grid-cols-1 gap-4">
        {orgs.map(org => {
          const isActive = org.id === activeOrg.id
          return (
            <Card key={org.id} className={`p-5 transition-all ${isActive ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white"
                  style={{ background: org.color, boxShadow: `0 4px 14px ${org.color}44` }}>
                  {org.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-bold text-white">{org.name}</p>
                  <p className="text-xs text-white/40">{org.industry || 'No industry set'} · {org.size || '?'} employees · Since {org.createdAt}</p>
                  {org.website && <p className="text-xs text-white/25 mt-0.5">{org.website}</p>}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {!isActive && (
                    <button type="button" onClick={() => switchOrg(org.id)}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/60 transition hover:border-[#5865f2] hover:text-white">
                      Switch
                    </button>
                  )}
                  {orgs.length > 1 && !isActive && (
                    <button type="button" onClick={() => setDeleteConfirm(org)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-400/20 bg-red-400/5 text-red-400/60 transition hover:bg-red-400/15 hover:text-red-400">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Empty add card */}
      <button type="button" onClick={() => setShowRegister(true)}
        className="flex items-center gap-4 rounded-2xl border border-dashed border-white/12 bg-white/2 p-5 text-left transition hover:border-[#5865f2]/50 hover:bg-white/4 group">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-dashed border-white/20 text-white/30 group-hover:border-[#5865f2]/50 group-hover:text-[#5865f2] transition">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-white/50 group-hover:text-white transition">Register another organization</p>
          <p className="text-xs text-white/25">Add a new business or workspace to your account</p>
        </div>
      </button>

      {/* Modals */}
      {showRegister && (
        <RegisterModal onClose={() => setShowRegister(false)} onSuccess={handleSuccess}/>
      )}

      {successOrg && (
        <SuccessModal org={successOrg} onClose={() => { setSuccessOrg(null); onNavigate && onNavigate('Dashboard') }}/>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <Card className="w-full max-w-sm p-6">
            <h2 className="text-lg font-bold text-white mb-2">Remove Organization?</h2>
            <p className="text-sm text-white/40 mb-6">
              Are you sure you want to remove <span className="text-white font-semibold">{deleteConfirm.name}</span>? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button type="button" onClick={() => setDeleteConfirm(null)}
                className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm font-medium text-white/50 transition hover:text-white">
                Cancel
              </button>
              <button type="button" onClick={() => { deleteOrg(deleteConfirm.id); setDeleteConfirm(null) }}
                className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600">
                Remove
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
