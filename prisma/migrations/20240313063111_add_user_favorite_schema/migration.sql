-- CreateTable
CREATE TABLE "UserFavorite" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserFavorite_pkey" PRIMARY KEY ("id")
);
