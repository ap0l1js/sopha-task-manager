"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";

import { DeleteFavoriteBoard } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Nao autorizado.",
    };
  }

  const { boardId } = data;
  let favorite;

  try {
    const [board] = await db.userFavorite.findMany({
      where: {
        boardId,
        orgId,
        userId,
      },
    });

    favorite = await db.userFavorite.delete({
      where: {
        id: board.id,
      },
    });
  } catch {
    return {
      error: "Falha ao desfavoritar board.",
    };
  }

  revalidatePath(`/organization/${orgId}`);
  return { data: favorite };
};

export const deleteFavoriteBoard = createSafeAction(
  DeleteFavoriteBoard,
  handler
);
