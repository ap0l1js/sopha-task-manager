"use client";

import { updateCard } from "@/actions/update-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types";
import { OrganizationMembership } from "@clerk/nextjs/dist/types/server";
import { useQueryClient } from "@tanstack/react-query";
import { User2 } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export const Assign = ({
  members,
  data,
}: {
  members: OrganizationMembership[];
  data: CardWithList;
}) => {
  const queryClient = useQueryClient();
  const params = useParams();

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });
      toast.success(`Card "${data.title}" actualizado`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onChange = (value: string) => {
    const boardId = params.boardId as string;

    execute({
      id: data.id,
      assign: value,
      boardId,
    });
  };

  return (
    <div className="flex items-start  gap-x-3 w-full">
      <User2 className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full  flex-col items-center gap-4">
        <p className="font-semibold text-neutral-700 mb-2">Assinalar</p>
        <div className="flex w-full flex-wrap gap-1">
          <Select onValueChange={onChange} defaultValue={data.assign ?? ""}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o membro" />
            </SelectTrigger>
            <SelectContent>
              {members.map((member) => (
                <SelectItem
                  key={member.publicUserData?.userId!}
                  value={member.publicUserData?.userId!}
                  className=" font-semibold "
                >
                  {member.publicUserData?.firstName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
