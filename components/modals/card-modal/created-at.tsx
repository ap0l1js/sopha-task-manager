"use client";

import { format } from "date-fns";
import { Calendar } from "lucide-react";

interface CreatedByProps {
  title: string;
  date: Date;
}

export const CreatedAt = ({ title, date }: CreatedByProps) => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Calendar className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full flex items-center gap-4">
        <p className="font-semibold text-neutral-700 mb-2">
          {title}{" "}
          <span className="font-normal">{format(date, "dd MMM yyyy")}</span>
        </p>
      </div>
    </div>
  );
};
