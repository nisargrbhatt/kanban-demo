import { CircleOffIcon, Home } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Link } from '@tanstack/react-router';

export function NotFound() {
  return (
    <Empty className="h-full bg-muted/30">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CircleOffIcon />
        </EmptyMedia>
        <EmptyTitle>Page not found</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          Page you are looking for is not available.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link to="/">
          <Button variant="outline">
            <Home data-icon="inline-start" />
            Home
          </Button>
        </Link>
      </EmptyContent>
    </Empty>
  );
}
