import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import UserDataGrid from "~/components/userDataGrid";
import { requireAdminId } from "~/server/auth.server";
import { decipherEmail } from "~/server/decipherEmail.server";
import { prisma } from "~/server/prisma.server";
import { handleDownload } from "~/utils/handleDownload";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdminId(request);
  const users = await prisma.user.findMany({
    include: {
      invitations: {
        orderBy: {
          createdAt: "desc",
        },
      },
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

  if (intent === "decipher") {
    if (!form.get("key")) {
      return { message: "key missing", status: 400, newUsers: null };
    }

    const decipheredUsers = users.map((user) => ({
      ...user,
      email: user.email
        ? decipherEmail(user.email, form.get("key")!.toString())
        : null,
    })) as {
      id: string;
      email: string;
    }[];

    return { message: "deciphered", status: 200, newUsers: decipheredUsers };
  } else if (intent === "filterNoInvitation") {
    const newUsers = users.map((user) => ({
      ...user,
      visible: user.invitationCount === 0,
    }));
    return { message: "filtered", status: 200, newUsers };
  } else if (intent === "filterWithInvitation") {
    const newUsers = users.map((user) => ({
      ...user,
      visible: user.invitationCount > 0,
    }));
    return { message: "filtered", status: 200, newUsers };
  } else if (intent === "filterWithNotActivated") {
    const newUsers = users.map((user) => ({
      ...user,
      visible: user.userStatusId === "initialized",
    }));
    return { message: "filtered", status: 200, newUsers };
  }

  if (!form.get("selectedUserIds")) {
    return { message: "selectedUserIds missing", status: 400, newUsers: null };
  }

  return { message: "no users selected", status: 400, newUsers: null };
}

export default function Stats() {
  const users = useLoaderData<typeof loader>().map((item) => {
    const notDeletedPosts = item.posts.filter((post) => post.size > 0);
    return {
      ...item,
      invitations: null,
      posts: null,
      lastInvitationSentAt: item.invitations[0]
        ? item.invitations[0].createdAt
        : null,
      invitationCount: item.invitations ? item.invitations.length : 0,
      postCount: item.posts.length,
      submittedPostCount: notDeletedPosts.filter(
        (post) => post.postStatusId === "submitted"
      ).length,
      readPostCount: notDeletedPosts.filter(
        (post) => post.postStatusId === "read"
      ).length,
      approvedPostCount: notDeletedPosts.filter(
        (post) => post.postStatusId === "approved"
      ).length,
      rejectedPostCount: notDeletedPosts.filter(
        (post) => post.postStatusId === "rejected"
      ).length,
      deletedPostCount: item.posts.length - notDeletedPosts.length,
      visible: true,
    };
  });

  const [decipherKey, setDecipherKey] = useState("");
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
              email: newUser.email,
              lastInvitationSentAt: newUser.lastInvitationSentAt,
              invitationCount: newUser.invitationCount,
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
            value="filterNoInvitation"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            No Invitation Sent
          </button>
          <button
            type="submit"
            name="intent"
            value="filterWithInvitation"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Invitation Sent
          </button>
          <button
            type="submit"
            name="intent"
            value="filterWithNotActivated"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Not Activated
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
          <label>
            <span className="pr-2 text-lg">Decipher Key</span>
            <input
              type="text"
              name="key"
              className="p-2 bg-slate-100 w-60"
              onChange={(e) => {
                setDecipherKey(e.target.value);
              }}
              value={decipherKey}
            />
          </label>
          <button
            type="submit"
            name="intent"
            value="decipher"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Decipher
          </button>{" "}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDownload(currentUsers)}
          >
            Download JSON
          </button>
        </div>
      </div>
      <UserDataGrid _users={currentUsers} />
    </Form>
  );
}