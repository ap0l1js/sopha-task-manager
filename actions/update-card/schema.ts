import { z } from "zod";

export const UpdateCard = z.object({
  boardId: z.string(),
  description: z.optional(
    z
      .string({
        required_error: "Preencha a descricao",
        invalid_type_error: "Preencha a descricao",
      })
      .min(3, {
        message: "Descricao muito curta.",
      })
  ),
  title: z.optional(
    z
      .string({
        required_error: "Preencha o titulo",
        invalid_type_error: "Preencha o titulo",
      })
      .min(3, {
        message: "Titulo muito curto",
      })
  ),
  tag: z.optional(z.string()),
  assign: z.optional(z.string()),
  expiration: z.optional(z.string()),
  id: z.string(),
});
