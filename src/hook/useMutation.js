import { useMutation } from "@tanstack/react-query"

export const useMutationHooks = (fnCallback) => {
  return useMutation({
    mutationFn: fnCallback, // ✅ truyền đúng theo API mới
  });
};