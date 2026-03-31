import toast from 'react-hot-toast';

export const useCopyText = (value: string) => {
  const copyText = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        toast.success('Copied to clipboard');
      })
      .catch(() => {
        toast.error('Failed to copy to clipboard');
      });
  };
  return { copyText, value };
};
