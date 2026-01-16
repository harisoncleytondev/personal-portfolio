import { NextRequestDeleteDTO } from "@/types/dtos";
import { Certificates } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

export const createCertificate = () => {
  return useMutation({
    mutationFn: async (data: Certificates) => {
      const res = await fetch("/api/certificates", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(await res.json());
      }
    },
  });
};

export const deleteCertificate = () => {
  return useMutation({
    mutationFn: async (data: NextRequestDeleteDTO) => {
      const res = await fetch("/api/certificates", {
        method: "DELETE",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(await res.json());
      }
    },
  });
};
