export const pageLayouts = {
  Dashboard: {
    modules: [
      {
        id: 'revenue-overview',
        label: 'Revenue Overview',
        sublabel: 'Monthly performance',
      },
      {
        id: 'client-activity',
        label: 'Client Activity',
        sublabel: 'Recent interactions',
      },
      {
        id: 'team-snapshot',
        label: 'Team Snapshot',
        sublabel: 'Attendance, tasks, workload',
      },
    ],
    layout: [
      { i: 'revenue-overview', x: 0, y: 0, w: 6, h: 5 },
      { i: 'client-activity', x: 6, y: 0, w: 6, h: 5 },
      { i: 'team-snapshot', x: 0, y: 5, w: 12, h: 7 },
    ],
  },

  Finances: {
    modules: [
      {
        id: 'cash-flow',
        label: 'Cash Flow',
        sublabel: 'Incoming vs outgoing',
      },
      {
        id: 'invoices',
        label: 'Invoices',
        sublabel: 'Pending and paid',
      },
      {
        id: 'budget-breakdown',
        label: 'Budget Breakdown',
        sublabel: 'Department allocation',
      },
    ],
    layout: [
      { i: 'cash-flow', x: 0, y: 0, w: 6, h: 5 },
      { i: 'invoices', x: 6, y: 0, w: 6, h: 5 },
      { i: 'budget-breakdown', x: 0, y: 5, w: 12, h: 7 },
    ],
  },

  Clients: {
    modules: [
      {
        id: 'client-pipeline',
        label: 'Client Pipeline',
        sublabel: 'Leads and conversions',
      },
      {
        id: 'top-accounts',
        label: 'Top Accounts',
        sublabel: 'Highest value clients',
      },
      {
        id: 'engagement-feed',
        label: 'Engagement Feed',
        sublabel: 'Meetings, notes, follow-ups',
      },
    ],
    layout: [
      { i: 'client-pipeline', x: 0, y: 0, w: 6, h: 5 },
      { i: 'top-accounts', x: 6, y: 0, w: 6, h: 5 },
      { i: 'engagement-feed', x: 0, y: 5, w: 12, h: 7 },
    ],
  },

  Employees: {
    modules: [
      {
        id: 'attendance',
        label: 'Attendance',
        sublabel: 'Today’s status',
      },
      {
        id: 'performance',
        label: 'Performance',
        sublabel: 'Team productivity',
      },
      {
        id: 'department-overview',
        label: 'Department Overview',
        sublabel: 'Role and staffing insights',
      },
    ],
    layout: [
      { i: 'attendance', x: 0, y: 0, w: 6, h: 5 },
      { i: 'performance', x: 6, y: 0, w: 6, h: 5 },
      { i: 'department-overview', x: 0, y: 5, w: 12, h: 7 },
    ],
  },

  Tasks: {
    modules: [
      {
        id: 'task-queue',
        label: 'Task Queue',
        sublabel: 'Open assignments',
      },
      {
        id: 'deadlines',
        label: 'Deadlines',
        sublabel: 'Upcoming due dates',
      },
      {
        id: 'project-progress',
        label: 'Project Progress',
        sublabel: 'Milestones and blockers',
      },
    ],
    layout: [
      { i: 'task-queue', x: 0, y: 0, w: 6, h: 5 },
      { i: 'deadlines', x: 6, y: 0, w: 6, h: 5 },
      { i: 'project-progress', x: 0, y: 5, w: 12, h: 7 },
    ],
  },
}