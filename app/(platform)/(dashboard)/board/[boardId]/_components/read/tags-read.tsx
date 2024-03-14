import { Badge } from "@/components/ui/badge";
import { Card } from "@prisma/client";
import { Tag } from "lucide-react";

export const TagsRead = ({ data }: { data: Card }) => {
  const tagMapper = {
    urgente: "destructive",
    intermediario: "yellow",
    suave: "green",
  };

  const tagKey = data.tag as keyof typeof tagMapper;

  if (!data.tag) return null;

  return (
    <div className="flex items-start gap-x-3 w-full">
      <div className="flex flex-col gap-1">
        <p className="font-medium text-neutral-700 ">Tag</p>
        <Badge variant={tagMapper[tagKey] as unknown as any} className="gap-1">
          <Tag className="h-4 w-4" /> {data.tag}
        </Badge>
      </div>
    </div>
  );
};
