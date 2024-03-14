"use client";

import { useQuery } from "@tanstack/react-query";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import { AuditLog } from "@prisma/client";

import { OrganizationMembership } from "@clerk/nextjs/dist/types/server";
import { Actions } from "./actions";
import { Assign } from "./assign";
import { CreatedAt } from "./created-at";
import { CreatedBy } from "./created-by";
import { Description } from "./description";
import { ExpirationDate } from "./expiration-date";
import { Header } from "./header";
import { Logs } from "./logs";
import { Tags } from "./tags";

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });

  const { data: members } = useQuery<OrganizationMembership[]>({
    queryKey: ["members", id],
    queryFn: () => fetcher("/api/members"),
  });

  const authorData = members?.find(
    (member) => member.publicUserData?.userId === cardData?.authorId
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData || !members || !authorData ? (
          <>
            <Header.Skeleton />
            <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
              <div className="col-span-3">
                <div className="w-full space-y-6">
                  <Description.Skeleton />
                  <Logs.Skeleton />
                </div>
              </div>
              <Actions.Skeleton />
            </div>
          </>
        ) : (
          <div className="truncate p-2">
            <div className="flex gap-4 items-start">
              <Actions data={cardData} />
              <Header data={cardData} />
            </div>

            <div className="space-y-6">
              <Description data={cardData} />

              <Tags data={cardData} />

              <Assign members={members} data={cardData} />

              <ExpirationDate data={cardData} />

              <CreatedAt date={cardData.createdAt} title="Criado em:" />

              <CreatedBy authorData={authorData} />

              <Logs items={auditLogsData ? auditLogsData : []} />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
