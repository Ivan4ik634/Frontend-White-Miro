import { boardService } from '@/services/Board.service';
import { uploadService } from '@/services/Upload.service';
import { toPng } from 'html-to-image';

async function savePreview(
  boardId: string,
  editBoard: (
    id: string,
    data: {
      image: string;
      text: string;
    },
  ) => void,
  ref: React.RefObject<HTMLElement | null>,
) {
  const dataUrl = await toPng(ref.current!);
  const blob = await (await fetch(dataUrl)).blob();
  const formData = new FormData();
  formData.append('file', blob);
  const res = await uploadService.uploadFile(formData);

  const board = await boardService.update({ image: res.url }, boardId);

  if ('message' in board) return;

  editBoard(boardId, { image: res.url, text: board.text });
}

export default savePreview;
