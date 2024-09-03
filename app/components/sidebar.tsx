import { User } from "@prisma/client";

type SidebarProps = {
  users: any[];
};

export default function Sidebar(props: SidebarProps) {
  return (
    <div>
      <div className="flex flex-col flex-none h-screen bg-gray-700 min-w-40">
        <div className="flex items-center justify-center h-20 border-b">
          <h1 className="text-white text-2xl">Users</h1>
        </div>
        <div className="flex flex-col items-start justify-start flex-grow p-3 gap-y-2">
          {props.users
            ? props.users
                .sort((a: any, b: any) => b!.posts.length - a!.posts.length)
                .map((user) => (
                  <button className="w-full text-nowrap bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex justify-between">
                    <a href={`/home/${user!.id}`}>{user!.id}</a>
                    <span className="bg-red-700 rounded-full h-6 w-8 inline-block ml-2">
                      {user!.posts.length}
                    </span>
                  </button>
                ))
            : null}
        </div>
      </div>
    </div>
  );
}
