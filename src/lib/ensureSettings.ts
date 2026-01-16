import { prisma } from './prisma';

export const ensureSettings = async () => {
  await prisma.settings.upsert({
    where: { id: "main" },
    update: {},
    create: {
        id: "main",
        cv: null
    }
  });
};
