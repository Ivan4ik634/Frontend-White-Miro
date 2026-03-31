import { TaskT } from '@/types/Task';
import { useState } from 'react';

interface Props {
  nodes: { tasks: TaskT[] };
  connectingFrom: string;
  mousePos: { x: number; y: number };
  position: { x: number; y: number };
  scale: number;
}

export const Edges: React.FC<Props> = ({ nodes, scale, position, mousePos, connectingFrom }) => {
  const [targetId, setTargetId] = useState('');
  const getPath = (fromX: number, fromY: number, toX: number, toY: number) => {
    const dx = toX - fromX;
    const dy = toY - fromY;
    const offsetX = Math.max(Math.abs(dx) * 0.5, 60);
    const offsetY = Math.max(Math.abs(dy) * 0.5, 60);

    // Направление движения
    const controlX1 = fromX + (dx > 0 ? offsetX : -offsetX);
    const controlY1 = fromY + (dy > 0 ? offsetY / 2 : -offsetY / 2);
    const controlX2 = toX - (dx > 0 ? offsetX : -offsetX);
    const controlY2 = toY - (dy > 0 ? offsetY / 2 : -offsetY / 2);

    return `M ${fromX} ${fromY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${toX} ${toY}`;
  };

  return (
    <svg className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
      {nodes.tasks
        .flatMap((obj) => obj.edges)
        .map((edge, i) => {
          const id = nodes.tasks[i]._id;
          const from = nodes.tasks.find((t) => t._id === edge.from);
          const to = nodes.tasks.find((t) => t._id === edge.to);
          if (!from || !to) return null;

          const fromX = (from.x + 310 / 2) * scale + position.x;
          const fromY = (from.y + 65) * scale + position.y;
          const toX = (to.x + 310 / 2) * scale + position.x;
          const toY = (to.y + 65) * scale + position.y;

          const d = getPath(fromX, fromY, toX, toY);

          return (
            <path
              onClick={() => setTargetId(id)}
              key={i}
              d={d}
              stroke={targetId === id ? '#2e2894' : '#5e57de'}
              strokeWidth={targetId === id ? '4' : '2'}
              fill="none"
              className="curved-animated cursor-pointer"
              markerEnd="url(#arrowhead)"
            />
          );
        })}

      {connectingFrom &&
        (() => {
          const fromTask = nodes.tasks.find((t) => t._id === connectingFrom);
          if (!fromTask) return null;

          const fromX = (fromTask.x + 316 / 2) * scale + position.x;
          const fromY = (fromTask.y + 35) * scale + position.y;
          const toX = mousePos.x;
          const toY = mousePos.y;

          const d = getPath(fromX, fromY, toX, toY);

          return (
            <path
              d={d}
              stroke="#4f46e5"
              strokeWidth={2}
              fill="none"
              strokeDasharray="6"
              className="curved-animated"
            />
          );
        })()}
    </svg>
  );
};
