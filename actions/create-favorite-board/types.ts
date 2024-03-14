import { UserFavorite } from "@prisma/client";
import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { CreateFavoriteBoard } from "./schema";

export type InputType = z.infer<typeof CreateFavoriteBoard>;
export type ReturnType = ActionState<InputType, UserFavorite>;
