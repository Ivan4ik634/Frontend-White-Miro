'use client';
import { useFeaturesPreview } from '@/hooks/useFeaturesPreview';
import { FeaturePreview } from './FeaturePreview';

interface Props {}

export const FeaturesSection: React.FC<Props> = (props) => {
  const featuresPreview = useFeaturesPreview();
  return (
    <div className="observer" id="features">
      <div className="gap-y-60 max-[1200px]:gap-y-10  flex flex-col">
        {featuresPreview.map((card, i) => (
          <FeaturePreview key={i} {...card} />
        ))}
      </div>
    </div>
  );
};
