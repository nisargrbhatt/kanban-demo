import { Avatar, AvatarFallback } from '#/components/ui/avatar';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '#/components/ui/item';
import { MOCK_USERS } from '#/lib/common';
import type { TaskObject } from '#/store/tasks';
import { useDraggable } from '@dnd-kit/react';
import { useNavigate } from '@tanstack/react-router';
import { EditTaskDialog } from './EditTaskDialog';

type Props = {
  task: TaskObject;
};

export function TaskCard({ task }: Props) {
  const { ref } = useDraggable({ id: task.id });
  const navigate = useNavigate({ from: '/kanban/' });

  return (
    <Item ref={ref} variant="outline" className="bg-white">
      <ItemMedia variant="icon">
        <Avatar>
          <AvatarFallback>
            {MOCK_USERS.find((i) => i.id === task.assignee)
              ?.displayName.at(0)
              ?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle
          onClick={() => {
            navigate({
              to: '/kanban',
              search: (s) => ({ ...s, showTaskId: task.id }),
            });
          }}
          className="cursor-pointer underline-offset-4 hover:underline"
        >
          {task.title}
        </ItemTitle>
        <ItemDescription>{task.description}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <EditTaskDialog task={task} />
      </ItemActions>
    </Item>
  );
}
