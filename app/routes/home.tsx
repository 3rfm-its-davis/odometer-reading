import { LoaderFunction, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Sidebar from "~/components/sidebar";
import { requireAdminId } from "~/server/auth.server";
import { prisma } from "~/server/prisma.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireAdminId(request);
  const users = await prisma.user.findMany();
  return json(users);
};

export default function Home() {
  const users = useLoaderData<typeof loader>();
  return (
    <div className="h-full flex-auto flex">
      <Sidebar users={users} />
      <Outlet />
    </div>
  );
}
