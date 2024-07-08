import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import { prisma } from "~/server/prisma.server";

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
    <div>
      <h1>{user.phoneNumber}</h1>
      <h2>Posts</h2>
    </div>
  );
}
