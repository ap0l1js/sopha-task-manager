import { Board } from "@prisma/client";

import { BoardOptions } from "@/components/board-options";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { BoardTitleForm } from "./board-title-form";

interface BoardNavbarProps {
  data: Board;
}

export const BoardNavbar = async ({ data }: BoardNavbarProps) => {
  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
      <BoardTitleForm data={data} />
      <div className="ml-auto">
        <BoardOptions id={data.id} side="bottom">
          <Button className="h-auto w-auto p-2" variant="transparent">
            <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
          </Button>
        </BoardOptions>
      </div>
    </div>
  );
};
