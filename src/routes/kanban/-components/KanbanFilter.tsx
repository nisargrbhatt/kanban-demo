import { Input } from '#/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select';
import { MOCK_USERS, TASK_PRIORITY } from '#/lib/common';
import { useSearch, useNavigate } from '@tanstack/react-router';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '#/components/ui/combobox';

const priorityOptions = [
  { label: 'Select a Priority', value: null },
  ...Object.values(TASK_PRIORITY).map((i) => ({
    label: i,
    value: i,
  })),
];

const assigneeOptions = MOCK_USERS.map((i) => ({
  label: i.displayName,
  value: i.id,
}));

export function KanbanFilter() {
  const { assignee, title, priority } = useSearch({ from: '/kanban/' });
  const navigate = useNavigate({ from: '/kanban/' });

  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-start gap-2">
      <Input
        name="search"
        id={'search'}
        type="search"
        placeholder="Search title"
        defaultValue={title}
        onChange={(e) => {
          const newValue = e.target.value;
          navigate({
            to: '/kanban',
            from: '/kanban/',
            search: (s) => ({
              ...s,
              title: newValue || undefined,
            }),
          });
        }}
      />
      <Select
        items={priorityOptions}
        defaultValue={priority}
        onValueChange={(newValue) => {
          navigate({
            to: '/kanban',
            from: '/kanban/',
            search: (s) => ({
              ...s,
              priority: newValue ?? undefined,
            }),
          });
        }}
      >
        <SelectTrigger className="w-full max-w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Priority</SelectLabel>

            {priorityOptions.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className={'capitalize'}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Combobox
        items={assigneeOptions}
        defaultValue={assignee}
        itemToStringLabel={(v) =>
          assigneeOptions.find((i) => i.value === v)?.label ?? ''
        }
        onValueChange={(newValue) => {
          navigate({
            to: '/kanban',
            from: '/kanban/',
            search: (s) => ({
              ...s,
              assignee: newValue ?? undefined,
            }),
          });
        }}
      >
        <ComboboxInput
          placeholder="Select Assignee"
          className={'min-w-35'}
          showClear
        />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.value} value={item.value}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
