import { z } from "zod";

export const UpdateList = z.object({
  title: z
    .string({
      required_error: "Preencha o titulo",
      invalid_type_error: "Preencha o titulo",
    })
    .min(3, {
      message: "Titulo muito curto",
    }),
  id: z.string(),
  boardId: z.string(),
});
