import { useMutation } from "@tanstack/react-query";

export const useContact = () => {
  return useMutation({
    mutationFn: async ({ name, email, message }: any) => {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        throw new Error(await res.json());
      }
    },
  });
};
