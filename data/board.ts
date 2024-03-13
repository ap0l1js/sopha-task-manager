import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

export const getFavouriteBoardsByOrgId = async (orgId: string) => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    const favoriteBoards = await db.userFavorite.findMany({
      where: {
        orgId,
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        boardId: true,
      },
    });

    return favoriteBoards;
  } catch {
    return null;
  }
};

type TQuery = {
  favorites?: string;
};

type TBoard = {
  id: string;
  orgId: string;
  title: string;
  imageId: string;
  imageThumbUrl: string;
  imageFullUrl: string;
  imageUserName: string;
  imageLinkHTML: string;
  createdAt: Date;
  updatedAt: Date;
  isFavorite: boolean;
};

export const getBoardsByOrgId = async ({
  orgId,
  query,
}: {
  orgId: string;
  query: TQuery;
}) => {
  try {
    let boards = (await db.board.findMany({
      where: {
        orgId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })) as TBoard[];

    const favoriteBoards = await getFavouriteBoardsByOrgId(orgId);

    if (!favoriteBoards) {
      if (query?.favorites) {
        return [];
      }

      return boards.map((board) => ({
        ...board,
        isFavorite: false,
      }));
    }

    boards = boards.map((board) => ({
      ...board,
      isFavorite: favoriteBoards.some(
        (favorite) => favorite.boardId === board.id
      ),
    }));

    if (query.favorites) {
      return boards.filter((board) => board.isFavorite);
    }

    return boards;
  } catch {
    return null;
  }
};
