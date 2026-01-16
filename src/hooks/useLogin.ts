import { NextRequestLoginDTO } from "@/app/api/login/route";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: NextRequestLoginDTO) => {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "same-origin",
      });
      const json = await res.json();
      console.log(json);

      if (!res.ok) {
        throw new Error(json);
      }
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/login/logout", {
        method: "POST",
        credentials: "same-origin",
      });
      const json = await res.json();
      console.log(json);

      if (!res.ok) {
        throw new Error(json);
      }
    },
  });
};
