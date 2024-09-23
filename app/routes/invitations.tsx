import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useMemo, useState } from "react";
import UserDataGrid from "~/components/userDataGrid";
import { requireAdminId } from "~/server/auth.server";
import { prisma } from "~/server/prisma.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdminId(request);
  const invitations = await prisma.invitation.findMany({});

  return invitations;
}

export default function Invitations() {
  const invitations = useLoaderData<typeof loader>().map((item) => {
    return {
      ...item,
      visible: true,
    };
  });
  const [currentInvitations, setCurrentInvitations] = useState(invitations);
  const [sortedBy, setSortedBy] = useState({
    key: "id",
    order: "asc",
  });

  useMemo(() => {
    if (sortedBy) {
      setCurrentInvitations(
        currentInvitations.sort((a, b) => {
          if (sortedBy.order === "asc") {
            return a[sortedBy.key] > b[sortedBy.key] ? 1 : -1;
          } else {
            return a[sortedBy.key] < b[sortedBy.key] ? 1 : -1;
          }
        })
      );
    }
  }, [sortedBy]);

  const handleDownload = () => {
    const jsonString = JSON.stringify(
      currentInvitations.map((invitations) => {
        delete (invitations as any).image;
        return invitations;
      })
    );
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const onHeaderClicked = (colIndex: number, _event: any) => {
    const keys = Object.keys(invitations[0]);

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
            onClick={handleDownload}
          >
            Download JSON
          </button>
        </div>
      </div>
      <UserDataGrid
        _users={currentInvitations.filter((user) => user.visible)}
        onHeaderClicked={onHeaderClicked}
      />
    </>
  );
}
