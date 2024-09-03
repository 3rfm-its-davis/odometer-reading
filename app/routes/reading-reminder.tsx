import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import UserDataGrid from "~/components/userDataGrid";
import { requireAdminId } from "~/server/auth.server";
import { prisma } from "~/server/prisma.server";
import { sendReminder } from "~/server/sendReminder";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdminId(request);
  const users = await prisma.user.findMany({
    where: {
      userStatusId: {
        in: ["activated", "suspended", "closed", "deleted", "completed"],
      },
    },
    include: {
      posts: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return users;
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();

  if (!form.get("users")) {
    return { message: "no users", status: 400, newUsers: null };
  }

  const users = JSON.parse(form.get("users")!.toString()) as any[];

  const intent = form.get("intent");

  if (intent === "sendReminder") {
    if (!form.get("selectedUserIds")) {
      return { message: "no users selected", status: 400, newUsers: null };
    }
    const selectedUserIds = JSON.parse(form.get("selectedUserIds")!.toString());
    const usersToRemind = users.filter((user) =>
      selectedUserIds.includes(user.id)
    );
    const adminId = await requireAdminId(request);

    const userWithReminderSent = await sendReminder(usersToRemind);
    const newUsers = users.map(
      (user) => userWithReminderSent.find((item) => item.id === user.id) || user
    );

    return { message: "reminder sent", status: 200, newUsers };
  } else if (intent === "filterNoPost") {
    const newUsers = users.map((user) => ({
      ...user,
      visible: user.postCount === 0,
    }));
    return { message: "filtered", status: 200, newUsers };
  } else if (intent === "filterWithPost") {
    const newUsers = users.map((user) => ({
      ...user,
      visible: user.postCount > 0,
    }));
    return { message: "filtered", status: 200, newUsers };
  }

  if (!form.get("selectedUserIds")) {
    return { message: "selectedUserIds missing", status: 400, newUsers: null };
  }

  return { message: "no users selected", status: 400, newUsers: null };
}

export default function ReadingReminder() {
  const users = useLoaderData<typeof loader>().map((item) => {
    return {
      ...item,
      posts: null,
      postCount: item.posts?.length || 0,
      lastActivityAt: [
        item.posts?.[0]?.createdAt,
        item.updatedAt,
        item.createdAt,
      ]
        .filter(Boolean)
        .sort()
        .reverse()[0],
      visible: true,
    };
  });
  const actionData = useActionData<typeof action>();
  const [currentUsers, setCurrentUsers] = useState(users);

  useEffect(() => {
    if (actionData?.newUsers) {
      setCurrentUsers(
        currentUsers.map((user) => {
          const newUser = (actionData.newUsers as any).find(
            (item: any) => item.id === user.id
          );

          if (newUser) {
            return {
              ...user,
              updatedAt: newUser.updatedAt,
              lastActivityAt: newUser.lastActivityAt,
              visible: newUser.visible,
            };
          }

          return user;
        })
      );
    }
  }, [actionData]);

  return (
    <Form method="post" className="flex flex-col gap-2">
      <div className="w-screen flex flex-row justify-between p-4 gap-2">
        <div className="flex flex-row gap-2">
          <button
            type="submit"
            name="intent"
            value="filterNoPost"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            No Invitation Sent
          </button>
          <button
            type="submit"
            name="intent"
            value="filterWithPost"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Invitation Sent
          </button>
        </div>
        <div className="flex flex-row gap-2">
          <input
            hidden
            readOnly
            type="text"
            name="users"
            value={JSON.stringify(currentUsers)}
          />
          <button
            type="submit"
            name="intent"
            value="sendReminder"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Send Reminder
          </button>
        </div>
      </div>
      <UserDataGrid _users={currentUsers} />
    </Form>
  );
}
