import { UserAvatar } from "@/components/user-avatar";
import { fetcher } from "@/lib/fetcher";
import { User } from "@clerk/nextjs/dist/types/server";
import { Card } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const AssignRead = ({ data }: { data: Card }) => {
  const { data: user } = useQuery<User>({
    queryKey: ["user", data.id],
    queryFn: () => fetcher(`/api/users/${data.assign}`),
  });

  if (!user) return null;

  return (
    <div className="flex items-start gap-x-3 w-full">
      <div className="w-full flex flex-col gap-1">
        <p className="font-medium text-neutral-700 ">Assign</p>
        <UserAvatar
          src={user.imageUrl}
          name={user.firstName || "name"}
          fallback={user.firstName?.[0] || "T"}
        />
      </div>
    </div>
  );
};
