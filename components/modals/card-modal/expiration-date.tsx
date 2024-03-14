import { updateCard } from "@/actions/update-card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { cn } from "@/lib/utils";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export const ExpirationDate = ({ data }: { data: CardWithList }) => {
  const queryClient = useQueryClient();
  const params = useParams();

  const expiration = data.expiration;

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
      expiration: value,
      boardId,
    });
  };

  return (
    <div className="flex items-start  gap-x-3 w-full">
      <CalendarIcon className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full  flex-col items-center gap-4">
        <p className="font-semibold text-neutral-700 mb-2">Data de entrega</p>
        <div className="flex w-full flex-wrap gap-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !expiration && "text-muted-foreground"
                )}
              >
                {expiration ? (
                  format(expiration, "PPP")
                ) : (
                  <span>Selecione uma data</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={new Date(expiration || "")}
                onSelect={(selectedDate) => {
                  onChange(selectedDate?.toISOString()!);
                }}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
