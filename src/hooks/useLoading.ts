import { Certificates, Project, Settings, Skills } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export interface DashboardData {
  settings: (Settings & { cvUrl?: string }) | null;
  projects: (Project & { imageUrl?: string })[];
  skills: (Skills & { imageUrl?: string })[];
  certificates: Certificates[];
}

export const useLoading = () => {
  return useQuery<DashboardData>({
    queryKey: ["query-loading-infos"],
    queryFn: async () => {
      const res = await fetch("/api/loading");

      if (!res.ok) {
        throw new Error(await res.json());
      }

      return res.json();
    },
  });
};
