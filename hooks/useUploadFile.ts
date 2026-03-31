import { uploadService } from '@/services/Upload.service';
import { useRef, useState } from 'react';

export const useUploadFile = (action?: (url: string) => void) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [url, setUrl] = useState('');

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();

      formData.append('file', file);

      const res = await uploadService.uploadFile(formData);
      if (action) action(res.url);
      setUrl(res.url);
    }
  };
  const handleDeleteImage = () => {
    if (action) action('');
    setUrl('');
  };

  return { url, ref, handleUploadImage, handleDeleteImage };
};
