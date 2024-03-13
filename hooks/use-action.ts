import { useCallback, useState, useTransition } from "react";

import { ActionState, FieldErrors } from "@/lib/create-safe-action";

type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput> = {}
) => {
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<TInput> | undefined
  >(undefined);

  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const execute = useCallback(
    async (input: TInput) => {
      startTransition(async () => {
        try {
          const result = await action(input);

          if (!result) {
            return;
          }

          setFieldErrors(result.fieldErrors);

          if (result.error) {
            setError(result.error);
            options.onError?.(result.error);
          }

          if (result.data) {
            setData(result.data);
            options.onSuccess?.(result.data);
          }
        } finally {
          options.onComplete?.();
        }
      });
    },
    [action, options]
  );

  return {
    execute,
    fieldErrors,
    error,
    data,
    isLoading: isPending,
  };
};
