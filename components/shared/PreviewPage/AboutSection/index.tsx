interface Props {}

export const AboutSection: React.FC<Props> = (props) => {
  return (
    <div id="about" className="observer w-full pb-80 pt-20 max-[900px]:py-10 px-6">
      <div className=" max-w-2xl mx-auto text-center space-y-6">
        <h2 className="text-3xl  font-semibold">About White Miro</h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-200">
          White Miro is a minimalist and fast collaborative whiteboard. No unnecessary panels or
          complex interfaces. Simply a space for ideas, tasks, and visual thinking.
        </p>
        <p className="text-sm text-neutral-400">Made for those who value simplicity.</p>
      </div>
    </div>
  );
};
