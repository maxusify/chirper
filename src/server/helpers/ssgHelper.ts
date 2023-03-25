import superjson from "superjson";
import { prisma } from "@/server/db";
import { appRouter } from "@/server/api/root";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";

export const generateSSGHelper = () => {
  return createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson,
  });
};
