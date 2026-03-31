import { FeatureCardT } from '@/types/Feature';
import { useTranslation } from 'react-i18next';

export const useFeaturesPreview = (): FeatureCardT[] => {
  const { t } = useTranslation();

  return [
    {
      title: 'Drag and drop',
      img: '/Preview-Drag-and-Drop.png',
      description: `
       Organize your workflow the way that works best for you.
Easily move tasks, link blocks, and reorganize project logic in a couple of clicks—everything is as intuitive as possible.
      `,
    },
    {
      title: 'Instant updates',
      img: '/Preview-Instant-speed.png',
      description: `
       All changes are visible immediately, without refreshing the page.
Work in real time and be confident that your board always displays the current state of the project.
      `,
    },
    {
      title: 'Teamwork',
      img: '/Preview-TeamWork.png',
      description: `
      Work on tasks together and stay on the same page.
Every movement, comment, or sticker change is instantly visible to everyone—as if you were sitting right next to each other.
      `,
    },
  ];
};
