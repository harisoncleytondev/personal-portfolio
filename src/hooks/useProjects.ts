import { NextRequestDeleteDTO } from "@/types/dtos";
import { Project } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

export const createProject = () => {
  return useMutation({
    mutationFn: async (data: Project) => {
      const res = await fetch("/api/projects", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(await res.json());
      }
    },
  });
};

export const deleteProject = () => {
  return useMutation({
    mutationFn: async (data: NextRequestDeleteDTO) => {
      const res = await fetch("/api/projects", {
        method: "DELETE",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(await res.json());
      }
    },
  });
};
