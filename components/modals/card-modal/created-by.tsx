import { UserAvatar } from "@/components/user-avatar";
import { randomIdToColor } from "@/lib/utils";
import { OrganizationMembership } from "@clerk/nextjs/dist/types/server";
import { User } from "lucide-react";

export const CreatedBy = ({
  authorData,
}: {
  authorData: OrganizationMembership;
}) => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <User className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full flex items-center gap-4">
        <p className="font-semibold text-neutral-700 mb-2">Criado por:</p>

        <UserAvatar
          borderColor={randomIdToColor(authorData.createdAt)}
          src={authorData.publicUserData?.imageUrl}
          name={authorData.publicUserData?.firstName || "name"}
          fallback={authorData.publicUserData?.firstName?.[0] || "T"}
        />
      </div>
    </div>
  );
};
