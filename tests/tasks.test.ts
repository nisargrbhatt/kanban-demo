import { describe, it, expect, beforeEach } from 'vitest';
import { useTasksStore } from '#/store/tasks';

describe('Tasks Store', () => {
  beforeEach(() => {
    useTasksStore.setState({
      tasks: [
        {
          id: 'test-task-1',
          title: 'Test Task',
          description: 'A test task',
          assignee: 'user-1',
          priority: 'high',
          status: 'Backlog',
          createdAt: new Date().toJSON(),
          history: [],
        },
      ],
    });
  });

  it('should change task status', () => {
    const store = useTasksStore.getState();
    const taskId = store.tasks[0].id;

    expect(store.tasks[0].status).toBe('Backlog');

    // Change status from Backlog to In Progress
    store.editKey(taskId, 'status', 'In Progress');

    const updatedStore = useTasksStore.getState();
    const updatedTask = updatedStore.tasks.find((t) => t.id === taskId);

    // Verify status changed
    expect(updatedTask).toBeDefined();
    expect(updatedTask?.status).toBe('In Progress');

    // Verify history was added
    expect(updatedTask?.history.length).toBe(1);
    expect(updatedTask?.history[0].type).toBe('valueUpdated');
    expect(updatedTask?.history[0].metadata?.fromKey).toBe('status');
    expect(updatedTask?.history[0].metadata?.fromValue).toBe('Backlog');
  });
});
