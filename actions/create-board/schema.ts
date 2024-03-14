import { z } from "zod";

export const CreateBoardSchema = z.object({
  title: z
    .string({
      required_error: "Preencha o titulo",
      invalid_type_error: "Preencha o titulo",
    })
    .min(3, {
      message: "Titulo muito curto",
    }),
  image: z.string({
    required_error: "Selecione uma imagem",
    invalid_type_error: "Selecione uma imagem",
  }),
});
