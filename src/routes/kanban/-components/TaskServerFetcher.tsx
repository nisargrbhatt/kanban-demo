import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Spinner } from '@/components/ui/spinner';
import { sleep } from '#/lib/utils';

type Props = {
  children: ReactNode;
};

/**
 * This is a fetcher component which will fetch all the tasks from the database
 * and update the store with the fetched tasks
 * It will use useQuery from Tanstack to fetch and cache the call for initial state.
 */
export function TaskServerFetcher({ children }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  //   const { syncFromDatabase } = useTasksStore(
  //     useShallow((s) => ({ syncFromDatabase: s.syncFromDatabase })),
  //   );

  // Fetch from server tasks data, then update the store
  useEffect(() => {
    const abortController = new AbortController();
    sleep(1000)
      .then(() => {
        //   const tasksFromServer = [];
        //   syncFromDatabase(tasksFromServer);
      })
      .finally(() => {
        setIsLoading(() => false);
      });

    return () => {
      try {
        abortController.abort();
      } catch {}
    };
  }, []);

  if (isLoading) {
    return (
      <Empty className="w-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Spinner />
          </EmptyMedia>
          <EmptyTitle>Processing your request</EmptyTitle>
          <EmptyDescription>
            Please wait while we fetch your tasks from server
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return children;
}
