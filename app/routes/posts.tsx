import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useMemo, useState } from "react";
import UserDataGrid from "~/components/userDataGrid";
import { requireAdminId } from "~/server/auth.server";
import { prisma } from "~/server/prisma.server";
import { handleDownload } from "~/utils/handleDownload";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdminId(request);
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      createdAt: true,
      image: false,
      reading: true,
      postStatusId: true,
      postedById: true,
      notes: true,
      size: true,
    },
  });

  return posts;
}

export default function Posts() {
  const data = useLoaderData<typeof loader>().map((item) => {
    return {
      Id: item.id,
      Image_Create_Date: item.createdAt,
      VMT: item.reading,
      Status: item.postStatusId,
      Is_Deleted: item.size === 0,
      Posted_By_Id: item.postedById,
      Notes: item.notes,
      Image_Size: item.size,
      visible: true,
    };
  });
  console.log(data);
  const [currentData, setCurrentData] = useState(data);
  const [sortedBy, setSortedBy] = useState({
    key: "id",
    order: "asc",
  });

  useMemo(() => {
    if (sortedBy) {
      setCurrentData(
        currentData.sort((a, b) => {
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
    const keys = Object.keys(data[0]);

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
            onClick={() => handleDownload(currentData)}
          >
            Download JSON
          </button>
        </div>
      </div>
      <UserDataGrid
        _users={currentData.filter((user) => user.visible)}
        onHeaderClicked={onHeaderClicked}
      />
    </>
  );
}
