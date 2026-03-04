import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import ModuleCard from '../components/ModuleCard'

export default function Home() {
  const [activeNav, setActiveNav] = useState('Dashboard')

  return (
    <div className="min-h-screen bg-[#111318] flex">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="flex-1 flex flex-col ml-[180px]">
        <Topbar />
        <main className="p-8 pt-[88px] flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <ModuleCard label="Module of Users Choosing" />
            <ModuleCard label="Module of Users Choosing" />
          </div>
          <ModuleCard
            label="Module of Users Choosing"
            sublabel="(Finances, Clients, Employees, etc)"
            tall
          />
        </main>
      </div>
    </div>
  )
}
