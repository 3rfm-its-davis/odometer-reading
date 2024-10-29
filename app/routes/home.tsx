import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Sidebar, { UserForSidebar } from "~/components/sidebar";
import { requireAdminId } from "~/server/auth.server";
import { prisma } from "~/server/prisma.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const adminId = await requireAdminId(request);

  const admin = await prisma.admin.findUnique({
    where: {
      id: adminId,
    },
  });

  const _users = await prisma.user.findMany({
    include: {
      posts: {
        where: {
          size: {
            gt: 0,
          },
        },
        select: {
          id: true,
          postStatusId: true,
          statusChangedBy: {
            select: {
              email: true,
            },
          },
        },
      },
    },
  });

  return { _users, admin };
}

export default function Home() {
  const {
    _users,
    admin,
  }: {
    _users: UserForSidebar[];
    admin: {
      id: string;
      email: string;
      password: string;
    } | null;
  } = useLoaderData<typeof loader>();

  const users = _users.filter((user) => user.phoneNumber.indexOf("-") === -1);
  return (
    <div className="flex flex-grow h-full">
      <Sidebar users={users} adminEmail={admin?.email} />
      <Outlet />
    </div>
  );
}
