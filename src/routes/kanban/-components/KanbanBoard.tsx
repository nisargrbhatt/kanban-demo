import { TASK_STATUS } from '#/lib/common';
import { useTasksStore } from '#/store/tasks';
import type { TaskObject } from '#/store/tasks';
import { DragDropProvider } from '@dnd-kit/react';
import { useShallow } from 'zustand/react/shallow';
import { BoardStatusSwim } from './BoardStatusSwim';
import { useMemo } from 'react';
import { useSearch } from '@tanstack/react-router';

export function KanbanBoard() {
  const { assignee, priority, title } = useSearch({ from: '/kanban/' });
  const { tasks, editKey } = useTasksStore(
    useShallow((s) => ({
      tasks: s.tasks,
      editKey: s.editKey,
    })),
  );

  const tasksGroupedByStatus = useMemo(() => {
    const taskStatusMap = new Map<keyof typeof TASK_STATUS, TaskObject[]>();

    for (const task of tasks) {
      if (typeof assignee === 'string' && assignee.trim().length > 0) {
        if (task.assignee !== assignee) {
          continue;
        }
      }
      if (typeof priority === 'string' && priority.trim().length > 0) {
        if (task.priority !== priority) {
          continue;
        }
      }
      if (typeof title === 'string' && title.trim().length > 0) {
        if (!task.title.toLowerCase().match(title)) {
          continue;
        }
      }

      const status = task.status;
      const existingTasks = taskStatusMap.get(status);
      if (!existingTasks) {
        taskStatusMap.set(status, [task]);
      } else {
        taskStatusMap.set(status, [...existingTasks, task]);
      }
    }

    return taskStatusMap;
  }, [tasks, assignee, priority, title]);

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) {
          return;
        }

        const taskId = event.operation.source?.id;
        const status = event.operation.target?.id;

        if (typeof taskId === 'string' && typeof status === 'string') {
          editKey(taskId, 'status', status);
        }
      }}
    >
      <div className="w-full overflow-x-scroll flex flex-row justify-start items-center gap-4">
        {Object.values(TASK_STATUS).map((status) => (
          <BoardStatusSwim
            key={status}
            status={status}
            statusTasks={tasksGroupedByStatus.get(status) ?? []}
          />
        ))}
      </div>
    </DragDropProvider>
  );
}
