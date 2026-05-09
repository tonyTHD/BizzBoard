import { createContext, useContext, useState } from 'react'

const OrgContext = createContext(null)

const defaultOrgs = [
  {
    id: 1,
    name: 'BizzBoard HQ',
    initials: 'B',
    color: '#5865f2',
    industry: 'Technology',
    size: '11-50',
    website: 'bizzboard.com',
    description: 'The main BizzBoard workspace.',
    createdAt: '2026-01-01',
  },
]

export function OrgProvider({ children }) {
  const [orgs, setOrgs] = useState(() => {
    try {
      const saved = localStorage.getItem('bizzboard_orgs')
      return saved ? JSON.parse(saved) : defaultOrgs
    } catch { return defaultOrgs }
  })

  const [activeOrgId, setActiveOrgId] = useState(() => {
    try {
      const saved = localStorage.getItem('bizzboard_active_org')
      return saved ? Number(saved) : 1
    } catch { return 1 }
  })

  const activeOrg = orgs.find(o => o.id === activeOrgId) || orgs[0]

  const addOrg = (org) => {
    const newOrg = { ...org, id: Date.now(), createdAt: new Date().toISOString().split('T')[0] }
    const updated = [...orgs, newOrg]
    setOrgs(updated)
    setActiveOrgId(newOrg.id)
    localStorage.setItem('bizzboard_orgs', JSON.stringify(updated))
    localStorage.setItem('bizzboard_active_org', String(newOrg.id))
    return newOrg
  }

  const switchOrg = (id) => {
    setActiveOrgId(id)
    localStorage.setItem('bizzboard_active_org', String(id))
  }

  const updateOrg = (id, updates) => {
    const updated = orgs.map(o => o.id === id ? { ...o, ...updates } : o)
    setOrgs(updated)
    localStorage.setItem('bizzboard_orgs', JSON.stringify(updated))
  }

  const deleteOrg = (id) => {
    if (orgs.length <= 1) return
    const updated = orgs.filter(o => o.id !== id)
    setOrgs(updated)
    if (activeOrgId === id) {
      setActiveOrgId(updated[0].id)
      localStorage.setItem('bizzboard_active_org', String(updated[0].id))
    }
    localStorage.setItem('bizzboard_orgs', JSON.stringify(updated))
  }

  return (
    <OrgContext.Provider value={{ orgs, activeOrg, addOrg, switchOrg, updateOrg, deleteOrg }}>
      {children}
    </OrgContext.Provider>
  )
}

export function useOrg() {
  const ctx = useContext(OrgContext)
  if (!ctx) throw new Error('useOrg must be used within OrgProvider')
  return ctx
}
