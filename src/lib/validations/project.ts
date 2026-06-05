import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  url: z.string().url("URL inválida"),
  urlRepository: z.string().url("URL do repositório inválida"),
  languages: z.array(z.string()).min(1, "Pelo menos uma linguagem é obrigatória"),
});

export const deleteProjectSchema = z.object({
  id: z.string().min(1, "ID é obrigatório"),
});

export type CreateProjectDTO = z.infer<typeof createProjectSchema>;
export type DeleteProjectDTO = z.infer<typeof deleteProjectSchema>;
