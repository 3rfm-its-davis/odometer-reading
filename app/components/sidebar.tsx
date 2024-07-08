import { User } from "@prisma/client";

type SidebarProps = {
  users: User[];
};

export default function Sidebar(props: SidebarProps) {
  return (
    <>
      <div className="flex flex-col w-64 h-screen bg-gray-800">
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
          <h1 className="text-white text-2xl">Users</h1>
        </div>
        <div className="flex flex-col items-start justify-start flex-grow p-3 gap-y-2">
          {props.users
            ? props.users.map((user) => (
                <button className="text-white w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                  {user!.phoneNumber}
                </button>
              ))
            : null}
        </div>
      </div>
    </>
  );
}
