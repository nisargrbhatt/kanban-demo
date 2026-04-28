import { Avatar, AvatarFallback } from '#/components/ui/avatar';
import { Badge } from '#/components/ui/badge';
import { Button } from '#/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog';
import { useAuthContext } from '#/context/AuthContext';
import { MOCK_USERS } from '#/lib/common';
import { useTasksStore } from '#/store/tasks';
import type { TaskObject } from '#/store/tasks';
import { useNavigate } from '@tanstack/react-router';
import { TrashIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';
import { format } from 'date-fns';

type Props = {
  task: TaskObject;
};

export function TaskDialog({ task }: Props) {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate({ from: '/kanban/' });
  const { delete: deleteTask } = useTasksStore(
    useShallow((s) => ({ delete: s.delete })),
  );

  const assigneeUser = MOCK_USERS.find((i) => i.id === task.assignee);

  const handleDelete = () => {
    deleteTask(task.id);
    toast.success('Kanban', {
      description: 'Task deleted successfully',
    });
  };

  return (
    <Dialog
      open={true}
      defaultOpen={true}
      onOpenChange={() => {
        navigate({
          from: '/kanban/',
          to: '/kanban',
          search: (s) => ({
            ...s,
            showTaskId: undefined,
          }),
        });
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[60vh] overflow-y-auto px-4">
          <div className="flex flex-row justify-start items-center gap-2 mb-2">
            <p className="text-xs font-normal">Status:</p>
            <Badge variant={'outline'} title="Status">
              {task.status}
            </Badge>
          </div>
          <div className="flex flex-row justify-start items-center gap-2 mb-2">
            <p className="text-xs font-normal">Priority:</p>
            <Badge title="Priority">{task.priority}</Badge>
          </div>
          {task.dueDate ? (
            <div className="flex flex-row justify-start items-center gap-2 mb-2">
              <p className="text-xs font-normal">Due Date:</p>
              <Badge
                variant={'outline'}
                title={new Date(task.dueDate).toString()}
              >
                {task.dueDate
                  ? format(task.dueDate, 'dd MMM, yyyy')
                  : 'Not set'}
              </Badge>
            </div>
          ) : null}
          <div className="flex flex-row justify-start items-center gap-2 mb-2">
            <p className="text-xs font-normal">Created at:</p>
            <Badge
              variant={'outline'}
              title={new Date(task.createdAt).toString()}
            >
              {task.createdAt
                ? format(task.createdAt, 'dd MMM, yyyy')
                : 'Not set'}
            </Badge>
          </div>
          <div className="flex flex-row justify-start items-center gap-2 mb-2">
            <p className="text-xs font-normal">Assigned to:</p>
            <Avatar size="sm">
              <AvatarFallback>
                {assigneeUser?.displayName.at(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="font-normal text-xs text-foreground">
              {assigneeUser?.displayName}
            </span>
          </div>
          <p className="text-xs text-foreground">{task.description}</p>

          <h4 className="font-semibold text-sm my-2">Activity</h4>
          {task.history.length > 0 ? (
            <div className="flex flex-col justify-start items-start gap-2 mb-2">
              {task.history.map((his) => {
                if (his.type === 'created') {
                  return (
                    <div key={his.id} className="text-xs font-normal">
                      Task created at:{' '}
                      <strong>
                        {his.metadata?.createdAt
                          ? format(
                              new Date(his.metadata.createdAt),
                              'dd MMM, yyyy',
                            )
                          : 'Not set'}
                      </strong>{' '}
                      by{' '}
                      <strong>
                        {typeof his.metadata?.perpetrator === 'string'
                          ? MOCK_USERS.find(
                              (i) => i.id === his.metadata?.perpetrator,
                            )?.displayName
                          : 'System'}
                      </strong>
                    </div>
                  );
                } else if (his.type === 'valueUpdated') {
                  return (
                    <div key={his.id} className="text-xs font-normal">
                      Task value updated for{' '}
                      <strong>
                        {his.metadata?.fromKey ? his.metadata.fromKey : 'Many'}
                      </strong>{' '}
                      key(s) by{' '}
                      <strong>
                        {typeof his.metadata?.perpetrator === 'string'
                          ? MOCK_USERS.find(
                              (i) => i.id === his.metadata?.perpetrator,
                            )?.displayName
                          : 'System'}
                      </strong>{' '}
                      at{' '}
                      <strong>
                        {his.metadata?.createdAt
                          ? format(
                              new Date(his.metadata.createdAt),
                              'dd MMM, yyyy',
                            )
                          : 'Not set'}
                      </strong>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ) : null}
          {task.history.length < 1 ? (
            <p className="text-xs font-normal text-center">No activity found</p>
          ) : null}
        </div>
        {currentUser?.id === task.assignee ? (
          <DialogFooter>
            <Button
              type="button"
              size="icon-sm"
              variant={'destructive'}
              title="Delete"
              onClick={handleDelete}
            >
              <TrashIcon />
            </Button>
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
