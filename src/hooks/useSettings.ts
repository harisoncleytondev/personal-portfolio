import { Settings } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

export const saveSettings = () => {
  return useMutation({
    mutationFn: async (data: Settings) => {
      const res = await fetch("/api/settings", {
        method: "PUT",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(await res.json());
      }
    },
  });
};
