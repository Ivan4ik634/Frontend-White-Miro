import { COLORS } from '@/data/colors';
import { useAuth } from '@/hooks/useAuth';
import { useOnlineStatus } from '@/store/useOnlineStatus';
import { usePositionUsers } from '@/store/usePositionUsers';

export default function UserCursors({ position }: { position: { x: number; y: number } }) {
  const { positionUsers } = usePositionUsers();
  const { users } = useOnlineStatus();
  const userId = useAuth();

  return (
    <>
      {positionUsers.map((c, i) => {
        const color = i + 1 <= COLORS.length ? COLORS[i] : COLORS[i + 1 - COLORS.length];
        return (
          c.user._id !== userId &&
          users.includes(c.user._id) && (
            <div
              key={c.user._id}
              className="absolute z-10 w-full h-full pointer-events-none select-none transition-transform duration-75"
              style={{
                left: c.x + position.x,
                top: c.y + position.y,
              }}
            >
              <div
                className="w-4 h-4 rounded-full border-2 shadow-md"
                style={{ borderColor: color }}
              ></div>

              <div
                className="text-xs w-[100px] flex items-center  text-white px-1.5 py-0.5 rounded mt-1 font-medium shadow"
                style={{ backgroundColor: color }}
              >
                {c.user.username}
              </div>
            </div>
          )
        );
      })}
    </>
  );
}
