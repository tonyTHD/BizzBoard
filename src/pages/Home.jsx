import { useMemo, useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import ModuleCard from '../components/ModuleCard'

const pageContent = {
  Dashboard: {
    title: 'Dashboard',
    subtitle: 'A modular business management hub with a clean default layout.',
    modules: [
      { label: 'Revenue Overview', sublabel: 'Monthly performance' },
      { label: 'Client Activity', sublabel: 'Recent interactions' },
      { label: 'Team Snapshot', sublabel: 'Attendance, tasks, workload' },
    ],
  },
  Finances: {
    title: 'Finances',
    subtitle: 'Track income, expenses, and profitability from one place.',
    modules: [
      { label: 'Income', sublabel: 'Revenue streams and incoming payments' },
      { label: 'Expenses', sublabel: 'Operational costs and outgoing payments' },
      { label: 'Profit Breakdown', sublabel: 'Net profit, margin trends, and category impact' },
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

function TransactionHistoryCard({ selectedClient, onAddTransaction }) {
  return (
    <div className="h-full overflow-hidden rounded-[28px] border border-[#232838] bg-[linear-gradient(180deg,#181d2a_0%,#141925_100%)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
      <div className="flex h-full flex-col">
        <div className="mb-5 flex items-center justify-between">
          <div className="w-11" />

          <h3 className="text-2xl font-semibold text-white">
            Transaction History for {selectedClient.name}
          </h3>

          <button
            type="button"
            onClick={onAddTransaction}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5865f2] text-2xl text-white transition hover:bg-[#6b77ff]"
          >
            +
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-1">
          {selectedClient.transactions.length === 0 ? (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-[#33405e] bg-[#111827] text-center">
              <div>
                <h4 className="text-xl font-semibold text-white">No transactions yet</h4>
                <p className="mt-2 text-sm text-[#8f98b0]">
                  Click the plus button to add this client's first transaction.
                </p>
              </div>
            </div>
          ) : (
            selectedClient.transactions.map((transaction) => {
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
            })
          )}
        </div>
      </div>
    </div>
  )
}

function EmployeeScheduleCard({ selectedEmployee, onUpdateWorkingDays }) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const toggleWorkingDay = (day) => {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`
    const newWorkingDays = { ...selectedEmployee.workingDays }

    if (newWorkingDays[dateKey]) {
      delete newWorkingDays[dateKey]
    } else {
      newWorkingDays[dateKey] = true
    }

    onUpdateWorkingDays(newWorkingDays)
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })

  const calendarDays = []
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  return (
    <div className="h-full overflow-hidden rounded-[28px] border border-[#232838] bg-[linear-gradient(180deg,#181d2a_0%,#141925_100%)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
      <div className="flex h-full flex-col">
        <div className="mb-2 text-center">
          <h3 className="text-2xl font-semibold text-white">
            Working Days for {selectedEmployee.name}
          </h3>
          <p className="mt-1 text-xs text-[#7f88a1]">Click days to toggle working schedule</p>
        </div>

        <div className="flex flex-1 items-center justify-center overflow-y-auto">
          <div className="w-full max-w-sm">
            {/* Month Navigation */}
            <div className="mb-3 flex items-center justify-between">
              <button
                onClick={previousMonth}
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#2a3145] bg-[#0f1420] text-sm text-[#8f98b0] hover:border-[#5865f2] hover:text-white"
              >
                ←
              </button>

              <h4 className="text-base font-semibold text-white">{monthName}</h4>

              <button
                onClick={nextMonth}
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#2a3145] bg-[#0f1420] text-sm text-[#8f98b0] hover:border-[#5865f2] hover:text-white"
              >
                →
              </button>
            </div>

            {/* Day Labels */}
            <div className="mb-1 grid grid-cols-7 gap-1">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div key={day} className="flex items-center justify-center text-[10px] font-bold text-[#7f88a1]">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                const dateKey = day ? `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}` : null
                const isWorking = day && selectedEmployee.workingDays[dateKey]

                return (
                  <button
                    key={index}
                    onClick={() => day && toggleWorkingDay(day)}
                    type="button"
                    disabled={!day}
                    className={`flex aspect-square items-center justify-center rounded-md border text-[10px] font-semibold transition ${
                      !day
                        ? 'bg-transparent'
                        : isWorking
                          ? 'border-[#5865f2] bg-[#20294a] text-[#cdd4ff] shadow-[0_0_0_1px_rgba(88,101,242,0.18)] hover:bg-[#2a3356]'
                          : 'border-[#30384f] bg-[#111827] text-[#8f98b0] hover:border-[#3a4a73] hover:bg-[#1a2335]'
                    }`}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [clients, setClients] = useState([])
  const [employees, setEmployees] = useState([])
  const [selectedClient, setSelectedClient] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const [showClientModal, setShowClientModal] = useState(false)
  const [newClientName, setNewClientName] = useState('')

  const [showEmployeeModal, setShowEmployeeModal] = useState(false)
  const [newEmployeeName, setNewEmployeeName] = useState('')

  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    date: '',
    amount: '',
  })

  // Load from localStorage on mount
  useEffect(() => {
    const savedClients = localStorage.getItem('bizzboard_clients')
    const savedEmployees = localStorage.getItem('bizzboard_employees')

    if (savedClients) {
      const parsed = JSON.parse(savedClients)
      setClients(parsed)
      if (parsed.length > 0) {
        setSelectedClient(parsed[0])
      }
    }

    if (savedEmployees) {
      const parsed = JSON.parse(savedEmployees)
      setEmployees(parsed)
      if (parsed.length > 0) {
        setSelectedEmployee(parsed[0])
      }
    }
  }, [])

  // Save clients to localStorage
  useEffect(() => {
    localStorage.setItem('bizzboard_clients', JSON.stringify(clients))
  }, [clients])

  // Save employees to localStorage
  useEffect(() => {
    localStorage.setItem('bizzboard_employees', JSON.stringify(employees))
  }, [employees])

  const currentPage = useMemo(() => {
    return pageContent[activeNav] || pageContent.Dashboard
  }, [activeNav])

  const modules = currentPage.modules || []
  const [topLeft, topRight, bottom] = modules

  const handleCreateClient = () => {
    if (!newClientName.trim()) return

    const newClient = {
      id: Date.now(),
      name: newClientName.trim(),
      transactions: [],
    }

    setClients((prev) => [...prev, newClient])
    setSelectedClient(newClient)
    setNewClientName('')
    setShowClientModal(false)
  }

  const handleCreateEmployee = () => {
    if (!newEmployeeName.trim()) return

    const newEmployee = {
      id: Date.now(),
      name: newEmployeeName.trim(),
      workingDays: [true, true, true, true, true, false, false], // Mon-Fri by default
    }

    setEmployees((prev) => [...prev, newEmployee])
    setSelectedEmployee(newEmployee)
    setNewEmployeeName('')
    setShowEmployeeModal(false)
  }

  const handleCreateTransaction = () => {
    if (
      !selectedClient ||
      !newTransaction.description.trim() ||
      !newTransaction.date ||
      !newTransaction.amount
    ) {
      return
    }

    const amountNumber = Number(newTransaction.amount)

    const formattedAmount =
      amountNumber >= 0
        ? `+$${Math.abs(amountNumber).toLocaleString()}`
        : `-$${Math.abs(amountNumber).toLocaleString()}`

    const transaction = {
      id: `T-${Date.now().toString().slice(-4)}`,
      date: newTransaction.date,
      description: newTransaction.description.trim(),
      amount: formattedAmount,
    }

    setClients((prev) =>
      prev.map((client) =>
        client.id === selectedClient.id
          ? { ...client, transactions: [...client.transactions, transaction] }
          : client
      )
    )

    setSelectedClient((prev) => ({
      ...prev,
      transactions: [...prev.transactions, transaction],
    }))

    setNewTransaction({
      description: '',
      date: '',
      amount: '',
    })

    setShowTransactionModal(false)
  }

  const handleUpdateWorkingDays = (newWorkingDays) => {
    const updatedEmployee = {
      ...selectedEmployee,
      workingDays: newWorkingDays,
    }

    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === selectedEmployee.id ? updatedEmployee : emp
      )
    )

    setSelectedEmployee(updatedEmployee)
  }

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
            <section className="grid h-[calc(100vh-220px)] grid-rows-[220px_1fr] gap-6">
              <div className="grid min-h-0 grid-cols-3 gap-6">
                {clients.map((client) => (
                  <PersonCard
                    key={client.id}
                    person={client}
                    isSelected={selectedClient?.id === client.id}
                    onSelect={setSelectedClient}
                    label="Client"
                  />
                ))}

                <button
                  type="button"
                  onClick={() => setShowClientModal(true)}
                  className="flex h-full w-full flex-col items-center justify-center rounded-[28px] border border-dashed border-[#33405e] bg-[#111827] text-[#8f98b0] transition hover:border-[#5865f2] hover:bg-[#151b2a] hover:text-white"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#5865f2] text-4xl font-light text-white">
                    +
                  </span>
                  <span className="mt-5 text-xl font-semibold">Add Client</span>
                </button>
              </div>

              <div className="min-h-0">
                {selectedClient ? (
                  <TransactionHistoryCard
                    selectedClient={selectedClient}
                    onAddTransaction={() => setShowTransactionModal(true)}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center rounded-[28px] border border-[#232838] bg-[linear-gradient(180deg,#181d2a_0%,#141925_100%)] p-6 text-center">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">
                        No client selected
                      </h3>
                      <p className="mt-3 text-[#8f98b0]">
                        Add a client to start tracking transaction history.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          ) : activeNav === 'Employees' ? (
            <section className="grid h-[calc(100vh-220px)] grid-cols-12 grid-rows-[180px_1fr] gap-6">
              {employees.map((employee) => (
                <div key={employee.id} className="col-span-4 min-h-0">
                  <PersonCard
                    person={employee}
                    isSelected={selectedEmployee?.id === employee.id}
                    onSelect={setSelectedEmployee}
                    label="Employee"
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={() => setShowEmployeeModal(true)}
                className="col-span-4 flex h-full w-full flex-col items-center justify-center rounded-[28px] border border-dashed border-[#33405e] bg-[#111827] text-[#8f98b0] transition hover:border-[#5865f2] hover:bg-[#151b2a] hover:text-white"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#5865f2] text-4xl font-light text-white">
                  +
                </span>
                <span className="mt-5 text-xl font-semibold">Add Employee</span>
              </button>

              <div className="col-span-12 min-h-0">
                {selectedEmployee ? (
                  <EmployeeScheduleCard
                    selectedEmployee={selectedEmployee}
                    onUpdateWorkingDays={handleUpdateWorkingDays}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center rounded-[28px] border border-[#232838] bg-[linear-gradient(180deg,#181d2a_0%,#141925_100%)] p-6 text-center">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">
                        No employee selected
                      </h3>
                      <p className="mt-3 text-[#8f98b0]">
                        Add an employee to start managing their schedule.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          ) : (
            <section className="grid h-[calc(100vh-220px)] grid-cols-2 grid-rows-[1fr_1.2fr] gap-6">
              <div className="min-h-0">
                <ModuleCard label={topLeft.label} sublabel={topLeft.sublabel} compact />
              </div>

              <div className="min-h-0">
                <ModuleCard label={topRight.label} sublabel={topRight.sublabel} compact />
              </div>

              <div className="col-span-2 min-h-0">
                <ModuleCard label={bottom.label} sublabel={bottom.sublabel} compact />
              </div>
            </section>
          )}
        </main>
      </div>

      {showClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-[#2a3145] bg-[#141925] p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-white">Add New Client</h2>

            <input
              type="text"
              value={newClientName}
              onChange={(e) => setNewClientName(e.target.value)}
              placeholder="Enter client name..."
              className="mt-4 w-full rounded-xl border border-[#2a3145] bg-[#0f1420] px-4 py-3 text-white outline-none focus:border-[#5865f2]"
            />

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowClientModal(false)
                  setNewClientName('')
                }}
                className="rounded-xl border border-[#2a3145] px-4 py-2 text-[#8f98b0] hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateClient}
                className="rounded-xl bg-[#5865f2] px-4 py-2 font-semibold text-white hover:bg-[#6b77ff]"
              >
                Add Client
              </button>
            </div>
          </div>
        </div>
      )}

      {showEmployeeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-[#2a3145] bg-[#141925] p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-white">Add New Employee</h2>

            <input
              type="text"
              value={newEmployeeName}
              onChange={(e) => setNewEmployeeName(e.target.value)}
              placeholder="Enter employee name..."
              className="mt-4 w-full rounded-xl border border-[#2a3145] bg-[#0f1420] px-4 py-3 text-white outline-none focus:border-[#5865f2]"
            />

            <p className="mt-4 text-sm text-[#8f98b0]">Default: Mon-Fri working days. Customize after adding.</p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowEmployeeModal(false)
                  setNewEmployeeName('')
                }}
                className="rounded-xl border border-[#2a3145] px-4 py-2 text-[#8f98b0] hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateEmployee}
                className="rounded-xl bg-[#5865f2] px-4 py-2 font-semibold text-white hover:bg-[#6b77ff]"
              >
                Add Employee
              </button>
            </div>
          </div>
        </div>
      )}

      {showTransactionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-[#2a3145] bg-[#141925] p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-white">Add Transaction</h2>

            <input
              type="text"
              value={newTransaction.description}
              onChange={(e) =>
                setNewTransaction((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Transaction name..."
              className="mt-4 w-full rounded-xl border border-[#2a3145] bg-[#0f1420] px-4 py-3 text-white outline-none focus:border-[#5865f2]"
            />

            <input
              type="date"
              value={newTransaction.date}
              onChange={(e) =>
                setNewTransaction((prev) => ({
                  ...prev,
                  date: e.target.value,
                }))
              }
              className="mt-4 w-full rounded-xl border border-[#2a3145] bg-[#0f1420] px-4 py-3 text-white outline-none focus:border-[#5865f2]"
            />

            <input
              type="number"
              value={newTransaction.amount}
              onChange={(e) =>
                setNewTransaction((prev) => ({
                  ...prev,
                  amount: e.target.value,
                }))
              }
              placeholder="Amount, e.g. 2500 or -150"
              className="mt-4 w-full rounded-xl border border-[#2a3145] bg-[#0f1420] px-4 py-3 text-white outline-none focus:border-[#5865f2]"
            />

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowTransactionModal(false)
                  setNewTransaction({
                    description: '',
                    date: '',
                    amount: '',
                  })
                }}
                className="rounded-xl border border-[#2a3145] px-4 py-2 text-[#8f98b0] hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateTransaction}
                className="rounded-xl bg-[#5865f2] px-4 py-2 font-semibold text-white hover:bg-[#6b77ff]"
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}