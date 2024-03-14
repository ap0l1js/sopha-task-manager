import { UserFavorite } from "@prisma/client";
import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { DeleteFavoriteBoard } from "./schema";

export type InputType = z.infer<typeof DeleteFavoriteBoard>;
export type ReturnType = ActionState<InputType, UserFavorite>;
