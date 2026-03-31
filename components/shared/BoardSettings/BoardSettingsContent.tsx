import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/ui';
import { useUploadFile } from '@/hooks/useUploadFile';
import { boardService } from '@/services/Board.service';
import { BoardT } from '@/types/Board';
import { t } from 'i18next';
import { Trash2, UploadCloud } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  board: BoardT;
}

export const BoardSettingsContent: React.FC<Props> = ({ board }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(board.image);
  const { handleDeleteImage, handleUploadImage, ref } = useUploadFile((url) => setImage(url));
  const [form, setForm] = useState<{
    title: string;
    text: string;
    access: 'locked' | 'public';
    status: string;
  }>({
    title: board.title,
    access: board.access,
    status: board.status,
    text: board.text,
  });

  const handleUpdateBoard = async () => {
    setLoading(true);
    const res = await boardService.update({ ...form, image }, board!._id);
    setLoading(false);

    if ('message' in res) return toast.error(res.message);
    toast.success('Update board success');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content</CardTitle>
        <CardDescription>This contains content settings</CardDescription>
      </CardHeader>
      <CardContent className="px-10">
        <div className="w-full mb-3 flex items-center justify-between">
          <Button disabled={loading} onClick={() => ref.current?.click()} className="gap-x-2">
            <UploadCloud /> Upload Image
          </Button>
          <input type="file" className="hidden" ref={ref} onChange={handleUploadImage} />
          <Button
            variant="destructive"
            className="gap-x-2"
            disabled={loading}
            onClick={handleDeleteImage}
          >
            <Trash2 /> Delete image
          </Button>
        </div>
        {image && (
          <img src={image} className="w-full mb-3 object-cover aspect-video rounded-[15px]" />
        )}
        <div className="gap-y-3 flex flex-col  w-full">
          <Input
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Title"
            disabled={loading}
            className="w-full"
          />
          <Textarea
            value={form.text}
            onChange={(e) => setForm((prev) => ({ ...prev, text: e.target.value }))}
            placeholder="Text"
            disabled={loading}
            className="w-full h-[150px] max-h-[250px]"
          />
          <div className="flex items-center gap-x-2">
            <Select
              value={form.access}
              onValueChange={(v: 'locked' | 'public') =>
                setForm((prev) => ({ ...prev, access: v }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={t('access')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="locked">{t('locked_access')}</SelectItem>
                <SelectItem value="public">{t('public_access')}</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={form.status}
              onValueChange={(v) => setForm((prev) => ({ ...prev, status: v }))}
            >
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
          <div className="flex w-full justify-end items-end">
            <Button disabled={loading} onClick={handleUpdateBoard}>
              Submit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
