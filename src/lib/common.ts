export const TASK_PRIORITY = {
  low: 'low',
  medium: 'medium',
  high: 'high',
} as const;

export const TASK_STATUS = {
  Backlog: 'Backlog',
  'In Progress': 'In Progress',
  'In Review': 'In Review',
  Done: 'Done',
} as const;

export const MOCK_USERS = [
  {
    id: '1',
    displayName: 'Doraemon',
  },
  {
    id: '2',
    displayName: 'Nobita',
  },
  {
    id: '3',
    displayName: 'Sunio',
  },
  {
    id: '4',
    displayName: 'Gian',
  },
  {
    id: '5',
    displayName: 'Shizuka',
  },
] as const;

export const AUTH_COOKIE = 'auth-user' as const;
