import { useSearch } from '@tanstack/react-router';
import { TaskDialog } from './TaskDialog';
import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useTasksStore } from '#/store/tasks';

export function KanbanOpenWrapper() {
  const { showTaskId } = useSearch({ from: '/kanban/' });
  const { tasks } = useTasksStore(useShallow((s) => ({ tasks: s.tasks })));

  const currentTask = useMemo(() => {
    return tasks.find((i) => i.id === showTaskId);
  }, [showTaskId, tasks]);

  if (typeof showTaskId !== 'string' || showTaskId.length < 1 || !currentTask) {
    return null;
  }

  return <TaskDialog task={currentTask} />;
}
