import { Certificates, Project, Settings, Skills } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export interface DashboardData {
  settings: Settings | null;
  projects: Project[];
  skills: Skills[];
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
