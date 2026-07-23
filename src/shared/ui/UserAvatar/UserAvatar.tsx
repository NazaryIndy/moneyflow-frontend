import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/shadcn/avatar.tsx';
import type { FC } from 'react';

type UserAvatarProps = {
  icon?: string;
};

const UserAvatar: FC<UserAvatarProps> = ({ icon }) => {
  return (
    <Avatar>
      <AvatarImage src={icon} />
      <AvatarFallback>👤</AvatarFallback>
    </Avatar>
  );
};

export { UserAvatar };
