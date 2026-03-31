import { TaskT } from '@/types/Task';
import { SetStateAction } from 'react';

export function smoothMoveNode(
  setPosition: React.Dispatch<SetStateAction<{ x: number; y: number }>>,
  getNodes: () => { tasks: TaskT[]; boardId: string },
  nodeId: string,
  targetX: number,
  targetY: number,
  duration: number = 500,
) {
  const nodes = getNodes();
  const node = nodes.tasks.find((n) => n._id === nodeId);
  if (!node) return;

  // начальные координаты таски
  const startX = node.x;
  const startY = node.y;

  // размеры таски (если они у тебя хранятся)
  const width = 300;
  const height = 70;

  // сдвигаем цель так, чтобы совпал центр
  const adjustedTargetX = targetX - width / 2;
  const adjustedTargetY = targetY - height / 2;

  const start = performance.now();

  const animate = (time: number) => {
    const progress = Math.min((time - start) / duration, 1);
    const easeInOut = (t: number) => 0.5 * (1 - Math.cos(Math.PI * t));
    const eased = easeInOut(progress);

    const newX = startX + (adjustedTargetX - startX) * eased;
    const newY = startY + (adjustedTargetY - startY) * eased;

    setPosition({ x: newX, y: newY });

    if (progress < 1) requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
}
