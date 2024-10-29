import { useState } from "react";

type OdometerSubmissionFormProps = {
  enabled?: boolean;
  htmlFor: string;
  initialValue?: number;
  currentStatus: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

export function OdometerSubmissionForm({
  enabled,
  htmlFor,
  initialValue,
  currentStatus,
}: OdometerSubmissionFormProps) {
  const [value, setValue] = useState<number | null>(initialValue ?? null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(e.target.value));
  };

  return (
    <div className={`flex ${enabled ? "" : "opacity-50"}`}>
      <input hidden readOnly type="text" name="id" value={htmlFor} />
      <input
        type="number"
        disabled={!enabled}
        name="odometer"
        value={value ?? ""}
        onChange={(e) => {
          handleChange(e);
        }}
        className="w-full p-2 bg-slate-100"
      />
      <button
        type="submit"
        disabled={!enabled}
        name="statusChangeTo"
        value="read"
        className="w-24 p-2 bg-slate-300 hover:bg-slate-500 transition duration-300 ease-in-out"
      >
        {initialValue ? "Update" : "Submit"}
      </button>
      {currentStatus !== "approved" && currentStatus !== "submitted" ? (
        <button
          type="submit"
          disabled={!enabled}
          name="statusChangeTo"
          value="approved"
          className="w-24 p-2 bg-blue-300 hover:bg-blue-500 transition duration-300 ease-in-out"
        >
          Approve
        </button>
      ) : null}
      {/* {currentStatus !== "rejected" ? (
        <Menu as="div" className="relative inline-block text-left">
          <input
            hidden
            readOnly
            type="text"
            name="statusChangeTo"
            value="rejected"
          />
          <MenuButton className="inline-flex w-full h-full justify-center align-baseline p-2 bg-red-200 hover:bg-red-300">
            <p className="flex">Reject</p>
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" />
          </MenuButton>
          <MenuItems
            transition
            className="absolute left-0 z-100 mt-2 w-80 bg-red-50 ring-1 ring-red-800 ring-opacity-25 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <MenuItem>
              <button
                name="rejectionReason"
                value="Not a valid odometer image"
                className="block w-full text-left px-4 py-2 data-[focus]:bg-red-100"
              >
                Not a valid odometer image
              </button>
            </MenuItem>
            <MenuItem>
              <button
                name="rejectionReason"
                value="Odometer is hidden or blocked"
                className="block px-4 py-2 data-[focus]:bg-red-100"
              >
                Odometer is hidden or blocked
              </button>
            </MenuItem>
            <MenuItem>
              <button
                name="rejectionReason"
                value="Image is blurry"
                className="block px-4 py-2 data-[focus]:bg-red-100"
              >
                Image is blurry
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      ) : // <button
      //   type="submit"
      //   disabled={!enabled}
      //   name="statusChangeTo"
      //   value="rejected"
      //   className="w-24 p-2 bg-red-300 hover:bg-red-500 transition duration-300 ease-in-out"
      // >
      //   Reject
      // </button>
      null} */}
    </div>
  );
}
