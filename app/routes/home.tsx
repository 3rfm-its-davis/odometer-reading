import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Sidebar from "~/components/sidebar";
import { requireAdminId } from "~/server/auth.server";
import { prisma } from "~/server/prisma.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdminId(request);
  const users = await prisma.user.findMany({
    where: {
      phoneNumber: {
        lt: "20000000000",
        gt: "10000000000",
      },
    },
    include: {
      posts: {
        where: {
          postStatusId: "submitted",
        },
      },
    },
  });

  return users;
}

export default function Home() {
  const users = useLoaderData<typeof loader>();
  return (
    <div className="h-screen flex-auto flex">
      <Sidebar users={users as any[]} />
      <Outlet />
    </div>
  );
}
