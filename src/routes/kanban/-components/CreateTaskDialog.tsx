import { MOCK_USERS, TASK_PRIORITY, TASK_STATUS } from '#/lib/common';
import { useId, useState } from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '#/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '#/components/ui/field';
import { Input } from '#/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '#/components/ui/input-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '#/components/ui/popover';
import { Calendar } from '#/components/ui/calendar';
import { useTasksStore } from '#/store/tasks';
import { useShallow } from 'zustand/react/shallow';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '#/components/ui/combobox';
import { toast } from 'sonner';

const assigneeOptions = MOCK_USERS.map((i) => ({
  label: i.displayName,
  value: i.id,
}));

const taskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z
    .string()
    .trim()
    .min(1, 'Description is required')
    .max(100, 'Not more than 100 chars'),
  priority: z.enum([
    TASK_PRIORITY.low,
    TASK_PRIORITY.medium,
    TASK_PRIORITY.high,
  ]),
  status: z.enum([
    TASK_STATUS.Backlog,
    TASK_STATUS['In Progress'],
    TASK_STATUS['In Review'],
    TASK_STATUS.Done,
  ]),
  assignee: z.string().min(1, 'Assignee is required'),
  dueDate: z.date().optional(),
});

export function CreateTaskDialog() {
  const { create } = useTasksStore(
    useShallow((s) => ({
      create: s.create,
    })),
  );
  const formId = useId();
  const [showDialog, setShowDialog] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: TASK_PRIORITY.medium,
      status: TASK_STATUS.Backlog,
      assignee: '',
      dueDate: undefined,
    },
  });

  const onSubmit = form.handleSubmit(
    async (values) => {
      create({
        ...values,
        dueDate: values.dueDate ? values.dueDate.toJSON() : undefined,
      });
      toast.success('Kanban', {
        description: 'Task created successfully',
      });
      setShowDialog(false);
    },
    (e) => {
      console.error('error', e);
    },
  );

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger
        render={
          <Button type="button" variant="outline">
            Create Task
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>This adds task in kanban.</DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[60vh] overflow-y-auto px-4">
          <form className="w-full" id={formId} onSubmit={onSubmit}>
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-title">Title</FieldLabel>
                    <Input
                      {...field}
                      id="form-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Login button not working on mobile"
                      autoComplete="off"
                    />
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                  </Field>
                )}
              />
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-description">
                      Description
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="form-description"
                        placeholder="I'm having an issue with the login button on mobile."
                        rows={6}
                        className="min-h-24 resize-none"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.value.length}/100 characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription>
                      Include steps to reproduce/requirement/expected behavior
                      with detailed doc.
                    </FieldDescription>
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                  </Field>
                )}
              />
              <Controller
                name="priority"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-priority">Priority</FieldLabel>
                    <Select
                      {...field}
                      id="form-priority"
                      onValueChange={(val) => field.onChange(val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Object.keys(TASK_PRIORITY).map((priority) => (
                            <SelectItem key={priority} value={priority}>
                              {priority}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                  </Field>
                )}
              />
              <Controller
                name="status"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-status">Status</FieldLabel>
                    <Select
                      {...field}
                      id="form-status"
                      onValueChange={(val) => field.onChange(val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Object.keys(TASK_STATUS).map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                  </Field>
                )}
              />
              <Controller
                name="dueDate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-dueDate">Due Date</FieldLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger
                        render={
                          <Button
                            variant="outline"
                            id="form-dueDate"
                            className="justify-start font-normal"
                          >
                            {field.value
                              ? field.value.toLocaleDateString()
                              : 'Select date'}
                          </Button>
                        }
                      />

                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          defaultMonth={field.value}
                          captionLayout="dropdown"
                          onSelect={(date) => {
                            field.onChange(date);
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                  </Field>
                )}
              />
              <Controller
                name="assignee"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-assignee">Assignee</FieldLabel>
                    <Combobox
                      items={assigneeOptions}
                      itemToStringLabel={(v) =>
                        assigneeOptions.find((i) => i.value === v)?.label ?? ''
                      }
                      value={field.value}
                      onValueChange={(val) => field.onChange(val)}
                    >
                      <ComboboxInput
                        placeholder="Select Assignee"
                        aria-invalid={fieldState.invalid}
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
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </div>
        <DialogFooter>
          <DialogClose
            render={
              <Button type="button" variant="outline">
                Close
              </Button>
            }
          />
          <Button form={formId} type="submit" onClick={onSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
