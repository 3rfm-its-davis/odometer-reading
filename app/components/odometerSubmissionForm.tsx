import { useState, useEffect } from "react";

type OdometerSubmissionFormProps = {
  htmlFor: string;
  initialValue?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

export function OdometerSubmissionForm({
  htmlFor,
  initialValue,
  onChange,
  error = "",
}: OdometerSubmissionFormProps) {
  const [value, setValue] = useState<number | null>(initialValue ?? null);
  const [formError, setFormError] = useState(error);

  useEffect(() => {
    setFormError(error);
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(e.target.value));
  };

  return (
    <div className="flex">
      <input hidden readOnly type="text" name="id" value={htmlFor} />
      <input
        type="number"
        name="odometer"
        value={value ?? ""}
        onChange={(e) => {
          handleChange(e);
          setFormError("");
        }}
        className="w-full p-2 bg-slate-100 border-slate-300 border-2"
      />
      <button
        type="submit"
        className="w-24 p-2 bg-slate-300 hover:bg-slate-500 transition duration-300 ease-in-out "
      >
        {initialValue ? "Update" : "Submit"}
      </button>
    </div>
  );
}
