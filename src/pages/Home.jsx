import { useMemo, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import ModuleCard from '../components/ModuleCard'

const pageContent = {
  Dashboard: {
    title: 'Dashboard',
    subtitle: 'A modular business management hub with a clean default layout.',
    modules: [
      {
        label: 'Revenue Overview',
        sublabel: 'Monthly performance',
      },
      {
        label: 'Client Activity',
        sublabel: 'Recent interactions',
      },
      {
        label: 'Team Snapshot',
        sublabel: 'Attendance, tasks, workload',
      },
    ],
  },
  Finances: {
    title: 'Finances',
    subtitle: 'Track income, expenses, and profitability from one place.',
    modules: [
      {
        label: 'Income',
        sublabel: 'Revenue streams and incoming payments',
      },
      {
        label: 'Expenses',
        sublabel: 'Operational costs and outgoing payments',
      },
      {
        label: 'Profit Breakdown',
        sublabel: 'Net profit, margin trends, and category impact',
      },
    ],
  },
}

export default function Home() {
  const [activeNav, setActiveNav] = useState('Dashboard')

  const currentPage = useMemo(() => {
    return pageContent[activeNav] || pageContent.Dashboard
  }, [activeNav])

  const [topLeft, topRight, bottom] = currentPage.modules

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      <div className="ml-[260px] min-h-screen">
        <Topbar title={currentPage.title} />

        <main className="px-8 py-6">
          <section className="mb-6">
            <p className="text-sm font-medium text-[#6f7891]">
              Adaptive dashboard system
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">
              {currentPage.title}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#8e97ae]">
              {currentPage.subtitle}
            </p>
          </section>

          <section className="grid h-[calc(100vh-220px)] grid-cols-2 grid-rows-[1fr_1.2fr] gap-6">
            <div className="min-h-0">
              <ModuleCard
                label={topLeft.label}
                sublabel={topLeft.sublabel}
                compact
              />
            </div>

            <div className="min-h-0">
              <ModuleCard
                label={topRight.label}
                sublabel={topRight.sublabel}
                compact
              />
            </div>

            <div className="col-span-2 min-h-0">
              <ModuleCard
                label={bottom.label}
                sublabel={bottom.sublabel}
                compact
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}