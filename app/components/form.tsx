import { useState, useEffect } from "react";

type FormProps = {
  htmlFor: string;
  label: string;
  type?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

export function Form({
  htmlFor,
  label,
  type = "text",
  value,
  onChange,
  error = "",
}: FormProps) {
  const [formError, setFormError] = useState(error);

  useEffect(() => {
    setFormError(error);
  }, [error]);

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={htmlFor} className="text-gray-800 font-semibold">
        {label}
      </label>
      <input
        type={type}
        id={htmlFor}
        name={htmlFor}
        value={value}
        onChange={(e) => {
          onChange?.(e);
          setFormError("");
        }}
        className="w-full p-2 my-2"
      />
      {formError && <p className="text-red-500">{formError}</p>}
    </div>
  );
}
