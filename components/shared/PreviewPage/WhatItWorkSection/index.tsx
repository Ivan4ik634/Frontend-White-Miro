interface Props {}

export const WhatItWorkSection: React.FC<Props> = (props) => {
  return (
    <div
      id="what-it-work"
      className="observer py-60 max-[900px]:py-10 w-full flex justify-center items-center"
    >
      <div className=" w-[800px] max-[900px]:w-full items-center h-[300px] max-[900px]:h-auto gap-x-4 flex max-[900px]:flex-col">
        <div className="flex flex-col max-[900px]:py-3 items-center max-[900px]:pl-0">
          <h1 className="text-xl font-semibold">Create a board</h1>
          <p className="opacity-50 text-center pr-4">
            Open White Miro and create a new board in one click
          </p>
        </div>
        <div className="px-4 flex-col max-[900px]:py-3  items-center flex  border-l border-r max-[900px]:border-0 max-[900px]:border-t">
          <h1 className="text-xl font-semibold">Add elements</h1>
          <p className="opacity-50 text-center pr-4">
            Add elements Draw, add notes, arrows, and diagrams—all in real time
          </p>
        </div>
        <div className="flex flex-col max-[900px]:py-3 max-[900px]:border-t items-center">
          <h1 className="text-xl font-semibold">Work together</h1>
          <p className="opacity-50 text-center pr-4">
            Invite your friends or team and discuss directly on the board
          </p>
        </div>
      </div>
    </div>
  );
};
