"use client";

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import Image from "next/image";
import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";
// import { api } from "@/convex/_generated/api";
// import { useApiMutation } from "@/hooks/use-api-mutation";

import { createFavoriteBoard } from "@/actions/create-favorite-board";
import { deleteFavoriteBoard } from "@/actions/delete-favorite-board";
import { BoardOptions } from "@/components/board-options";
import { useAction } from "@/hooks/use-action";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Footer } from "./footer";
import { Overlay } from "./overlay";

interface BoardCardProps {
  id: string;
  title: string;
  createdAt: Date;
  imageUrl: string;
  orgId: string;
  isFavorite: boolean;
}

export const BoardCard = ({
  id,
  title,
  createdAt,
  imageUrl,
  orgId,
  isFavorite,
}: BoardCardProps) => {
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
    locale: ptBR,
  });

  const { execute: onFavorite, isLoading: pendingFavorite } = useAction(
    createFavoriteBoard,
    {
      onSuccess: () => {
        toast.success("Board favoritado com sucesso");
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { execute: onUnfavorite, isLoading: pendingUnfavorite } = useAction(
    deleteFavoriteBoard,
    {
      onSuccess: () => {
        toast.success("Board desfavoritado com sucesso");
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      onUnfavorite({ boardId: id });
    } else {
      onFavorite({ boardId: id });
    }
  };

  return (
    <>
      <Link href={`/board/${id}`}>
        <div className="group aspect-[70/80] border rounded-lg flex flex-col justify-between overflow-hidden">
          <div className="relative flex-1 bg-amber-50">
            <Image src={imageUrl} alt={title} fill className="object-fit" />
            <Overlay />
            <BoardOptions id={id} side="right">
              <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
              </button>
            </BoardOptions>
          </div>
          <Footer
            isFavorite={isFavorite}
            title={title}
            createdAtLabel={createdAtLabel}
            onClick={toggleFavorite}
            disabled={pendingFavorite || pendingUnfavorite}
          />
        </div>
      </Link>
    </>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
