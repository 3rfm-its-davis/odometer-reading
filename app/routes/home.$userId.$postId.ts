import { ActionFunctionArgs } from "@remix-run/node";
import { prisma } from "~/server/prisma.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const PostId = String(formData.get("postId"));
  const odometerReading = Number(formData.get("odometerReading"));

  prisma.post.update({
    where: { id: PostId },
    data: { reading: odometerReading },
  });
}
