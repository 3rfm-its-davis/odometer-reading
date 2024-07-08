import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
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
  });

  return { user, posts };
}

export default function User() {
  const { user, posts } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col flex-auto p-6 divide-y">
      <div className="text-3xl pb-6">
        <h1>User: {user.phoneNumber}</h1>
      </div>
      <div className="flex flex-col gap-y-2">
        <h2 className="text-2xl py-4">Posts</h2>
        <div className="grid-cols-4 grid gap-4">
          {posts
            .flatMap((post) => [post, post, post, post, post, post, post])
            .map((post) => {
              // convert number array to base64 image
              const imageBase64 = btoa(
                post.image.data.map((num) => String.fromCharCode(num)).join("")
              );
              return (
                <div className="flex flex-col w-full gap-y-1">
                  <img src={`data:image/jpg;base64,${imageBase64}`} />
                  <form method="post" action={`/home/${post.id}/submit`}>
                    <OdometerSubmissionForm htmlFor={post.id} />
                  </form>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
