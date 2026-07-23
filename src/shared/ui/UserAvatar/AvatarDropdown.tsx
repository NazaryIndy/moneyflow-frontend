import { Button } from '@/shared/ui/shadcn/button.tsx';
import { DropdownMenu } from '@/shared/ui/shadcn/dropdown-menu.tsx';
import { UserAvatar } from '@/shared/ui/UserAvatar/UserAvatar.tsx';

import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/shadcn/dropdown-menu.tsx';
import type { User } from '@/entities/user';
import type { FC } from 'react';
import { RoutePath } from '@/app/router/routePaths.tsx';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '@/features/auth/model/authStore/hooks.ts';

type AvatarDropdownProps = {
  user: User;
};

const AvatarDropdown: FC<AvatarDropdownProps> = ({ user }) => {
  const navigate = useNavigate();
  const logout = useLogout();

  const logoutUser = () => {
    logout();
    navigate(RoutePath.login);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full px-2 gap-2">
          <UserAvatar icon={user.icon} />
          <span className="hidden sm:block truncate max-w-32">{user.name}</span>{' '}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" onClick={logoutUser}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { AvatarDropdown };
