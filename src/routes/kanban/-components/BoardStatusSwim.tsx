import type { TASK_STATUS } from '#/lib/common';
import { cn } from '#/lib/utils';
import type { TaskObject } from '#/store/tasks';
import { useDroppable } from '@dnd-kit/react';
import { TaskCard } from './TaskCard';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '#/components/ui/empty';
import { Trash } from 'lucide-react';

type Props = {
  status: keyof typeof TASK_STATUS;
  statusTasks: TaskObject[];
};

export function BoardStatusSwim({ status, statusTasks }: Props) {
  const { ref, isDropTarget } = useDroppable({ id: status });

  return (
    <div
      ref={ref}
      className={cn(
        'min-w-80 h-[75vh]',
        'flex flex-col items-start justify-start gap-2 border rounded bg-gray-100 ',
        isDropTarget ? 'border-primary shadow bg-gray-100' : null,
      )}
    >
      <div className="w-full p-4 text-center border-b-2">{status}</div>

      <div className="w-full flex-1 flex flex-col items-start justify-start gap-3 px-2 overflow-y-scroll">
        {statusTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {statusTasks.length < 1 ? (
          <Empty className="h-full bg-muted/30">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Trash />
              </EmptyMedia>
              <EmptyTitle>No Tasks</EmptyTitle>
              <EmptyDescription className="max-w-xs text-pretty">
                No task found in {status} state
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : null}
      </div>
    </div>
  );
}
