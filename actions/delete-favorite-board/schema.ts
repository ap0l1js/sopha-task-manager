import { z } from "zod";

export const DeleteFavoriteBoard = z.object({
  boardId: z.string(),
});
