'use client';

import { useTasks } from '@/store/useTasks';
import { TaskT } from '@/types/Task';
import { rectsIntersect } from '@/utils/reatsIntersect';
import { throttle } from '@/utils/throttle';
import { useDebounce } from '@white-black/react-hooks-lib';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { useAuth } from './useAuth';
import { useGetBoard } from './useGetBoard';

export const useBoard = ({ socket }: { socket: Socket }) => {
  const { setBoard, board, isLoading, error } = useGetBoard();
  const param: { id: string } = useParams();

  const userId = useAuth();

  const [tool, setTool] = useState<'grab' | 'cursor'>('grab');
  const [selectionArea, setSelectionArea] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);
  const [selectionTasks, setSelectionTasks] = useState<TaskT[]>([]);
  const [isSelection, setIsSelection] = useState(false);
  const selectionStart = useRef<{ x: number; y: number } | null>(null);

  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });

  const { tasks: nodes, addEdge, editTask } = useTasks();
  const debounce = useDebounce(nodes, 4000);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined' || !board) return;

    const savedPosition = localStorage.getItem(`position ${board._id}`);
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition));
    } else {
      localStorage.setItem(`position ${board._id}`, JSON.stringify({ x: 0, y: 0 }));
    }
  }, [board]);

  useEffect(() => {
    if (typeof window === 'undefined' || !board) return;
    localStorage.setItem(`position ${board._id}`, JSON.stringify(position));
  }, [board, position]);

  const onEndConnect = async (id: string) => {
    console.log(nodes.tasks);
    if (id === connectingFrom) return setConnectingFrom(null);
    if (!connectingFrom || !userId) return;

    //@ts-ignore
    if (nodes.tasks.find((t) => t === connectingFrom)?.edges.find((e) => e.to === id)) return;

    addEdge(connectingFrom, id);

    socket?.emit('task:update', {
      edge: { from: connectingFrom, to: id },
      userId,
      roomId: param.id,
      _id: connectingFrom,
    });
    setConnectingFrom(null);
  };

  const handleMouseUpOnTask = async (toId: string) => {
    if (connectingFrom && connectingFrom !== toId && userId) {
      const connectingFromTask = connectingFrom;

      setConnectingFrom(null);
      addEdge(connectingFromTask, toId);

      socket.emit('task:update', {
        edge: { from: connectingFromTask, to: toId },
        userId,
        roomId: param.id,
        _id: connectingFromTask,
      });
    }
  };

  const handleNodeMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const node = nodes.tasks.find((n) => n._id === id);
    if (!node) return;

    setOffset({ x: e.clientX - node.x, y: e.clientY - node.y });
    setDraggingNode(id);
  };

  const throttledEmit = useMemo(
    () =>
      throttle((e: React.MouseEvent) => {
        const node = nodes.tasks.find((n) => n._id === draggingNode);
        if (!node || !userId) return;

        socket.emit('task:update', {
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
          userId,
          roomId: param.id,
          _id: node._id,
        });
      }, 200),
    [socket, nodes.tasks, draggingNode, scale, position, offset, userId, param.id],
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (tool === 'grab') {
      if (connectingFrom) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
      if (draggingNode !== null) {
        const node = nodes.tasks.find((n) => n._id === draggingNode);
        if (!node) return;

        editTask(node._id, { x: e.clientX - offset.x, y: e.clientY - offset.y });
        throttledEmit(e);
      } else if (isPanning) {
        const dx = e.clientX - panStart.current.x;
        const dy = e.clientY - panStart.current.y;
        setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
        panStart.current = { x: e.clientX, y: e.clientY };
      }
    } else if (isSelection && selectionStart.current) {
      const x = (e.clientX - position.x) / scale;
      const y = (e.clientY - position.y) / scale;

      const newSelection = {
        x: Math.min(x, selectionStart.current.x),
        y: Math.min(y, selectionStart.current.y),
        w: Math.abs(x - selectionStart.current.x),
        h: Math.abs(y - selectionStart.current.y),
      };

      setSelectionArea(newSelection);
    }
  };

  const handleMouseUp = () => {
    if (tool === 'grab') {
      setDraggingNode(null);
      setIsPanning(false);
    } else {
      setIsSelection(false);
      if (!selectionArea) return;
      const selected = nodes.tasks.filter((t) =>
        rectsIntersect(selectionArea, { x: t.x, y: t.y, w: 300, h: 70 }),
      );
      setSelectionTasks(selected);
      console.log(selected);
      selectionStart.current = null;

      setSelectionArea(null);
      setTool('grab');
    }
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
  };

  // 🖱 Панорама всей доски
  const handleBoardMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    if (tool === 'grab') {
      setSelectionTasks([]);
      setIsPanning(true);
      panStart.current = { x: e.clientX, y: e.clientY };
    } else {
      setIsSelection(true);
      const worldX = (e.clientX - position.x) / scale;
      const worldY = (e.clientY - position.y) / scale;
      selectionStart.current = {
        x: worldX,
        y: worldY,
      };
      setSelectionArea({
        x: worldX,
        y: worldY,
        w: 0,
        h: 0,
      });
    }
  };

  // 🔍 Зум колесом мыши
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((prev) => Math.min(3, Math.max(0.4, prev + delta)));
  };

  return {
    nodes,
    isLoading,
    draggingNode,
    offset,
    mousePos,
    connectingFrom,
    scale,
    error,
    position,
    tool,
    debounce,
    isPanning,
    isSelection,
    panStart,
    selectionTasks,
    selectionArea,
    board,
    onEndConnect,
    handleMouseDown,
    setMousePos,
    setTool,
    setConnectingFrom,
    setBoard,
    setPosition,
    handleNodeMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleBoardMouseDown,
    handleWheel,
    handleMouseUpOnTask,
  };
};
