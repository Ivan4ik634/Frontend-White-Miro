export function getBoardCoordinates(
  e: React.MouseEvent,
  scale: number,
  position: { x: number; y: number },
) {
  const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
  const x = (e.clientX - rect.left - position.x) / scale;
  const y = (e.clientY - rect.top - position.y) / scale;
  return { x, y };
}
