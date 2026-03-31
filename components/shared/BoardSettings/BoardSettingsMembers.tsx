import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { boardService } from '@/services/Board.service';
import { BoardT } from '@/types/Board';
import { useState } from 'react';
import { Share } from '../Board/Header/Share';

interface Props {
  board: BoardT;
}

export const BoardSettingsMembers: React.FC<Props> = ({ board }) => {
  const [members, setMembers] = useState(board.members);
  const userId = useAuth();

  const handleKickUser = async (id: string) => {
    setMembers((prev) => prev.filter((member) => member._id !== id));
    await boardService.kick(board._id, { targetUserId: id });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Members</CardTitle>
        <CardDescription>Manage who has access and permissions on this board.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col w-full mb-3 gap-y-3">
          {members.map((member) => (
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-x-3 items-center">
                <Avatar key={member._id} className="w-[35px] h-[35px]">
                  <AvatarFallback>{member.username[0]}</AvatarFallback>
                  <AvatarImage src={member.avatar} />
                </Avatar>
                <div>
                  <p className="font-semibold">{member.username}</p>
                  <p className="text-sm">{member.email}</p>
                </div>
              </div>
              {board.userId !== member._id && board.userId === userId && (
                <Button onClick={() => handleKickUser(member._id)} className="rounded-full">
                  Kick user
                </Button>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center mt-3 justify-between">
          <p className="font-semibold">Share</p>
          <Share board={board}>
            <Button>Open share dialog</Button>
          </Share>
        </div>
      </CardContent>
    </Card>
  );
};
