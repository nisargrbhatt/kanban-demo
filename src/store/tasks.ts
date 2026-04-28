import { AUTH_COOKIE, MOCK_USERS } from '#/lib/common';
import type { TASK_PRIORITY, TASK_STATUS } from '#/lib/common';
import { create } from 'zustand';
import Cookies from 'js-cookie';

// For localstorage persist
import { persist } from 'zustand/middleware';

export type TaskHistoryObject = {
  id: string;
  type: 'valueUpdated' | 'created' | 'commented';
  metadata?: {
    fromKey?: keyof Omit<TaskObject, 'history' | 'createdAt' | 'id'>;
    fromValue?: string | null;
    /**
     * User Id
     */
    perpetrator?: string;
    createdAt: string;
  };
};

export type TaskObject = {
  id: string;
  title: string;
  description: string;
  /**
   * User Id
   */
  assignee: string;
  priority: keyof typeof TASK_PRIORITY;
  status: keyof typeof TASK_STATUS;
  dueDate?: string | null;
  createdAt: string;
  history: Array<TaskHistoryObject>;
};

export type TasksStore = {
  tasks: Array<TaskObject>;
  create: (task: Omit<TaskObject, 'id' | 'history' | 'createdAt'>) => void;
  editKey: (
    taskId: string,
    keyToEdit: keyof Omit<TaskObject, 'history' | 'createdAt' | 'id'>,
    newValue: string,
  ) => void;
  edit: (
    taskId: string,
    task: Omit<TaskObject, 'id' | 'history' | 'createdAt'>,
  ) => void;
  delete: (taskId: string) => void;
  /**
   * Used to sync data from the server.
   */
  syncFromDatabase: (tasks: Array<TaskObject>) => void;
};

const initialTasks: TaskObject[] = [
  {
    id: crypto.randomUUID(),
    title: 'Set up development environment',
    description:
      'Install dependencies and set up the local development environment.',
    assignee: MOCK_USERS[0].id,
    priority: 'high',
    status: 'Done',
    dueDate: new Date('2026-04-21T10:00:00Z').toJSON(),
    createdAt: new Date('2026-04-20T10:00:00Z').toJSON(),
    history: [
      {
        id: crypto.randomUUID(),
        type: 'created',
        metadata: {
          perpetrator: MOCK_USERS[0].id,
          createdAt: new Date('2026-04-20T10:00:00Z').toJSON(),
        },
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Create Kanban board layout',
    description:
      'Design and implement the main layout for the Kanban board using React and Tailwind.',
    assignee: MOCK_USERS[1].id,
    priority: 'high',
    status: 'In Progress',
    dueDate: new Date('2026-04-25T11:30:00Z').toJSON(),
    createdAt: new Date('2026-04-21T11:30:00Z').toJSON(),
    history: [
      {
        id: crypto.randomUUID(),
        type: 'created',
        metadata: {
          perpetrator: MOCK_USERS[1].id,
          createdAt: new Date('2026-04-21T11:30:00Z').toJSON(),
        },
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Implement drag and drop',
    description: 'Allow users to move tasks between columns smoothly.',
    assignee: MOCK_USERS[2].id,
    priority: 'high',
    status: 'Backlog',
    createdAt: new Date('2026-04-22T09:15:00Z').toJSON(),
    history: [
      {
        id: crypto.randomUUID(),
        type: 'created',
        metadata: {
          perpetrator: MOCK_USERS[2].id,
          createdAt: new Date('2026-04-22T09:15:00Z').toJSON(),
        },
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Add state management',
    description: 'Configure Zustand to manage the state of tasks and users.',
    assignee: MOCK_USERS[3].id,
    priority: 'medium',
    status: 'In Review',
    createdAt: new Date('2026-04-23T14:45:00Z').toJSON(),
    history: [
      {
        id: crypto.randomUUID(),
        type: 'created',
        metadata: {
          perpetrator: MOCK_USERS[3].id,
          createdAt: new Date('2026-04-23T14:45:00Z').toJSON(),
        },
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Design task modal',
    description: 'Create a modal to allow creating new tasks.',
    assignee: MOCK_USERS[4].id,
    priority: 'medium',
    status: 'Backlog',
    createdAt: new Date('2026-04-24T16:20:00Z').toJSON(),
    history: [
      {
        id: crypto.randomUUID(),
        type: 'created',
        metadata: {
          perpetrator: MOCK_USERS[4].id,
          createdAt: new Date('2026-04-24T16:20:00Z').toJSON(),
        },
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Implement filtering',
    description: 'Add a filter bar to view tasks assigned to specific users.',
    assignee: MOCK_USERS[0].id,
    priority: 'low',
    status: 'Backlog',
    createdAt: new Date('2026-04-25T10:05:00Z').toJSON(),
    history: [
      {
        id: crypto.randomUUID(),
        type: 'created',
        metadata: {
          perpetrator: MOCK_USERS[0].id,
          createdAt: new Date('2026-04-25T10:05:00Z').toJSON(),
        },
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Add date picker',
    description: 'Integrate a date picker for due dates.',
    assignee: MOCK_USERS[1].id,
    priority: 'medium',
    status: 'Backlog',
    createdAt: new Date('2026-04-26T13:10:00Z').toJSON(),
    history: [
      {
        id: crypto.randomUUID(),
        type: 'created',
        metadata: {
          perpetrator: MOCK_USERS[1].id,
          createdAt: new Date('2026-04-26T13:10:00Z').toJSON(),
        },
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Fix layout on mobile',
    description: 'Ensure Kanban columns stack correctly on small screens.',
    assignee: MOCK_USERS[2].id,
    priority: 'high',
    status: 'In Progress',
    createdAt: new Date('2026-04-27T08:00:00Z').toJSON(),
    history: [
      {
        id: crypto.randomUUID(),
        type: 'created',
        metadata: {
          perpetrator: MOCK_USERS[2].id,
          createdAt: new Date('2026-04-27T08:00:00Z').toJSON(),
        },
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Write unit tests',
    description: 'Add tests to verify task creation and updates.',
    assignee: MOCK_USERS[3].id,
    priority: 'low',
    status: 'Backlog',
    createdAt: new Date('2026-04-27T09:30:00Z').toJSON(),
    history: [
      {
        id: crypto.randomUUID(),
        type: 'created',
        metadata: {
          perpetrator: MOCK_USERS[3].id,
          createdAt: new Date('2026-04-27T09:30:00Z').toJSON(),
        },
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Set up CI/CD pipeline',
    description: 'Configure GitHub Actions for automated deployment.',
    assignee: MOCK_USERS[4].id,
    priority: 'medium',
    status: 'Backlog',
    createdAt: new Date('2026-04-27T10:45:00Z').toJSON(),
    history: [
      {
        id: crypto.randomUUID(),
        type: 'created',
        metadata: {
          perpetrator: MOCK_USERS[4].id,
          createdAt: new Date('2026-04-27T10:45:00Z').toJSON(),
        },
      },
    ],
  },
];

export const useTasksStore = create<TasksStore>()(
  persist(
    (set, get) => ({
      tasks: initialTasks,
      create: (task) => {
        set((s) => ({
          tasks: [
            ...s.tasks,
            {
              ...task,
              id: crypto.randomUUID(),
              history: [
                {
                  id: crypto.randomUUID(),
                  type: 'created',
                  metadata: {
                    perpetrator: Cookies.get(AUTH_COOKIE),
                    createdAt: new Date().toJSON(),
                  },
                },
              ],
              createdAt: new Date().toJSON(),
            },
          ],
        }));
      },
      editKey: (taskId, keyToEdit, newValue) => {
        const existingTask = get().tasks.find((x) => x.id === taskId);

        if (!existingTask) {
          return;
        }

        set((s) => ({
          tasks: s.tasks.map((t) => {
            if (t.id !== existingTask.id) {
              return t;
            }

            return {
              ...t,
              [keyToEdit]: newValue,
              history: [
                ...t.history,
                {
                  id: crypto.randomUUID(),
                  type: 'valueUpdated',
                  metadata: {
                    fromKey: keyToEdit,
                    fromValue: t[keyToEdit] || null,
                    perpetrator: Cookies.get(AUTH_COOKIE),
                    createdAt: new Date().toJSON(),
                  },
                },
              ],
            };
          }),
        }));
      },
      edit: (taskId, task) => {
        const existingTask = get().tasks.find((x) => x.id === taskId);

        if (!existingTask) {
          return;
        }

        set((s) => ({
          tasks: s.tasks.map((t) => {
            if (t.id !== existingTask.id) {
              return t;
            }

            return {
              ...t,
              ...task,
              history: [
                ...t.history,
                {
                  id: crypto.randomUUID(),
                  type: 'valueUpdated',
                  metadata: {
                    createdAt: new Date().toJSON(),
                  },
                },
              ],
            };
          }),
        }));
      },
      delete: (taskId) => {
        const existingTask = get().tasks.find((x) => x.id === taskId);

        if (!existingTask) {
          return;
        }

        set((s) => ({
          tasks: s.tasks.filter((t) => t.id !== taskId),
        }));
      },
      syncFromDatabase: (tasks) => {
        set({ tasks });
      },
    }),
    { name: 'kanban-tasks' },
  ),
);
