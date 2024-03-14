import { z } from "zod";

export const CreateFavoriteBoard = z.object({
  boardId: z.string(),
});
