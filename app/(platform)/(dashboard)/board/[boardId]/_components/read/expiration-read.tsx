import { Card } from "@prisma/client";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

export const ExpirationRead = ({ data }: { data: Card }) => {
  if (!data.expiration) return null;

  return (
    <div className="flex items-start gap-x-3 w-full">
      <div className="flex flex-col gap-2">
        <p className="font-medium text-neutral-700 ">Data de entrega</p>
        <div className="flex gap-1">
          <Calendar className="h-4 w-4" />{" "}
          {format(data.expiration, "dd MMM yyyy")}
        </div>
      </div>
    </div>
  );
};
