import { TASK_PRIORITY } from '#/lib/common';
import { createFileRoute } from '@tanstack/react-router';
import * as z from 'zod';
import { KanbanFilter } from './-components/KanbanFilter';
import { KanbanBoard } from './-components/KanbanBoard';
import { KanbanOpenWrapper } from './-components/KanbanOpenWrapper';
import { CreateTaskDialog } from './-components/CreateTaskDialog';
import { TaskServerFetcher } from './-components/TaskServerFetcher';

export const Route = createFileRoute('/kanban/')({
  validateSearch: z.object({
    assignee: z.string().optional(),
    title: z.string().trim().optional(),
    priority: z
      .enum([TASK_PRIORITY.low, TASK_PRIORITY.medium, TASK_PRIORITY.high])
      .optional()
      .catch(undefined),
    showTaskId: z.string().optional(),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <TaskServerFetcher>
      <div className="w-full h-full flex flex-col items-start justify-start gap-2">
        <div id="header">
          <h1 className="text-xl font-bold">Your Kanban Board</h1>
          <CreateTaskDialog />
        </div>
        <div id="filter" className="w-full">
          <KanbanFilter />
        </div>
        <div id="kanban" className="w-full">
          <KanbanBoard />
        </div>
        <KanbanOpenWrapper />
      </div>
    </TaskServerFetcher>
  );
}
