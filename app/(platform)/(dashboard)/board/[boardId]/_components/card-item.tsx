"use client";

import { useCardModal } from "@/hooks/use-card-modal";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";
import { AssignRead } from "./read/assign-read";
import { ExpirationRead } from "./read/expiration-read";
import { TagsRead } from "./read/tags-read";

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  const cardModal = useCardModal();

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            role="button"
            onClick={() => cardModal.onOpen(data.id)}
            className="truncate flex flex-col gap-4 border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
          >
            <div className="truncate border-b">{data.title}</div>

            <AssignRead data={data} />

            <TagsRead data={data} />

            <ExpirationRead data={data} />
          </div>
        );
      }}
    </Draggable>
  );
};
