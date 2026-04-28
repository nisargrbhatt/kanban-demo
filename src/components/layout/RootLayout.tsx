import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { Button } from '../ui/button';
import { useAuthContext } from '#/context/AuthContext';
import { Avatar, AvatarFallback } from '../ui/avatar';

type Props = {
  children: ReactNode;
};

export function RootLayout({ children }: Props) {
  const { currentUser } = useAuthContext();

  return (
    <div className="w-full">
      <header className="w-full border-b border-gray-200 px-1">
        <div className="container mx-auto">
          <nav className="flex items-center justify-between py-2 lg:flex">
            <div>
              <Link to={'/'} className="flex items-center justify-start gap-1">
                <span className="font-medium">Kanban</span>
              </Link>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Link to={'/kanban'}>
                <Button variant={'outline'} size={'sm'}>
                  Open Kanban
                </Button>
              </Link>
              <Avatar title={currentUser?.displayName || 'Not Logged In'}>
                <AvatarFallback>
                  {currentUser?.displayName.at(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </nav>
        </div>
      </header>
      <main className="w-full container px-1 mx-auto">{children}</main>
    </div>
  );
}
