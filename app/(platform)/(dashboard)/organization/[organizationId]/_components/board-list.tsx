import { auth } from "@clerk/nextjs";
import { Book, Plus } from "lucide-react";
import { redirect } from "next/navigation";

import { FormPopover } from "@/components/form/form-popover";
import { Skeleton } from "@/components/ui/skeleton";
import { getBoardsByOrgId } from "@/data/board";
import { BoardCard } from "./board-card";
import { EmptyFavorites } from "./empty-favorites";

interface BoardListProps {
  query: {
    favorites?: string;
  };
}

export const BoardList = async ({ query }: BoardListProps) => {
  const { orgId } = auth();

  if (!orgId) {
    return redirect("/select-org");
  }

  const boards = await getBoardsByOrgId({ orgId, query });

  if (!boards?.length && query.favorites) {
    return <EmptyFavorites />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <Book className="h-6 w-6 mr-2" />
        {query.favorites ? "Boards favoritos" : "Boards do team"}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards?.map((board) => (
          <BoardCard
            key={board.id}
            id={board.id}
            title={board.title}
            imageUrl={board.imageThumbUrl}
            createdAt={board.createdAt}
            orgId={board.orgId}
            isFavorite={board.isFavorite}
          />
        ))}
        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="aspect-[70/80] relative bg-pink-700 h-full w-full rounded-lg flex flex-col gap-y-1 items-center justify-center hover:opacity-90 transition"
          >
            <Plus className="h-12 w-12 text-white stroke-1" />
            <p className="text-sm text-white ">Criar novo board</p>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
