import { useState, useEffect } from "react";

type OdometerSubmissionFormProps = {
  htmlFor: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

export function OdometerSubmissionForm({
  htmlFor,
  onChange,
  error = "",
}: OdometerSubmissionFormProps) {
  const [formError, setFormError] = useState(error);
  useEffect(() => {
    setFormError(error);
  }, [error]);
  return (
    <div className="flex">
      <input
        type="number"
        id={htmlFor}
        name={htmlFor}
        value={0}
        onChange={(e) => {
          onChange?.(e);
          setFormError("");
        }}
        className="w-full p-2 bg-slate-100 border-slate-300 border-2"
      />
      <button
        type="submit"
        className="w-24 p-2 bg-slate-300 hover:bg-slate-500 transition duration-300 ease-in-out "
      >
        Submit
      </button>
    </div>
  );
}
