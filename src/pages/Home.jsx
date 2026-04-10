import { useMemo, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import ModuleCard from '../components/ModuleCard'

const clients = [
  {
    id: 1,
    name: 'Client 1',
    transactions: [
      { id: 'T-1001', date: '2026-04-01', description: 'Website redesign deposit', amount: '+$2,400' },
      { id: 'T-1002', date: '2026-04-03', description: 'Brand consultation', amount: '+$850' },
      { id: 'T-1003', date: '2026-04-08', description: 'Revision credit', amount: '-$150' },
      { id: 'T-1004', date: '2026-04-12', description: 'Final project payment', amount: '+$3,200' },
    ],
  },
  {
    id: 2,
    name: 'Client 2',
    transactions: [
      { id: 'T-2001', date: '2026-04-02', description: 'Monthly retainer', amount: '+$1,500' },
      { id: 'T-2002', date: '2026-04-06', description: 'Ad campaign setup', amount: '+$1,250' },
      { id: 'T-2003', date: '2026-04-09', description: 'Refund adjustment', amount: '-$200' },
      { id: 'T-2004', date: '2026-04-14', description: 'Analytics reporting', amount: '+$600' },
    ],
  },
  {
    id: 3,
    name: 'Client 3',
    transactions: [
      { id: 'T-3001', date: '2026-04-04', description: 'Mobile app prototype', amount: '+$4,100' },
      { id: 'T-3002', date: '2026-04-07', description: 'UI expansion phase', amount: '+$1,900' },
      { id: 'T-3003', date: '2026-04-11', description: 'Scope reduction adjustment', amount: '-$300' },
      { id: 'T-3004', date: '2026-04-15', description: 'Testing and QA invoice', amount: '+$1,150' },
    ],
  },
]

const employees = [
  { id: 1, name: 'Employee 1' },
  { id: 2, name: 'Employee 2' },
  { id: 3, name: 'Employee 3' },
]

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
  Clients: {
    title: 'Clients',
    subtitle: 'Browse client profiles and review recent transaction activity.',
  },
  Employees: {
    title: 'Employees',
    subtitle: 'Browse employee profiles and preview schedule availability.',
  },
}

function PersonCard({ person, isSelected, onSelect, label = 'Client' }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(person)}
      className={`flex h-full w-full flex-col items-center justify-center rounded-[28px] border p-6 text-center transition-all ${
        isSelected
          ? 'border-[#5865f2] bg-[linear-gradient(180deg,#1b2133_0%,#151a27_100%)] shadow-[0_0_0_2px_rgba(88,101,242,0.22)]'
          : 'border-[#232838] bg-[linear-gradient(180deg,#181d2a_0%,#141925_100%)] hover:border-[#33405e]'
      }`}
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#2d3650] bg-[#20283a]">
        <svg viewBox="0 0 24 24" className="h-9 w-9 fill-[#aeb6cc]">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>
      </div>

      <span className="text-2xl font-semibold text-white">{person.name}</span>
      <span className="mt-2 text-sm text-[#7f88a1]">{label}</span>
    </button>
  )
}

function TransactionHistoryCard({ selectedClient }) {
  return (
    <div className="h-full overflow-hidden rounded-[28px] border border-[#232838] bg-[linear-gradient(180deg,#181d2a_0%,#141925_100%)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
      <div className="flex h-full flex-col">
        <div className="mb-5 text-center">
          <h3 className="text-2xl font-semibold text-white">
            Transaction History for {selectedClient.name}
          </h3>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-4">
          {selectedClient.transactions.map((transaction) => {
            const positive = transaction.amount.startsWith('+')

            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between rounded-2xl border border-[#27304a] bg-[#111827] px-5 py-4 transition hover:border-[#3a4a73] hover:bg-[#141c2c]"
              >
                <div className="min-w-0">
                  <p className="text-base font-semibold text-white">
                    {transaction.description}
                  </p>
                  <p className="mt-1 text-sm text-[#7f88a1]">
                    {transaction.id} • {transaction.date}
                  </p>
                </div>

                <span
                  className={`ml-4 shrink-0 text-base font-bold ${
                    positive ? 'text-[#6f86ff]' : 'text-[#ff6b6b]'
                  }`}
                >
                  {transaction.amount}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function EmployeeCalendarCard({ selectedEmployee }) {
  const fakeDays = Array.from({ length: 28 }, (_, index) => index + 1)

  return (
    <div className="h-full overflow-hidden rounded-[28px] border border-[#232838] bg-[linear-gradient(180deg,#181d2a_0%,#141925_100%)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
      <div className="flex h-full flex-col">
        <div className="mb-5 text-center">
          <h3 className="text-2xl font-semibold text-white">
            Calendar for {selectedEmployee.name}
          </h3>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-4xl rounded-[24px] border border-[#2b3349] bg-[#121826] p-5">
            <div className="mb-4 grid grid-cols-7 gap-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#6f7891]">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

            <div className="grid grid-cols-7 gap-3">
              {fakeDays.map((day) => (
                <div
                  key={day}
                  className={`aspect-square rounded-2xl border ${
                    day === 8 || day === 12 || day === 19
                      ? 'border-[#5865f2] bg-[#20294a] shadow-[0_0_0_1px_rgba(88,101,242,0.18)]'
                      : 'border-[#30384f] bg-[#d9d9d9]'
                  } flex items-center justify-center text-sm font-semibold ${
                    day === 8 || day === 12 || day === 19
                      ? 'text-[#cdd4ff]'
                      : 'text-[#1a1f2d]'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [selectedClient, setSelectedClient] = useState(clients[0])
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0])

  const currentPage = useMemo(() => {
    return pageContent[activeNav] || pageContent.Dashboard
  }, [activeNav])

  const modules = currentPage.modules || []
  const [topLeft, topRight, bottom] = modules

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

          {activeNav === 'Clients' ? (
            <section className="grid h-[calc(100vh-220px)] grid-cols-12 grid-rows-[180px_1fr] gap-6">
              <div className="col-span-4 min-h-0">
                <PersonCard
                  person={clients[0]}
                  isSelected={selectedClient.id === clients[0].id}
                  onSelect={setSelectedClient}
                  label="Client"
                />
              </div>

              <div className="col-span-4 min-h-0">
                <PersonCard
                  person={clients[1]}
                  isSelected={selectedClient.id === clients[1].id}
                  onSelect={setSelectedClient}
                  label="Client"
                />
              </div>

              <div className="col-span-4 min-h-0">
                <PersonCard
                  person={clients[2]}
                  isSelected={selectedClient.id === clients[2].id}
                  onSelect={setSelectedClient}
                  label="Client"
                />
              </div>

              <div className="col-span-12 min-h-0">
                <TransactionHistoryCard selectedClient={selectedClient} />
              </div>
            </section>
          ) : activeNav === 'Employees' ? (
            <section className="grid h-[calc(100vh-220px)] grid-cols-12 grid-rows-[180px_1fr] gap-6">
              <div className="col-span-4 min-h-0">
                <PersonCard
                  person={employees[0]}
                  isSelected={selectedEmployee.id === employees[0].id}
                  onSelect={setSelectedEmployee}
                  label="Employee"
                />
              </div>

              <div className="col-span-4 min-h-0">
                <PersonCard
                  person={employees[1]}
                  isSelected={selectedEmployee.id === employees[1].id}
                  onSelect={setSelectedEmployee}
                  label="Employee"
                />
              </div>

              <div className="col-span-4 min-h-0">
                <PersonCard
                  person={employees[2]}
                  isSelected={selectedEmployee.id === employees[2].id}
                  onSelect={setSelectedEmployee}
                  label="Employee"
                />
              </div>

              <div className="col-span-12 min-h-0">
                <EmployeeCalendarCard selectedEmployee={selectedEmployee} />
              </div>
            </section>
          ) : (
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
          )}
        </main>
      </div>
    </div>
  )
}