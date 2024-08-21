import { useState, useEffect } from "react";

type OdometerSubmissionFormProps = {
  enabled: boolean;
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
      {currentStatus !== "rejected" ? (
        <button
          type="submit"
          disabled={!enabled}
          name="statusChangeTo"
          value="rejected"
          className="w-24 p-2 bg-red-300 hover:bg-red-500 transition duration-300 ease-in-out"
        >
          Reject
        </button>
      ) : null}
    </div>
  );
}
