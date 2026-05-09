import { useState } from 'react'

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

function Section({ title, description, children }) {
  return (
    <Card className="p-6">
      <div className="mb-5 border-b border-white/8 pb-4">
        <h3 className="text-base font-bold text-white">{title}</h3>
        {description && <p className="mt-1 text-xs text-white/40">{description}</p>}
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </Card>
  )
}

function Toggle({ label, sublabel, value, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        {sublabel && <p className="text-xs text-white/35 mt-0.5">{sublabel}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative h-6 w-11 rounded-full border transition-all duration-200 ${
          value ? 'bg-[#5865f2] border-[#5865f2]' : 'bg-white/10 border-white/15'
        }`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${
          value ? 'left-5' : 'left-0.5'
        }`} />
      </button>
    </div>
  )
}

function SettingRow({ label, sublabel, children }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-white">{label}</p>
        {sublabel && <p className="text-xs text-white/35 mt-0.5">{sublabel}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

const tabs = ['General', 'Profile', 'Notifications', 'Appearance', 'Security']

export default function Settings() {
  const [activeTab, setActiveTab] = useState('General')

  // General
  const [orgName, setOrgName] = useState('BizzBoard HQ')
  const [timezone, setTimezone] = useState('America/Los_Angeles')
  const [language, setLanguage] = useState('English')

  // Profile
  const [displayName, setDisplayName] = useState('Ryan H.')
  const [email, setEmail] = useState('ryan@bizzboard.com')
  const [role, setRole] = useState('Admin')

  // Notifications
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [pushNotifs, setPushNotifs] = useState(false)
  const [weeklyReport, setWeeklyReport] = useState(true)
  const [clientAlerts, setClientAlerts] = useState(true)
  const [transactionAlerts, setTransactionAlerts] = useState(false)

  // Appearance
  const [compactMode, setCompactMode] = useState(false)
  const [showStarfield, setShowStarfield] = useState(true)
  const [accentColor, setAccentColor] = useState('#5865f2')

  // Security
  const [twoFactor, setTwoFactor] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState('30')

  const accentColors = [
    { color: '#5865f2', label: 'Indigo' },
    { color: '#10b981', label: 'Emerald' },
    { color: '#f59e0b', label: 'Amber' },
    { color: '#ef4444', label: 'Red' },
    { color: '#8b5cf6', label: 'Purple' },
    { color: '#06b6d4', label: 'Cyan' },
  ]

  const renderTab = () => {
    if (activeTab === 'General') return (
      <div className="flex flex-col gap-6">
        <Section title="Organization" description="Manage your workspace details.">
          <SettingRow label="Organization Name" sublabel="Displayed across your dashboard">
            <input value={orgName} onChange={e => setOrgName(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#5865f2] w-48"/>
          </SettingRow>
          <SettingRow label="Timezone" sublabel="Used for scheduling and reports">
            <select value={timezone} onChange={e => setTimezone(e.target.value)}
              className="rounded-xl border border-white/10 bg-[#0f1420] px-3 py-2 text-sm text-white outline-none focus:border-[#5865f2] w-48">
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Europe/Paris">Paris (CET)</option>
              <option value="Asia/Tokyo">Tokyo (JST)</option>
            </select>
          </SettingRow>
          <SettingRow label="Language">
            <select value={language} onChange={e => setLanguage(e.target.value)}
              className="rounded-xl border border-white/10 bg-[#0f1420] px-3 py-2 text-sm text-white outline-none focus:border-[#5865f2] w-48">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Portuguese</option>
            </select>
          </SettingRow>
        </Section>

        <Section title="Data" description="Manage your local data and storage.">
          <SettingRow label="Clear Client Data" sublabel="Removes all saved clients and transactions">
            <button type="button"
              onClick={() => { localStorage.removeItem('bizzboard_clients'); window.location.reload() }}
              className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-400/20">
              Clear
            </button>
          </SettingRow>
          <SettingRow label="Clear Employee Data" sublabel="Removes all saved employees and schedules">
            <button type="button"
              onClick={() => { localStorage.removeItem('bizzboard_employees'); window.location.reload() }}
              className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-400/20">
              Clear
            </button>
          </SettingRow>
        </Section>
      </div>
    )

    if (activeTab === 'Profile') return (
      <div className="flex flex-col gap-6">
        <Section title="Personal Information" description="Update your display name and contact details.">
          <SettingRow label="Display Name">
            <input value={displayName} onChange={e => setDisplayName(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#5865f2] w-48"/>
          </SettingRow>
          <SettingRow label="Email Address">
            <input value={email} onChange={e => setEmail(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#5865f2] w-48"/>
          </SettingRow>
          <SettingRow label="Role" sublabel="Your role within the organization">
            <select value={role} onChange={e => setRole(e.target.value)}
              className="rounded-xl border border-white/10 bg-[#0f1420] px-3 py-2 text-sm text-white outline-none focus:border-[#5865f2] w-48">
              <option>Admin</option>
              <option>Manager</option>
              <option>Viewer</option>
            </select>
          </SettingRow>
        </Section>

        <Section title="Avatar" description="Your profile initials are auto-generated from your display name.">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5865f2] text-xl font-black text-white">
              {displayName.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{displayName}</p>
              <p className="text-xs text-white/35 mt-1">{role} · {email}</p>
            </div>
          </div>
        </Section>

        <div className="flex justify-end">
          <button type="button"
            className="rounded-xl bg-[#5865f2] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6b77ff]">
            Save Changes
          </button>
        </div>
      </div>
    )

    if (activeTab === 'Notifications') return (
      <div className="flex flex-col gap-6">
        <Section title="Email Notifications" description="Choose which emails you want to receive.">
          <Toggle label="Email Notifications" sublabel="Receive updates via email" value={emailNotifs} onChange={setEmailNotifs}/>
          <Toggle label="Weekly Summary Report" sublabel="Get a digest every Monday morning" value={weeklyReport} onChange={setWeeklyReport}/>
        </Section>
        <Section title="In-App Alerts" description="Control real-time alerts within the dashboard.">
          <Toggle label="Push Notifications" sublabel="Browser push alerts" value={pushNotifs} onChange={setPushNotifs}/>
          <Toggle label="New Client Alerts" sublabel="Notify when a client is added" value={clientAlerts} onChange={setClientAlerts}/>
          <Toggle label="Transaction Alerts" sublabel="Notify on new transactions" value={transactionAlerts} onChange={setTransactionAlerts}/>
        </Section>
      </div>
    )

    if (activeTab === 'Appearance') return (
      <div className="flex flex-col gap-6">
        <Section title="Layout" description="Customize how the dashboard looks and feels.">
          <Toggle label="Compact Mode" sublabel="Reduce spacing for a denser layout" value={compactMode} onChange={setCompactMode}/>
          <Toggle label="Starfield Background" sublabel="Animated stars in the background" value={showStarfield} onChange={setShowStarfield}/>
        </Section>
        <Section title="Accent Color" description="Choose your primary brand color.">
          <div className="flex gap-3 flex-wrap">
            {accentColors.map(({ color, label }) => (
              <button key={color} type="button" onClick={() => setAccentColor(color)}
                className="flex flex-col items-center gap-2 group">
                <div className={`h-9 w-9 rounded-xl transition-all ${accentColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-[#060818] scale-110' : 'hover:scale-105'}`}
                  style={{ background: color }}/>
                <span className="text-[10px] text-white/30 group-hover:text-white/60 transition">{label}</span>
              </button>
            ))}
          </div>
        </Section>
      </div>
    )

    if (activeTab === 'Security') return (
      <div className="flex flex-col gap-6">
        <Section title="Authentication" description="Manage your login and access security.">
          <Toggle label="Two-Factor Authentication" sublabel="Add an extra layer of security to your account" value={twoFactor} onChange={setTwoFactor}/>
          <SettingRow label="Session Timeout" sublabel="Automatically log out after inactivity">
            <select value={sessionTimeout} onChange={e => setSessionTimeout(e.target.value)}
              className="rounded-xl border border-white/10 bg-[#0f1420] px-3 py-2 text-sm text-white outline-none focus:border-[#5865f2] w-40">
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="240">4 hours</option>
              <option value="0">Never</option>
            </select>
          </SettingRow>
        </Section>
        <Section title="Password" description="Update your account password.">
          <SettingRow label="Current Password">
            <input type="password" placeholder="••••••••"
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#5865f2] w-48 placeholder-white/20"/>
          </SettingRow>
          <SettingRow label="New Password">
            <input type="password" placeholder="••••••••"
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#5865f2] w-48 placeholder-white/20"/>
          </SettingRow>
          <div className="flex justify-end">
            <button type="button"
              className="rounded-xl bg-[#5865f2] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6b77ff]">
              Update Password
            </button>
          </div>
        </Section>
        <Section title="Danger Zone" description="Irreversible actions — proceed with caution.">
          <SettingRow label="Delete Account" sublabel="Permanently remove your account and all data">
            <button type="button"
              className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-400/20">
              Delete Account
            </button>
          </SettingRow>
        </Section>
      </div>
    )
  }

  return (
    <div className="flex gap-8">
      {/* Tab sidebar */}
      <div className="w-44 shrink-0">
        <nav className="flex flex-col gap-1 sticky top-6">
          {tabs.map(tab => (
            <button key={tab} type="button" onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-4 py-2.5 text-left text-sm font-medium transition ${
                activeTab === tab
                  ? 'bg-[#5865f2]/20 text-white border border-[#5865f2]/30'
                  : 'text-white/40 hover:bg-white/5 hover:text-white'
              }`}>
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {renderTab()}
      </div>
    </div>
  )
}
