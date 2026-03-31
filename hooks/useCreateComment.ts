import { commentService } from '@/services/Comment.service';
import { useComments } from '@/store/useComments';
import { useState } from 'react';

export const useCreateComment = (id: string) => {
  const [text, setText] = useState('');
  const { addComment } = useComments();
  const handleAddComment = async () => {
    const res = await commentService.create({ taskId: id, text });
    addComment(res);
    setText('');
  };
  const handleSetText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleClickEnterSubmitForm = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !text) handleAddComment();
  };
  return { handleAddComment, handleClickEnterSubmitForm, handleSetText, text };
};
