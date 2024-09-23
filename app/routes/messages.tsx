import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useMemo, useState } from "react";
import UserDataGrid from "~/components/userDataGrid";
import { requireAdminId } from "~/server/auth.server";
import { decipherEmail } from "~/server/decipherEmail.server";
import { prisma } from "~/server/prisma.server";
import { sendEmail } from "~/server/sendEmail";
import { handleDownload } from "~/utils/handleDownload";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdminId(request);
  const messages = await prisma.message.findMany({});

  return messages;
}

export default function Posts() {
  const messages = useLoaderData<typeof loader>().map((item) => {
    return {
      ...item,
      visible: true,
    };
  });
  const [currentMessages, setCurrentMessages] = useState(messages);
  const [sortedBy, setSortedBy] = useState({
    key: "id",
    order: "asc",
  });

  useMemo(() => {
    if (sortedBy) {
      setCurrentMessages(
        currentMessages.sort((a, b) => {
          if (sortedBy.order === "asc") {
            return a[sortedBy.key] > b[sortedBy.key] ? 1 : -1;
          } else {
            return a[sortedBy.key] < b[sortedBy.key] ? 1 : -1;
          }
        })
      );
    }
  }, [sortedBy]);

  const onHeaderClicked = (colIndex: number, _event: any) => {
    const keys = Object.keys(messages[0]);

    if (keys[colIndex] === sortedBy.key) {
      setSortedBy({
        key: keys[colIndex],
        order: sortedBy.order === "asc" ? "desc" : "asc",
      });
    } else {
      setSortedBy({
        key: keys[colIndex],
        order: "asc",
      });
    }
  };

  return (
    <>
      <div className="w-screen flex flex-row justify-between p-4 gap-2">
        <div className="flex flex-row gap-2"></div>
        <div className="flex flex-row gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDownload(currentMessages)}
          >
            Download JSON
          </button>
        </div>
      </div>
      <UserDataGrid
        _users={currentMessages.filter((user) => user.visible)}
        onHeaderClicked={onHeaderClicked}
      />
    </>
  );
}
