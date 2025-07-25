import { useMutation } from "@tanstack/react-query"

export const useMutationHooks = (fnCallback) => {
  const mutation = useMutation((data) => fnCallback(data))//tùy biến logic gọi API
  return mutation
}


