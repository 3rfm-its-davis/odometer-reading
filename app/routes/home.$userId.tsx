import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/server/prisma.server";
import { OdometerSubmissionForm } from "~/components/odometerSubmissionForm";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      phoneNumber: params.userId,
    },
  });
  const posts = await prisma.post.findMany({
    where: {
      postedById: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return { user, posts };
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  console.log(form);

  if (!form.has("id") || !form.has("odometer")) {
    return json({ message: "missing fields" }, { status: 400 });
  }

  const result = await prisma.post.update({
    where: { id: String(form.get("id")) },
    data: {
      reading: Number(form.get("odometer")),
      postStatusId: "confirmedByDev",
    },
  });

  return json(result);
}

export default function User() {
  const { user, posts } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col flex-auto p-6 divide-y  overflow-scroll">
      <div className="text-3xl pb-6">
        <h1>User: {user.phoneNumber}</h1>
      </div>
      <div className="flex flex-col gap-y-4 py-4">
        <h2 className="text-2xl">Submitted</h2>
        <div className="grid grid-cols-4 gap-4 place-items-start">
          {posts
            .filter((post) => post.postStatusId === "submitted")
            .map((post) => {
              const imageBase64 = btoa(
                post.image.data.map((num) => String.fromCharCode(num)).join("")
              );
              return (
                <div className="flex flex-col w-full gap-y-1">
                  <img src={`data:image/jpg;base64,${imageBase64}`} />
                  <form method="post">
                    <OdometerSubmissionForm htmlFor={post.id} />
                  </form>
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex flex-col gap-y-4 py-4">
        <h2 className="text-2xl">Confirmed</h2>
        <div className="grid-cols-4 grid gap-4">
          {posts
            .filter((post) => post.postStatusId === "confirmedByDev")
            .map((post) => {
              const imageBase64 = btoa(
                post.image.data.map((num) => String.fromCharCode(num)).join("")
              );
              return (
                <div className="flex flex-col w-full gap-y-1">
                  <img src={`data:image/jpg;base64,${imageBase64}`} />
                  <form method="post">
                    <OdometerSubmissionForm
                      htmlFor={post.id}
                      initialValue={post.reading!}
                    />
                  </form>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
