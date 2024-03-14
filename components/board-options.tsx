"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { Link2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAction } from "@/hooks/use-action";
import { ConfirmModal } from "./modals/confirm-modal";

interface BoardOptionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
}

export const BoardOptions = ({
  children,
  side,
  sideOffset,
  id,
}: BoardOptionsProps) => {
  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Link copiado"))
      .catch(() => toast.error("Falha ao copiar link"));
  };

  const { execute, isLoading } = useAction(deleteBoard, {
    onSuccess: () => {
      toast.success("Board deletado");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = () => {
    execute({ id });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60"
      >
        <DropdownMenuItem onClick={onCopyLink} className="p-3 cursor-pointer">
          <Link2 className="h-4 w-4 mr-2" />
          Copiar link do board
        </DropdownMenuItem>
        <ConfirmModal
          header="Deletar board ?"
          description="Esta acao excluirá o board e todo o seu conteúdo."
          disabled={isLoading}
          onConfirm={onDelete}
        >
          <Button
            variant="ghost"
            className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Deletar
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
