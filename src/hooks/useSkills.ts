import { NextRequestDeleteDTO } from "@/types/dtos";
import { Skills } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

export const createSkill = () => {
  return useMutation({
    mutationFn: async (data: Skills) => {
      const res = await fetch("/api/skills", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(await res.json());
      }
    },
  });
};

export const deleteSkill = () => {
  return useMutation({
    mutationFn: async (data: NextRequestDeleteDTO) => {
      const res = await fetch("/api/skills", {
        method: "DELETE",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(await res.json());
      }
    },
  });
};
