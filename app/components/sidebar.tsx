export type UserForSidebar = {
  posts: {
    id: string;
    postStatusId: string;
    statusChangedBy: {
      email: string;
    } | null;
  }[];
} & {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  activatedAt: string | null;
  deletedAt: string | null;
  phoneNumber: string;
  accessCode: string;
  userStatusId: string;
};

export default function Sidebar({
  users,
  adminEmail,
}: {
  users: UserForSidebar[];
  adminEmail?: string;
}) {
  return (
    <div className="flex flex-col h-full bg-gray-700 min-w-60">
      <div className="flex items-center justify-center h-20 border-b">
        <h1 className="text-white text-2xl">Users</h1>
      </div>
      <div className="flex flex-col items-start justify-start flex-grow p-3 gap-y-2 h-full overflow-auto">
        {users
          ? users
              // sort by post length and then user access code
              .sort((a, b) => {
                if (
                  a.posts.filter(
                    (post) =>
                      post.postStatusId === "submitted" ||
                      (post.postStatusId === "read" &&
                        post.statusChangedBy?.email !== adminEmail)
                  ).length >
                  b.posts.filter(
                    (post) =>
                      post.postStatusId === "submitted" ||
                      (post.postStatusId === "read" &&
                        post.statusChangedBy?.email !== adminEmail)
                  ).length
                )
                  return -1;
                if (
                  a.posts.filter(
                    (post) =>
                      post.postStatusId === "submitted" ||
                      (post.postStatusId === "read" &&
                        post.statusChangedBy?.email !== adminEmail)
                  ).length <
                  b.posts.filter(
                    (post) =>
                      post.postStatusId === "submitted" ||
                      (post.postStatusId === "read" &&
                        post.statusChangedBy?.email !== adminEmail)
                  ).length
                )
                  return 1;
                if (a.accessCode < b.accessCode) return -1;
                if (a.accessCode > b.accessCode) return 1;
                return 0;
              })
              .map((user) => (
                <a
                  href={`/home/${user!.accessCode}`}
                  key={user!.accessCode}
                  className="w-full text-nowrap text-white font-bold flex justify-between"
                >
                  <button
                    key={user!.accessCode}
                    className="w-full text-nowrap bg-gray-500 hover:bg-gray-700 py-2 px-4 rounded flex justify-between"
                  >
                    {user!.accessCode}
                    <div className="flex gap-2">
                      <span className="bg-blue-700 rounded-full h-6 w-6 inline-block">
                        {
                          user!.posts.filter(
                            (post) =>
                              post.postStatusId === "submitted" ||
                              (post.postStatusId === "read" &&
                                post.statusChangedBy?.email !== adminEmail)
                          ).length
                        }
                      </span>
                      <span className="bg-green-700 rounded-full h-6 w-6 inline-block">
                        {
                          user!.posts.filter(
                            (post) => post.postStatusId === "approved"
                          ).length
                        }
                      </span>
                      <span className="bg-red-700 rounded-full h-6 w-6 inline-block">
                        {
                          user!.posts.filter(
                            (post) => post.postStatusId === "rejected"
                          ).length
                        }
                      </span>
                    </div>
                  </button>
                </a>
              ))
          : null}
      </div>
    </div>
  );
}
