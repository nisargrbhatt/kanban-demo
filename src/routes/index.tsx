import { useAuthContext } from '#/context/AuthContext';
import { MOCK_USERS } from '#/lib/common';
import { createFileRoute } from '@tanstack/react-router';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';
import { Button } from '#/components/ui/button';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
  const { currentUser, setCurrentUser } = useAuthContext();
  const navigate = Route.useNavigate();

  return (
    <div className="w-full flex flex-col items-start justify-start mx-auto max-w-sm gap-2 py-4">
      {MOCK_USERS.map((u) => (
        <Item variant="outline" key={u.id}>
          <ItemContent>
            <ItemTitle>{u.displayName}</ItemTitle>
            <ItemDescription>
              {currentUser?.id === u.id ? 'Currently Logged' : 'Login'} in as{' '}
              {u.displayName}
            </ItemDescription>
          </ItemContent>
          {currentUser?.id !== u.id ? (
            <ItemActions>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCurrentUser(u.id);
                  navigate({ to: '/kanban' });
                }}
              >
                Login
              </Button>
            </ItemActions>
          ) : null}
        </Item>
      ))}
    </div>
  );
}
