"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";

import { CreateFavoriteBoard } from "./schema";
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
    favorite = await db.userFavorite.create({
      data: {
        boardId,
        orgId,
        userId,
      },
    });
  } catch (error) {
    console.log({ error });

    return {
      error: "Falha ao favoritar board.",
    };
  }

  revalidatePath(`/organization/${orgId}`);
  return { data: favorite };
};

export const createFavoriteBoard = createSafeAction(
  CreateFavoriteBoard,
  handler
);
