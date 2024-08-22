import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/server/prisma.server";
import { OdometerSubmissionForm } from "~/components/odometerSubmissionForm";
import { requireAdminId } from "~/server/auth.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: params.userId,
    },
  });

  const adminId = await requireAdminId(request);

  const posts = await prisma.post.findMany({
    where: {
      postedById: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      statusChangedBy: {},
    },
  });

  return { user, posts, adminId };
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  console.log(form);

  if (!form.has("id") || !form.has("odometer")) {
    return json({ message: "missing fields" }, { status: 400 });
  }

  const adminId = await requireAdminId(request);

  const result = await prisma.post.update({
    where: { id: String(form.get("id")) },
    data: {
      reading: Number(form.get("odometer")),
      postStatusId: String(form.get("statusChangeTo")),
      statusChangedById: adminId,
    },
  });

  return json(result);
}

export default function User() {
  const { user, posts, adminId } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col flex-auto p-6 divide-y  overflow-scroll">
      <div className="text-3xl pb-6">
        <h1>User: {user.id}</h1>
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
                    <OdometerSubmissionForm
                      enabled
                      htmlFor={post.id}
                      currentStatus={post.postStatusId}
                    />
                  </form>
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex flex-col gap-y-4 py-4">
        <h2 className="text-2xl">Odometer Read</h2>
        <div className="grid-cols-4 grid gap-4">
          {posts
            .filter((post) => post.postStatusId === "read")
            .map((post) => {
              const imageBase64 = btoa(
                post.image.data.map((num) => String.fromCharCode(num)).join("")
              );
              return (
                <div className="flex flex-col w-full gap-y-1">
                  <img src={`data:image/jpg;base64,${imageBase64}`} />
                  <p>Read by: {post.statusChangedBy!.email}</p>
                  <form method="post">
                    <OdometerSubmissionForm
                      // enabled={post.statusChangedBy?.id !== adminId}
                      htmlFor={post.id}
                      initialValue={post.reading || undefined}
                      currentStatus={post.postStatusId}
                    />
                  </form>
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex flex-col gap-y-4 py-4">
        <h2 className="text-2xl">Approved</h2>
        <div className="grid-cols-4 grid gap-4">
          {posts
            .filter((post) => post.postStatusId === "approved")
            .map((post) => {
              const imageBase64 = btoa(
                post.image.data.map((num) => String.fromCharCode(num)).join("")
              );
              return (
                <div className="flex flex-col w-full gap-y-1">
                  <img src={`data:image/jpg;base64,${imageBase64}`} />
                  <p>Approved by: {post.statusChangedBy!.email}</p>
                  <form method="post">
                    <OdometerSubmissionForm
                      // enabled={post.statusChangedBy?.id !== adminId}
                      enabled={true}
                      htmlFor={post.id}
                      initialValue={post.reading || undefined}
                      currentStatus={post.postStatusId}
                    />
                  </form>
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex flex-col gap-y-4 py-4">
        <h2 className="text-2xl">Rejected</h2>
        <div className="grid-cols-4 grid gap-4">
          {posts
            .filter((post) => post.postStatusId === "rejected")
            .map((post) => {
              const imageBase64 = btoa(
                post.image.data.map((num) => String.fromCharCode(num)).join("")
              );
              return (
                <div className="flex flex-col w-full gap-y-1">
                  <img src={`data:image/jpg;base64,${imageBase64}`} />
                  <p>Rejected by: {post.statusChangedBy!.email}</p>
                  <form method="post">
                    <OdometerSubmissionForm
                      // enabled={post.statusChangedBy?.id !== adminId}
                      enabled={true}
                      htmlFor={post.id}
                      initialValue={post.reading || undefined}
                      currentStatus={post.postStatusId}
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
