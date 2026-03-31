'use client';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { Textarea } from '@/components/ui/textarea';
import { useUploadFile } from '@/hooks/useUploadFile';
import { boardService } from '@/services/Board.service';
import { useBoards } from '@/store/useBoards';
import { BoardT } from '@/types/Board';
import { UploadCloud } from 'lucide-react';
import { ReactNode, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

interface Props {
  type: 'add' | 'edit';
  board?: BoardT;
  children: ReactNode;
}

export const BoardDialog: React.FC<Props> = ({ type, board, children }) => {
  const { t } = useTranslation();
  const title = t(type === 'add' ? 'add_board' : 'edit_board');
  const [form, setForm] = useState({
    text: board?.text ?? '',
    title: board?.title ?? '',
    tags: board?.tags.join(',') ?? '',
    image: board?.image ?? '',
  });
  const [status, setStatus] = useState(board?.status ?? 'in planning');
  const [access, setAccess] = useState<'locked' | 'public'>(board?.access ?? 'locked');

  const [loading, setLoading] = useState(false);

  const { handleDeleteImage, handleUploadImage, ref } = useUploadFile((url) =>
    setForm((prev) => ({ ...prev, image: url })),
  );
  const { addBoard, editBoard } = useBoards();

  const onSubmit = async () => {
    setLoading(true);
    const res =
      type === 'add'
        ? await boardService.create({ ...form, tags: form.tags.split(','), status, access })
        : await boardService.update(
            { ...form, tags: form.tags.split(','), status, access },
            board!._id,
          );
    setLoading(false);

    if ('message' in res) return toast.error(res.message);

    type === 'add' ? addBoard(res) : editBoard(board!._id, res);
    setForm(() => ({ text: '', title: '', image: '', tags: '' }));
  };
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <div className="w-full gap-y-2 flex flex-col  my-3">
          <div className="mb-3">
            <div className="flex items-center mb-3 justify-between">
              <Button onClick={() => ref.current?.click()}>
                <UploadCloud />
                {t('add_image')}
              </Button>
              <input ref={ref} type="file" className="hidden" onChange={handleUploadImage} />
              {form.image && (
                <Button onClick={handleDeleteImage} variant={'destructive'}>
                  {t('delete_image')}
                </Button>
              )}
            </div>
            {form.image && <img src={form.image} className="w-full rounded-[8px] aspect-video" />}
          </div>
          <Input
            disabled={loading}
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Title..."
          />
          <Textarea
            placeholder="Text..."
            value={form.text}
            className="h-[150px] resize-none"
            onChange={(e) => setForm((prev) => ({ ...prev, text: e.target.value }))}
            disabled={loading}
          />
          <Textarea
            placeholder="Tags..."
            value={form.tags}
            className="h-[150px] resize-none"
            onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
            disabled={loading}
          />
          <div className="flex items-center gap-x-2">
            <Select value={access} onValueChange={(v: 'locked' | 'public') => setAccess(v)}>
              <SelectTrigger>
                <SelectValue placeholder={t('access')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="locked">{t('locked_access')}</SelectItem>
                <SelectItem value="public">{t('public_access')}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={(v) => setStatus(v)}>
              <SelectTrigger>
                <SelectValue placeholder={t('access')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in planning">In planning</SelectItem>
                <SelectItem value="done">Done</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
                <SelectItem value="action">Action</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button disabled={loading || !form.text || !form.title} onClick={onSubmit}>
            {t('save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
