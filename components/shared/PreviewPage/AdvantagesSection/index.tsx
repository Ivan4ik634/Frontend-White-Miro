interface Props {}

export const AdvantagesSection: React.FC<Props> = (props) => {
  return (
    <div className="py-20 max-[900px]:py-10 w-full flex justify-center items-center ">
      <div className="w-[900px] max-[900px]:w-full max-[900px]:flex-col gap-x-4 flex">
        <p className="opacity-50 max-[900px]:w-full max-[900px]:py-3 text-xl text-center pr-4 max-[900px]:pr-0 max-[900px]:border-b">
          No distractions — just a clear, intuitive board to focus on your tasks.
        </p>
        <div className="px-4 border-l border-r  max-[900px]:px-0 max-[900px]:border-0 max-[900px]:border-b ">
          <p className="opacity-50 max-[900px]:w-full max-[900px]:py-3 text-xl text-center">
            Optimized for speed, so every move feels instant and smooth.
          </p>
        </div>
        <p className="opacity-50 max-[900px]:w-full max-[900px]:py-3 text-xl text-center pl-4 max-[900px]:pl-0 ">
          Share boards, assign tasks, and stay in sync with your team in real time.
        </p>
      </div>
    </div>
  );
};
