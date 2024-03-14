"use client";

import { Copy, MoreHorizontal, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithList } from "@/types";

interface ActionsProps {
  data: CardWithList;
}

export const Actions = ({ data }: ActionsProps) => {
  const params = useParams();
  const cardModal = useCardModal();

  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" copiado`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" apagado`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const onCopy = () => {
    const boardId = params.boardId as string;

    executeCopyCard({
      id: data.id,
      boardId,
    });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDeleteCard({
      id: data.id,
      boardId,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="secondary">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side="bottom"
        className="w-60"
      >
        <Button
          onClick={onCopy}
          disabled={isLoadingCopy}
          className="w-full justify-start"
          variant="ghost"
          size="inline"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copiar
        </Button>
        <Button
          onClick={onDelete}
          disabled={isLoadingDelete}
          variant="ghost"
          className="w-full justify-start"
          size="inline"
        >
          <Trash className="h-4 w-4 mr-2" />
          Apagar
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
