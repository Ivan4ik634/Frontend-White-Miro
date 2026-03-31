import { FeatureCardT } from '@/types/Feature';

export const FeaturePreview: React.FC<FeatureCardT> = (props) => {
  return (
    <div className="px-3 py-5 flex items-center justify-between max-[1200px]:flex-col max-[1200px]:justify-start">
      <div className="pr-[200px] max-[1200px]:pr-0 max-[1200px]:mb-3">
        <h1 className="text-3xl mb-3 font-bold">{props.title}</h1>
        <p className="text-xl">{props.description}</p>
      </div>
      <img
        src={props.img}
        className="h-[400px] max-[1200px]:h-auto max-[1200px]:w-full  object-cover aspect-video rounded-[8px]"
      />
    </div>
  );
};
