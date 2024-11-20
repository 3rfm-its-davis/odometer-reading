import { Button, Input, Select, Switch } from "@headlessui/react";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import { DateTime } from "luxon";
import { useCallback, useEffect, useState } from "react";
import { MainImage } from "~/components/mainImage";
import { requireAdminId } from "~/server/auth.server";
import { makeUserComplete } from "~/server/makeUserComplete";
import { prisma } from "~/server/prisma.server";
import { sendTemplateMessage } from "~/server/sendTemplateMessage.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      accessCode: params.accessCode,
    },
  });

  const adminId = await requireAdminId(request);

  const posts = await prisma.post.findMany({
    where: {
      postedById: user.id,
      size: {
        gt: 0,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      statusChangedBy: {
        select: {
          email: true,
        },
      },
    },
  });

  const rejectionReasons = await prisma.rejectionReason.findMany();

  return { user, posts, adminId, rejectionReasons };
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();

  if (String(form.get("intent")) === "suspend") {
    await prisma.user.update({
      where: {
        id: String(form.get("userId")),
      },
      data: {
        userStatusId: "suspended",
      },
    });
    return json({
      message: "User suspended",
      status: 200,
      actions: [],
      result: null,
    });
  }

  const actions = JSON.parse(String(form.get("actions")));

  if (actions.length === 0) {
    return json(
      { message: "No actions", actions: [], result: null },
      { status: 400 }
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // return actions without the first item
  // return json({ actions: actions.slice(1) });

  const action = actions[0] as PostAction;
  const adminId = await requireAdminId(request);

  const result = await prisma.post.update({
    where: { id: action.id },
    data: {
      reading: action.reading,
      postStatusId: action.changeTo,
      statusChangedById: adminId,
      rejectionReasonId: action.rejectionReason,
    },
    select: {
      id: true,
      image: false,
      size: false,
      reading: true,
      postStatusId: true,
      rejectionReasonId: true,
      statusChangedBy: {
        select: {
          id: true,
          email: true,
        },
      },
      postedBy: {
        select: {
          id: true,
          accessCode: true,
          phoneNumber: true,
          userStatusId: true,
        },
      },
    },
  });

  if (
    action.changeTo === "approved" &&
    result.postedBy.userStatusId === "activated"
  ) {
    // get the number of uniq days that the user has submitted at least one approved post
    const countApprovedDays = (
      await prisma.post.findMany({
        where: {
          postedById: result.postedBy.id,
          postStatusId: "approved",
        },
      })
    )
      .reduce((acc, post) => {
        const date = DateTime.fromJSDate(post.createdAt)
          .setZone("America/Los_Angeles")
          .toISODate();
        if (!acc.includes(date)) {
          acc.push(date);
        }
        return acc;
      }, [] as (string | null)[])
      .filter((date) => date !== null).length;

    await sendTemplateMessage(result.postedBy.phoneNumber, "approve_post", [
      result.id.replace(`${result.postedBy.accessCode}-`, ""),
      countApprovedDays.toString(),
    ]);

    if (countApprovedDays == 3) {
      await makeUserComplete(result.postedBy);
    }

    return json(
      {
        message: "post updated, sent approval message",
        actions: actions.slice(1),
        result,
      },
      { status: 200 }
    );
  }

  if (
    action.changeTo === "rejected" &&
    action.rejectionReason &&
    result.postedBy.userStatusId === "activated"
  ) {
    // await sendTemplateMessage(result.postedBy.phoneNumber, "reject_post", [
    //   action.rejectionReason,
    //   result.id.replace(`${result.postedBy.accessCode}-`, ""),
    // ]);

    return json(
      {
        message: "post updated, sent rejection message",
        actions: actions.slice(1),
        result,
      },
      { status: 200 }
    );
  }

  return json(
    {
      message: "post updated",
      actions: actions.slice(1),
      result,
    },
    { status: 200 }
  );
}

type PostAction = {
  id: string;
  changeTo?: "approved" | "rejected" | "submitted" | "read";
  rejectionReason?: string;
  reading?: number;
};

type UIPost = {
  id: string;
  image: string;
  createdAt: string;
  postStatusId: string;
  reading: number;
  rejectionReasonId?: string;
  statusChangedById?: string;
  statusChangedByEmail?: string;
  borderColor?: string;
};

export default function User() {
  const { user, posts, adminId, rejectionReasons } =
    useLoaderData<typeof loader>();
  const [focusedPost, setFocusedPost] = useState<UIPost | undefined>(undefined);
  const [formData, setFormData] = useState<PostAction[]>([]);
  const submit = useSubmit();
  const actionData = useActionData<typeof action>();
  const [uiPosts, setUiPosts] = useState<UIPost[]>([]);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

  useEffect(() => {
    if (posts) {
      setFocusedPost({
        id: posts[0].id,
        image: posts[0].image,
        createdAt: posts[0].createdAt,
        postStatusId: posts[0].postStatusId,
        reading: posts[0].reading,
      });
      setFormData(
        posts.map((post) => ({
          id: post.id,
          reading: post.reading,
        }))
      );
      setUiPosts(
        posts.map((post) => {
          return {
            id: post.id,
            image: post.image,
            createdAt: post.createdAt,
            postStatusId: post.postStatusId,
            reading: post.reading,
            rejectionReasonId: post.rejectionReasonId || "",
            statusChangedById: post.statusChangedById || "",
            statusChangedByEmail: post.statusChangedBy?.email || "",
            borderColor: "border-slate-200",
          };
        })
      );
    }
  }, [posts]);

  useEffect(() => {
    if (!actionData) return;
    if (actionData?.result !== null) {
      setUiPosts((uiPosts) =>
        uiPosts.map((uiPost) =>
          uiPost.id === actionData.result.id
            ? {
                ...uiPost,
                postStatusId: actionData.result.postStatusId,
                reading: actionData.result.reading,
                rejectionReasonId: actionData.result.rejectionReasonId || "",
                statusChangedByEmail:
                  actionData.result.statusChangedBy?.email || "",
                borderColor: "border-green-500",
              }
            : uiPost
        )
      );
    }
    if (actionData?.actions?.length > 0) {
      submit(
        {
          actions: JSON.stringify(actionData?.actions),
        },
        {
          method: "post",
        }
      );
    } else {
      setIsSubmitButtonDisabled(false);
      console.log("All actions completed");
    }
  }, [actionData]);

  const handleReadingChange = useCallback(
    (postId: string, value: any) => {
      if (value === "" || value === "0") {
        setFormData((formData) =>
          formData.map((data) =>
            data.id === postId
              ? { ...data, reading: 0, changeTo: "submitted" }
              : data
          )
        );
        setUiPosts((uiPosts) =>
          uiPosts.map((uiPost) =>
            uiPost.id === postId
              ? {
                  ...uiPost,
                  reading: 0,
                  borderColor: "border-slate-200",
                }
              : uiPost
          )
        );
        return;
      } else {
        setFormData((formData) =>
          formData.map((data) =>
            data.id === postId
              ? { ...data, reading: Number(value), changeTo: "read" }
              : data
          )
        );
        setUiPosts((uiPosts) =>
          uiPosts.map((uiPost) =>
            uiPost.id === postId
              ? {
                  ...uiPost,
                  reading: Number(value),
                  borderColor: "border-slate-500",
                }
              : uiPost
          )
        );
      }
    },
    [formData]
  );

  const handleRejectionChange = useCallback(
    (postId: string, value: any) => {
      if (value === "") {
        setFormData((formData) =>
          formData.map((data) =>
            data.id === postId
              ? {
                  ...data,
                  changeTo: undefined,
                  rejectionReason: undefined,
                }
              : data
          )
        );
        setUiPosts((uiPosts) =>
          uiPosts.map((uiPost) =>
            uiPost.id === postId
              ? {
                  ...uiPost,
                  borderColor: "border-slate-200",
                }
              : uiPost
          )
        );
      } else {
        setFormData((formData) =>
          formData.map((data) =>
            data.id === postId
              ? {
                  ...data,
                  changeTo: "rejected",
                  rejectionReason: value,
                }
              : data
          )
        );
        setUiPosts((uiPosts) =>
          uiPosts.map((uiPost) =>
            uiPost.id === postId
              ? {
                  ...uiPost,
                  rejectionReasonId: value,
                  borderColor: "border-slate-500",
                }
              : uiPost
          )
        );
      }
    },
    [formData]
  );

  const handleApprovalChange = useCallback(
    (postId: string, value: any) => {
      if (value === "read") {
        setFormData((formData) =>
          formData.map((data) =>
            data.id === postId
              ? {
                  ...data,
                  changeTo: undefined,
                }
              : data
          )
        );
        setUiPosts((uiPosts) =>
          uiPosts.map((uiPost) =>
            uiPost.id === postId
              ? {
                  ...uiPost,
                  borderColor: "border-slate-200",
                }
              : uiPost
          )
        );
      } else {
        setFormData((formData) =>
          formData.map((data) =>
            data.id === postId
              ? {
                  ...data,
                  changeTo: "approved",
                }
              : data
          )
        );
        setUiPosts((uiPosts) =>
          uiPosts.map((uiPost) =>
            uiPost.id === postId
              ? {
                  ...uiPost,
                  borderColor: "border-slate-500",
                }
              : uiPost
          )
        );
      }
    },
    [formData]
  );

  return (
    <div className="flex flex-col h-full w-full p-4">
      <div className="flex flex-row justify-between pb-4 border-b border-slate-800">
        <h1 className="flex text-3xl self-baseline">User: {user.accessCode}</h1>
        <div className="flex flex-row gap-x-4">
          <Form method="post">
            <button
              className="px-4 py-2 rounded border-solid border-2 border-red-800 hover:bg-red-500 bg-red-300 active:bg-red-300 transition duration-300 ease-in-out"
              type="submit"
              name="intent"
              value="suspend"
            >
              {"Suspend User"}
            </button>
          </Form>
          <h3 className="flex text-xl self-center">
            Activation Date: {new Date(user?.activatedAt || "").toISOString()}
          </h3>
          <h3 className="flex text-xl self-center">
            Post Count {posts.length}
          </h3>
          {user.userStatusId === "activated" ? (
            <span className="text-white text-md bg-green-500 rounded p-1.5 self-center">
              Activated
            </span>
          ) : user.userStatusId === "suspended" ? (
            <span className="text-white text-md bg-red-500 rounded p-1.5 self-center">
              Suspended
            </span>
          ) : user.userStatusId === "completed" ? (
            <span className="text-white text-md bg-blue-500 rounded p-1.5 self-center">
              Completed
            </span>
          ) : user.userStatusId === "closed" ||
            user.userStatusId === "deleted" ? (
            <span className="text-white text-md bg-gray-500 rounded p-1.5 self-center">
              Closed / Deleted
            </span>
          ) : (
            <span className="text-white text-md bg-gray-500 rounded p-1.5 self-center">
              Unknown
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-grow flex-row gap-4 h-full overflow-auto py-4">
        <MainImage focusedPost={focusedPost} />
        <div className="flex flex-1 flex-col flex-grow p-3 gap-y-2 h-full overflow-auto">
          {uiPosts.map((uiPost) => {
            const formDataElement = formData.find(
              (data) => data.id === uiPost.id
            );
            return (
              <div
                className={`flex flex-row gap-x-2 h-30 rounded shadow-md align-middle border-2 ${uiPost.borderColor}`}
                onClick={() => setFocusedPost(uiPost)}
                key={uiPost.id}
              >
                <div className="flex-1">
                  <img
                    src={uiPost.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      maxHeight: "auto",
                      maxWidth: "auto",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div className="flex-[3] flex flex-col gap-y-1 p-2 justify-around">
                  <div className="flex flex-row justify-between">
                    <h5 className="text-md">
                      Submission Date: {uiPost.createdAt}
                    </h5>
                    {uiPost.postStatusId === "submitted" && (
                      <span className="text-white text-sm bg-blue-500 rounded p-1">
                        Submitted
                      </span>
                    )}
                    {uiPost.postStatusId === "read" && (
                      <span className="text-white text-sm bg-orange-500 rounded p-1">
                        Read by {uiPost.statusChangedByEmail}
                      </span>
                    )}
                    {uiPost.postStatusId === "approved" && (
                      <span className="text-white text-sm bg-green-500 rounded p-1">
                        Approved by {uiPost.statusChangedByEmail}
                      </span>
                    )}
                    {uiPost.postStatusId === "rejected" && (
                      <span className="text-white text-sm bg-red-500 rounded p-1">
                        Rejected by {uiPost.statusChangedByEmail}
                        <br />
                        {uiPost.rejectionReasonId}
                      </span>
                    )}
                    {!["submitted", "read", "approved", "rejected"].includes(
                      uiPost.postStatusId
                    ) && (
                      <span className="bg-gray-500 text-white rounded p-1">
                        Unknown
                      </span>
                    )}
                  </div>
                  <div className="flex flex-row justify-start gap-2">
                    <div className="flex flex-row justify-between gap-2">
                      {uiPost.postStatusId === "submitted" ||
                      uiPost.postStatusId === "read" ||
                      uiPost.postStatusId === "rejected" ? (
                        <>
                          <p>Reading</p>
                          <Input
                            type="number"
                            disabled={formDataElement?.changeTo === "rejected"}
                            value={formDataElement?.reading
                              ?.toString()
                              .replace(/^0+(?!$)/, "")}
                            onFocus={() => setFocusedPost(uiPost)}
                            className={
                              "block rounded outline outline-1 outline-gray-500 disabled:bg-gray-200 focus:outline-indigo-800"
                            }
                            onChange={(e) => {
                              handleReadingChange(uiPost.id, e.target.value);
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <p>Reading:</p>
                          <p>{uiPost.reading}</p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row justify-between gap-2">
                    {uiPost.postStatusId === "read" ? (
                      <div className="flex flex-row gap-1">
                        Approve
                        <Switch
                          disabled={
                            uiPost.statusChangedById === adminId ||
                            formDataElement?.changeTo === "rejected"
                          }
                          onChange={(e) => {
                            handleApprovalChange(
                              uiPost.id,
                              e ? "approved" : "read"
                            );
                          }}
                          checked={formDataElement?.changeTo === "approved"}
                          className={
                            "group inline-flex h-6 w-11 rounded-full bg-indigo-300 p-1 data-[checked]:bg-blue-600 focus:outline-indigo-800 disabled:bg-gray-200"
                          }
                        >
                          <span className="inline-block w-4 h-4 transform bg-white rounded-full duration-300 ease-in-out group-data-[checked]:translate-x-5" />
                        </Switch>
                      </div>
                    ) : null}
                    {uiPost.postStatusId === "submitted" ||
                    uiPost.postStatusId === "read" ? (
                      <Select
                        className="block rounded outline outline-1 outline-gray-500 disabled:bg-gray-200 focus:outline-indigo-800"
                        onChange={(e) => {
                          handleRejectionChange(uiPost.id, e.target.value);
                        }}
                        disabled={
                          formDataElement?.changeTo === "approved" ||
                          formDataElement?.changeTo === "read"
                        }
                      >
                        <option key={""} value={""}>
                          Select to reject
                        </option>
                        {rejectionReasons.map((reason) => (
                          <option key={reason.id} value={reason.id}>
                            {reason.id}
                          </option>
                        ))}
                      </Select>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form
        className="flex flex-grow flex-row justify-end w-full"
        onSubmit={(e) => {
          e.preventDefault();
          setIsSubmitButtonDisabled(true);
          submit(
            {
              actions: JSON.stringify(formData.filter((data) => data.changeTo)),
            },
            {
              method: "post",
            }
          );
        }}
      >
        <Button
          className="w-40 p-2 rounded border-solid border-blue-800 border-2 bg-blue-300 hover:bg-blue-500 active:bg-blue-300 disabled:bg-gray-200 transition duration-300 ease-in-out"
          type="submit"
          disabled={isSubmitButtonDisabled}
        >
          {"Submit Changes"}
        </Button>
      </Form>
    </div>
  );
}
